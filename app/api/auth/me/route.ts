import { createClient } from "@/Infrastructure/supabase"
import { NextResponse } from "next/server"
import type { UserResponse } from "@/Domain/Auth"

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

    const response: UserResponse = {
      success: true,
      authenticated: true,
      user: {
        id: user.id,
        email: user.email || "",
      },
      profile: profile || null,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ authenticated: false })
  }
}
