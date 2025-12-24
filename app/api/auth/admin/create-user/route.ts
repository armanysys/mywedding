import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

// Este endpoint solo debe usarse una vez para crear el super admin inicial
// Después debe ser eliminado o protegido
export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, role } = await request.json()

    const supabaseAdmin = createAdminClient()

    // Crear usuario usando la API Admin (no requiere confirmación de email)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirmar email
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
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
    const { error: profileError } = await supabaseAdmin
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
      message: "Usuario super_admin creado exitosamente.",
    })
  } catch (error) {
    console.error("Error in create-user:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
