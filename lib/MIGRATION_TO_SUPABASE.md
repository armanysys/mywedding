# Guía de Migración a Supabase

Esta guía te muestra cómo migrar de MockData a Supabase, que es **TRIVIAL** gracias a la arquitectura.

## Resumen: Qué cambias

**SOLO repositories**. Eso es todo.

```
lib/infrastructure/repositories/*.repository.ts ← Cambias AQUÍ
                                                 (mockData → Supabase queries)

Todo lo demás sin cambios:
├─ Use-cases ✅
├─ Mappers ✅
├─ API Routes ✅
├─ Servicios ✅
└─ Componentes ✅
```

---

## Paso a Paso

### 1. Verificar que Supabase esté conectado

Verifica que tengas las variables de entorno:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Ver `lib/supabase/server.ts` para el cliente servidor ya configurado.

### 2. Crear tablas en Supabase

Crea las tablas según tus Domain Models. Ejemplo para Hero:

```sql
CREATE TABLE heroes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  subtitulo TEXT NOT NULL,
  imagen_url TEXT,
  boton_texto TEXT,
  boton_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO heroes (titulo, subtitulo, imagen_url, boton_texto, boton_url)
VALUES (
  'Julia & Armando',
  'Nos alegra que estés aquí',
  '/hero-image.jpg',
  'Descubre más',
  '/details'
);
```

### 3. Actualizar Repository - Ejemplo Hero

#### ANTES (MockData):
```typescript
// lib/infrastructure/repositories/hero.repository.ts
import { heroData } from "@/MockData/hero-data"

export class HeroRepository {
  async findById(id: string): Promise<any> {
    return heroData
  }

  async getAll(): Promise<any[]> {
    return [heroData]
  }
}
```

#### DESPUÉS (Supabase):
```typescript
// lib/infrastructure/repositories/hero.repository.ts
import { createClient } from "@/lib/supabase/server"

export class HeroRepository {
  async findById(id: string): Promise<any> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('heroes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(`Database error: ${error.message}`)
    if (!data) throw new Error('Hero not found')

    return data
  }

  async getAll(): Promise<any[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('heroes')
      .select('*')

    if (error) throw new Error(`Database error: ${error.message}`)
    return data || []
  }
}
```

#### Cambios clave:
1. Importar `createClient` de Supabase
2. Obtener cliente: `const supabase = createClient()`
3. Query a tabla: `.from('heroes').select()`
4. Manejar errores
5. Retornar datos

**¡Eso es todo para hero!**

### 4. Repetir para otras entidades

Aplica el mismo patrón a todos los repositories:

- ✅ `couple-info.repository.ts` - Query `couple_infos` table
- ✅ `gift-registry.repository.ts` - Query `gift_registries` table
- ✅ `event-details.repository.ts` - Query `event_details` table
- ✅ `itinerary.repository.ts` - Query `itineraries` table
- ✅ `logistics.repository.ts` - Query `logistics` table
- ✅ `photo-gallery.repository.ts` - Query `photo_galleries` table
- ✅ `confirmacion-asistencia.repository.ts` - Query `rsvp_confirmations` table

### 5. Mappers - Adapta si es necesario

Si los nombres de columnas en Supabase son diferentes a MockData, adapta en el mapper:

#### Ejemplo: Si Supabase usa snake_case pero Domain usa camelCase

```typescript
// ANTES
return raw

// DESPUÉS
return {
  ...raw,
  imageUrl: raw.imagen_url,  // imagen_url → imageUrl
  buttonText: raw.boton_texto, // boton_texto → buttonText
  buttonUrl: raw.boton_url,   // boton_url → buttonUrl
}
```

### 6. Verificar Use-Cases

Los use-cases **no cambian**. Siguen igual:

```typescript
// lib/application/use-cases/hero/get-hero.use-case.ts
export class GetHeroUseCase {
  async execute(): Promise<Hero> {
    const raw = await this.repository.findById("default")
    return this.mapper.toDomain(raw) // ← Funciona igual
  }
}
```

### 7. Verificar API Routes

Los API routes **no cambian**. Siguen igual:

```typescript
// app/api/hero/route.ts
export async function GET() {
  const useCase = UseCaseFactory.createGetHeroUseCase()
  const hero = await useCase.execute() // ← Funciona igual
  return NextResponse.json(hero)
}
```

### 8. Verificar Servicios

Los servicios **no cambian**. Siguen haciendo fetch al API:

```typescript
// lib/services/hero.service.ts
export const heroService = {
  async getHeroData() {
    return fetch('/api/hero').then(r => r.json()) // ← Sin cambios
  }
}
```

### 9. Verificar Componentes

Los componentes **no cambian**. Siguen usando el service:

```typescript
// components/hero-section.tsx
const data = await heroService.getHeroData() // ← Sin cambios
```

