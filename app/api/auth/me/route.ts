import { createClient } from "@/Infrastructure/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ authenticated: false })
    }

    // Get user profile with role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, first_name, last_name, permissions, is_active")
      .eq("id", user.id)
      .single()

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
      },
      profile: profile || null,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ authenticated: false })
  }
}
