import { createClient } from "@/Infrastructure/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    const supabase = await createClient()

    // Authenticate user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json({ success: false, error: "Credenciales inválidas" }, { status: 401 })
    }

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, first_name, last_name")
      .eq("id", authData.user.id)
      .single()

    if (profileError || !profile) {
      // User authenticated but no profile - might be first login
      return NextResponse.json({
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
        profile: null,
      })
    }

    // Verify user has admin access
    const adminRoles = ["super_admin", "novio", "planeadora"]
    if (!adminRoles.includes(profile.role)) {
      await supabase.auth.signOut()
      return NextResponse.json(
        { success: false, error: "No tienes permisos para acceder al panel de administración" },
        { status: 403 },
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
      profile: {
        role: profile.role,
        first_name: profile.first_name,
        last_name: profile.last_name,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
