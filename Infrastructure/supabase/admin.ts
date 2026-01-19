import { createClient } from "@supabase/supabase-js"

/**
 * Infrastructure Layer - Supabase Admin Client
 * 
 * Creates a Supabase admin client with service_role_key for administrative operations.
 * ONLY use on the server, NEVER expose to the client.
 * 
 * Use Cases:
 * - Creating users
 * - Bypassing Row Level Security
 * - Administrative database operations
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
