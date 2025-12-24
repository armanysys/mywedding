import { createClient } from "@supabase/supabase-js"

// Cliente Admin con service_role_key para operaciones administrativas
// SOLO usar en el servidor, nunca exponer al cliente
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
