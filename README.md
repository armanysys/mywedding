# My Wedding - Panel de Administración

Aplicación para gestionar eventos de boda con panel de administración protegido.

## Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratuita)

## Configuración Local

### 1. Clonar e Instalar

\`\`\`bash
# Clonar el repositorio
git clone <tu-repo-url>
cd mywedding

# Instalar dependencias
npm install
\`\`\`

### 2. Configurar Variables de Entorno

\`\`\`bash
# Copiar el archivo de ejemplo
cp .env.example .env.local
\`\`\`

Edita \`.env.local\` con tus credenciales de Supabase:

| Variable | Dónde encontrarla |
|----------|-------------------|
| \`NEXT_PUBLIC_SUPABASE_URL\` | Supabase Dashboard → Settings → API → Project URL |
| \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` | Supabase Dashboard → Settings → API → anon public |
| \`SUPABASE_SERVICE_ROLE_KEY\` | Supabase Dashboard → Settings → API → service_role |

### 3. Configurar Base de Datos

Ejecuta los scripts SQL en el SQL Editor de Supabase en este orden:

1. \`scripts/001_create_profiles.sql\` - Crea la tabla de perfiles y políticas RLS

### 4. Crear Usuario Super Admin

\`\`\`bash
# Ejecutar script para crear super admin
npx ts-node scripts/003_create_super_admin.ts
\`\`\`

O puedes ir a \`/setup\` en la aplicación después de ejecutarla.

### 5. Ejecutar el Proyecto

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Credenciales por Defecto

| Campo | Valor |
|-------|-------|
| Email | armando@example.com |
| Contraseña | Admin123! |

**Importante:** Cambia la contraseña después del primer inicio de sesión.

## Estructura del Proyecto

\`\`\`
├── app/
│   ├── admin/           # Panel de administración (protegido)
│   ├── api/auth/        # API Routes de autenticación
│   ├── login/           # Página de login
│   └── setup/           # Configuración inicial (eliminar en producción)
├── lib/
│   └── supabase/        # Clientes de Supabase (server, admin)
├── scripts/             # Scripts de base de datos
└── middleware.ts        # Protección de rutas
\`\`\`

## Roles de Usuario

| Rol | Descripción |
|-----|-------------|
| \`super_admin\` | Control total del sistema |
| \`novio\` | Propietarios del evento |
| \`planeadora\` | Apoyo en gestión con permisos delegados |
| \`invitado\` | Solo acceso público |

## Scripts Disponibles

\`\`\`bash
npm run dev      # Modo desarrollo
npm run build    # Construir para producción
npm run start    # Ejecutar build de producción
npm run lint     # Ejecutar linter
\`\`\`

## Solución de Problemas

### Error: "Database error querying schema"
- Verifica que hayas ejecutado \`scripts/001_create_profiles.sql\`
- Confirma que las políticas RLS estén correctamente configuradas

### Error: "Invalid login credentials"
- Verifica que el usuario exista en la tabla \`auth.users\`
- Confirma que el perfil exista en la tabla \`profiles\`
- Ejecuta \`scripts/003_create_super_admin.ts\` para crear el usuario

### Error de CORS
- Asegúrate de que \`NEXT_PUBLIC_SUPABASE_URL\` sea correcto
- Verifica que estés usando \`http://localhost:3000\` (no 127.0.0.1)