### 10. Testear

Testea cada endpoint:

```bash
curl http://localhost:3000/api/hero
curl http://localhost:3000/api/couple-info
curl http://localhost:3000/api/gift-registry
# ... etc
```

O usa el script de verificación:
```bash
npm run verify
```

---

## Operaciones de Base de Datos

### Obtener un registro por ID

```typescript
// Server-side query
const { data, error } = await supabase
  .from('heroes')
  .select()
  .eq('id', id)
  .single()
```

### Obtener todos los registros

```typescript
const { data, error } = await supabase
  .from('heroes')
  .select()
```

### Insertar un registro

```typescript
const { data, error } = await supabase
  .from('heroes')
  .insert([{ titulo: 'Nuevo héroe', subtitulo: 'Desc' }])
  .select()
  .single()
```

### Actualizar un registro

```typescript
const { data, error } = await supabase
  .from('heroes')
  .update({ titulo: 'Actualizado' })
  .eq('id', id)
  .select()
  .single()
```

### Eliminar un registro

```typescript
const { error } = await supabase
  .from('heroes')
  .delete()
  .eq('id', id)
```

---

## Con Autenticación (si es necesario)

Si necesitas obtener el usuario actual:

```typescript
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()

// Luego usar user.id para filtrar
const { data } = await supabase
  .from('heroes')
  .select()
  .eq('user_id', user?.id)
```

---

## Row Level Security (RLS)

Si activas RLS en Supabase, las policies se aplican automáticamente.

Ejemplo: Solo el dueño puede ver sus datos
```sql
CREATE POLICY "Users can view their own data"
  ON heroes
  FOR SELECT
  USING (user_id = auth.uid());
```

El código no cambia, Supabase lo maneja.

---

## Caché y Performance

Si quieres caché, actualiza el repository:

```typescript
export class HeroRepository {
  private cache: Map<string, any> = new Map()
  private cacheExpiry: number = 5 * 60 * 1000 // 5 minutos

  async findById(id: string): Promise<any> {
    // Verificar cache
    if (this.cache.has(id)) {
      return this.cache.get(id)
    }

    // Query a Supabase
    const supabase = createClient()
    const { data, error } = await supabase
      .from('heroes')
      .select()
      .eq('id', id)
      .single()

    if (error) throw error

    // Guardar en cache
    this.cache.set(id, data)
    setTimeout(() => this.cache.delete(id), this.cacheExpiry)

    return data
  }
}
```

---

## Manejo de Errores

Mejora el manejo de errores:

```typescript
async findById(id: string): Promise<any> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('heroes')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      console.error('[Repository] Database error:', error)
      throw new Error(`Failed to fetch hero: ${error.message}`)
    }

    if (!data) {
      throw new Error('Hero not found')
    }

    return data
  } catch (error) {
    console.error('[Repository] Unexpected error:', error)
    throw error
  }
}
```

---

## Transiciones Gradual

**Opción 1: Todo a la vez**
- Cambias todos los repositories de una vez
- Pruebas todo
- Deploy

**Opción 2: Gradual (recomendado)**
- Cambias un repository
- Pruebas que funciona
- Cambias el siguiente
- etc.

Esto es **seguro** porque use-cases y API routes no cambian.

---

## Rollback

Si algo sale mal, simplemente **revertir al MockData** es trivial:

```typescript
// Revertir a MockData
export class HeroRepository {
  async findById(id: string): Promise<any> {
    return heroData // ← Volver a MockData
  }
}
```

**Eso es todo.**

---

## Checklist de Migración

```
□ Supabase cuenta creada y conectada
□ Variables de entorno configuradas
□ Tablas creadas en Supabase
□ Datos iniciales insertados
□ Repository hero actualizado y testeado
□ Repository couple-info actualizado y testeado
□ Repository gift-registry actualizado y testeado
□ Repository event-details actualizado y testeado
□ Repository itinerary actualizado y testeado
□ Repository logistics actualizado y testeado
□ Repository photo-gallery actualizado y testeado
□ Repository confirmacion-asistencia actualizado y testeado
□ Todos los endpoints retornan datos correctamente
□ Componentes funcionan sin cambios
□ Cache implementado (opcional)
□ Errores manejados correctamente
□ Deploy a producción
```

---

## Soporte

Si tienes problemas:

1. **Verifica las variables de entorno** - Son caso-sensitivas
2. **Verifica la estructura de tablas** - Nombres y tipos deben coincidir
3. **Verifica RLS policies** - Si está activado, asegúrate que permita reads
4. **Verifica los mappers** - Nombres de columnas pueden diferir
5. **Lee logs de Supabase** - Dashboard tiene logs detallados

---

**¡Listo! Migración a Supabase completada con cero cambios en componentes.**
