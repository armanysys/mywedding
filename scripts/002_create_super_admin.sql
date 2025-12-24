-- Script para configurar el usuario super_admin
-- IMPORTANTE: Primero debes crear el usuario en Supabase Auth
-- 
-- Opción 1: Desde el Dashboard de Supabase
--   1. Ve a Authentication > Users
--   2. Click en "Add user"
--   3. Email: armando@example.com
--   4. Password: (elige una contraseña segura)
--   5. Marca "Auto Confirm User" para saltarte la verificación de email
--
-- Opción 2: Usar el formulario de login con signup habilitado
--
-- Una vez creado el usuario, ejecuta este script para asignar el rol super_admin:

-- Actualizar el perfil del usuario con rol super_admin
UPDATE profiles
SET 
  role = 'super_admin',
  first_name = 'Armando',
  last_name = 'Antonio',
  is_active = true,
  updated_at = NOW()
WHERE email = 'armando@example.com';

-- Verificar que se actualizó correctamente
SELECT 
  id,
  email,
  role,
  first_name,
  last_name,
  is_active,
  created_at
FROM profiles
WHERE email = 'armando@example.com';
