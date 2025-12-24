import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Este endpoint solo debe usarse una vez para crear el super admin inicial
// Después debe ser eliminado o protegido
export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, role } = await request.json()

    // Crear cliente con service role para operaciones admin
    const supabase = await createClient()

    // Usar signUp para crear el usuario correctamente
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || undefined,
      },
    })

    if (authError) {
      console.error("Error creating user:", authError)
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ success: false, error: "No se pudo crear el usuario" }, { status: 400 })
    }

    // Actualizar el perfil con el rol
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        role: role || "super_admin",
        first_name: firstName,
        last_name: lastName,
        is_active: true,
      })
      .eq("id", authData.user.id)

    if (profileError) {
      console.error("Error updating profile:", profileError)
      // El usuario fue creado pero el perfil no se actualizó
      return NextResponse.json({
        success: true,
        warning: "Usuario creado pero el perfil no se actualizó",
        user: authData.user,
      })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
      message: "Usuario creado exitosamente. Revisa tu email para confirmar la cuenta.",
    })
  } catch (error) {
    console.error("Error in create-user:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
