/**
 * Script para crear el usuario Super Admin inicial
 *
 * Este script debe ejecutarse UNA SOLA VEZ después de configurar la base de datos.
 * Usa la API Admin de Supabase para crear el usuario sin requerir confirmación de email.
 *
 * Credenciales por defecto:
 * - Email: armando@example.com
 * - Password: Admin123!
 * - Rol: super_admin
 *
 * IMPORTANTE: Cambia la contraseña después del primer inicio de sesión.
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createSuperAdmin() {
  const email = "armando@example.com"
  const password = "Admin123!"
  const firstName = "Armando"
  const lastName = "Antonio"

  console.log("Creando usuario Super Admin...")

  // Verificar si el usuario ya existe
  const { data: existingUsers } = await supabase.auth.admin.listUsers()
  const userExists = existingUsers?.users?.some((u) => u.email === email)

  if (userExists) {
    console.log("El usuario ya existe. Actualizando perfil a super_admin...")

    // Obtener el ID del usuario existente
    const existingUser = existingUsers?.users?.find((u) => u.email === email)
    if (existingUser) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          role: "super_admin",
          first_name: firstName,
          last_name: lastName,
          is_active: true,
        })
        .eq("id", existingUser.id)

      if (updateError) {
        console.error("Error actualizando perfil:", updateError.message)
        return
      }
      console.log("Perfil actualizado exitosamente!")
    }
    return
  }

  // Crear nuevo usuario usando Admin API
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirmar email
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
    },
  })

  if (authError) {
    console.error("Error creando usuario:", authError.message)
    return
  }

  console.log("Usuario creado:", authData.user?.id)

  // El trigger automático crea el perfil con rol 'invitado'
  // Actualizamos a super_admin
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      role: "super_admin",
      first_name: firstName,
      last_name: lastName,
      is_active: true,
    })
    .eq("id", authData.user?.id)

  if (profileError) {
    console.error("Error actualizando perfil:", profileError.message)
    return
  }

  console.log("----------------------------------------")
  console.log("Super Admin creado exitosamente!")
  console.log("----------------------------------------")
  console.log("Email:", email)
  console.log("Password:", password)
  console.log("Rol: super_admin")
  console.log("----------------------------------------")
  console.log("IMPORTANTE: Cambia la contraseña después del primer login")
}

createSuperAdmin()
