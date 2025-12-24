import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createSuperAdmin() {
  const email = "armando@example.com"
  const password = "Admin123!" // Cambia esta contraseña después del primer login

  console.log("Creando usuario super_admin...")

  // Crear usuario en auth.users
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirmar email
  })

  if (authError) {
    console.error("Error creando usuario:", authError.message)
    return
  }

  console.log("Usuario creado en auth.users:", authData.user?.id)

  // Actualizar perfil con rol super_admin
  const { error: profileError } = await supabase.from("profiles").upsert({
    id: authData.user!.id,
    email: email,
    role: "super_admin",
    first_name: "Armando",
    last_name: "Antonio",
    is_active: true,
    updated_at: new Date().toISOString(),
  })

  if (profileError) {
    console.error("Error actualizando perfil:", profileError.message)
    return
  }

  console.log("Perfil actualizado con rol super_admin")
  console.log("\n✅ Usuario super_admin creado exitosamente!")
  console.log("   Email:", email)
  console.log("   Password:", password)
  console.log("\n⚠️  Recuerda cambiar la contraseña después del primer login")
}

createSuperAdmin()
