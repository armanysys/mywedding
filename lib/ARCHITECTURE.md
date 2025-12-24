# Arquitectura por Capas - Wedding App

## Visión General

Esta aplicación implementa una arquitectura limpia de 3 capas que separa responsabilidades y facilita el testing, mantenimiento y escalabilidad.

```
┌─────────────────────────────────────────────────────────────┐
│  COMPONENTES (React)                                         │
│  - login, setup, settings, pages                            │
└──────────────────┬──────────────────────────────────────────┘
                   │ (HTTP Requests)
┌──────────────────▼──────────────────────────────────────────┐
│  SERVICIOS - lib/services/                                  │
│  - Clientes HTTP que consumen el API                         │
│  - SIN CAMBIOS respecto a componentes existentes             │
└──────────────────┬──────────────────────────────────────────┘
                   │ (Fetch)
┌──────────────────▼──────────────────────────────────────────┐
│  API ROUTES - app/api/                                      │
│  - Exponen endpoints HTTP                                   │
│  - Delegan a use-cases                                      │
│  - Manejan errores y respuestas HTTP                        │
└──────────────────┬──────────────────────────────────────────┘
                   │ (Call)
┌──────────────────▼──────────────────────────────────────────┐
│  USE-CASES - lib/application/use-cases/                     │
│  - Lógica de negocio                                        │
│  - Orquestan repositories                                   │
│  - Aplican reglas de negocio                                │
│  - Retornan Domain Models                                   │
└──────────────────┬──────────────────────────────────────────┘
                   │ (Call)
┌──────────────────▼──────────────────────────────────────────┐
│  INFRASTRUCTURE - lib/infrastructure/                        │
│  ├─ Repositories: Acceso a datos (MockData → Supabase)      │
│  └─ Mappers: Transforman datos BD → Domain Models           │
└──────────────────┬──────────────────────────────────────────┘
                   │ (Query)
┌──────────────────▼──────────────────────────────────────────┐
│  DATOS - MockData / Supabase                                │
│  - Base de datos o fuente de datos                          │
└─────────────────────────────────────────────────────────────┘
```

## Capas Detalladas

### 1. Presentación (Components)
- **Ubicación**: `components/`, `app/`
- **Responsabilidad**: Mostrar UI
- **Comunicación**: Usa `lib/services` para obtener datos
- **Sin cambios**: Los componentes existentes funcionan igual

### 2. Servicios (Application Services)
- **Ubicación**: `lib/services/`
- **Responsabilidad**: Clientes HTTP
- **Comunicación**: Hacen fetch al `app/api`
- **Ejemplo**:
  ```typescript
  export const heroService = {
    async getHeroData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`)
      return response.json()
    }
  }
  ```

### 3. API Routes (Presentación Backend)
- **Ubicación**: `app/api/`
- **Responsabilidad**: Exponer endpoints HTTP
- **Comunicación**: Instancian use-cases
- **Ejemplo**:
  ```typescript
  export async function GET() {
    const useCase = UseCaseFactory.createGetHeroUseCase()
    const hero = await useCase.execute()
    return Response.json(hero)
  }
  ```

### 4. Use-Cases (Lógica de Negocio)
- **Ubicación**: `lib/application/use-cases/`
- **Responsabilidad**: Orquestar y aplicar reglas de negocio
- **Comunicación**: Usan repositories y mappers
- **Ejemplo**:
  ```typescript
  export class GetHeroUseCase {
    async execute(): Promise<Hero> {
      const raw = await this.repository.findById(1)
      return this.mapper.toDomain(raw)
    }
  }
  ```

### 5. Infrastructure (Acceso a Datos)
- **Ubicación**: `lib/infrastructure/`
- **Estructura**:
  - **Repositories**: Obtienen datos crudos
  - **Mappers**: Transforman datos → Domain Models

#### Repositories
- Acceden a MockData (actualmente) o Supabase (futuro)
- No contienen lógica de negocio
- Métodos simples: `findById()`, `getAll()`, etc.

#### Mappers
- Transforman datos crudos → Domain Models
- Facilitan cambio de fuente de datos
- Reutilizables

### 6. Domain Models
- **Ubicación**: `Domain/`
- **Responsabilidad**: Definir estructura de datos
- **Entidades**: `Hero`, `CoupleInfo`, `GiftRegistry`, etc.

### 7. Factory Pattern
- **Ubicación**: `lib/application/factories/use-case.factory.ts`
- **Responsabilidad**: Instanciar use-cases con dependencias
- **Beneficio**: Centraliza la creación, facilita cambios futuros

## Flujo de Datos - Ejemplo

### Obtener datos de Hero

1. **Componente**:
   ```typescript
   const { data } = useSWR('/api/hero', heroService.getHeroData)
   ```

2. **Service** (lib/services/hero.service.ts):
   ```typescript
   async getHeroData() {
     return fetch('/api/hero').then(r => r.json())
   }
   ```

3. **API Route** (app/api/hero/route.ts):
   ```typescript
   const useCase = UseCaseFactory.createGetHeroUseCase()
   return Response.json(await useCase.execute())
   ```

4. **Use-Case** (lib/application/use-cases/hero/get-hero.use-case.ts):
   ```typescript
   async execute() {
     const raw = await this.repository.findById(1)
     return this.mapper.toDomain(raw)
   }
   ```

5. **Repository** (lib/infrastructure/repositories/hero.repository.ts):
   ```typescript
   async findById(id) {
     return heroData // MockData (futuro: query a Supabase)
   }
   ```

6. **Mapper** (lib/infrastructure/mappers/hero.mapper.ts):
   ```typescript
   static toDomain(raw) {
     return { ...raw } // Transformar si es necesario
   }
   ```

## Migrando a Supabase

La belleza de esta arquitectura es que **solo cambias los repositories**:

```typescript
// ANTES (MockData)
async findById(id: string) {
  return heroData
}

// DESPUÉS (Supabase)
async findById(id: string) {
  const supabase = createClient()
  const { data } = await supabase.from('heroes').select().single()
  return data
}
```

**Todo lo demás sigue igual**:
- Use-cases: ✅ Sin cambios
- API Routes: ✅ Sin cambios
- Servicios: ✅ Sin cambios
- Componentes: ✅ Sin cambios

## Ventajas de Esta Arquitectura

✅ **Separación de responsabilidades** - Cada capa tiene un propósito claro  
✅ **Testabilidad** - Puedes testear use-cases sin mock de Next.js  
✅ **Mantenibilidad** - Cambios en una capa no afectan otras  
✅ **Reutilización** - Un use-case en múltiples endpoints  
✅ **Escalabilidad** - Agregar features sin romper lo existente  
✅ **Fácil migración** - De MockData a Supabase es trivial  

## Estructura de Carpetas Completa

```
lib/
├── application/
│   ├── factories/
│   │   └── use-case.factory.ts
│   └── use-cases/
│       ├── confirmacion-asistencia/
│       ├── couple-info/
│       ├── event-details/
│       ├── gift-registry/
│       ├── hero/
│       ├── itinerary/
│       ├── logistics/
│       └── photo-gallery/
├── infrastructure/
│   ├── mappers/
│   │   ├── confirmacion-asistencia.mapper.ts
│   │   ├── couple-info.mapper.ts
│   │   ├── event-details.mapper.ts
│   │   ├── gift-registry.mapper.ts
│   │   ├── hero.mapper.ts
│   │   ├── itinerary.mapper.ts
│   │   ├── logistics.mapper.ts
│   │   ├── photo-gallery.mapper.ts
│   │   └── index.ts
│   └── repositories/
│       ├── confirmacion-asistencia.repository.ts
│       ├── couple-info.repository.ts
│       ├── event-details.repository.ts
│       ├── gift-registry.repository.ts
│       ├── hero.repository.ts
│       ├── itinerary.repository.ts
│       ├── logistics.repository.ts
│       ├── photo-gallery.repository.ts
│       └── index.ts
├── services/
│   ├── confirmacion-asistencia.service.ts
│   ├── couple-info.service.ts
│   ├── event-details.service.ts
│   ├── gift-registry.service.ts
│   ├── hero.service.ts
│   ├── itinerary.service.ts
│   ├── logistics.service.ts
│   ├── photo-gallery.service.ts
│   └── index.ts
├── supabase/
│   ├── admin.ts
│   ├── middleware.ts
│   └── server.ts
├── ARCHITECTURE.md (este archivo)
└── utils.ts
```

## Próximos Pasos

1. **Testing**: Añade tests unitarios para use-cases
2. **Supabase**: Reemplaza repositories con queries a Supabase
3. **Validación**: Añade validación en use-cases usando Zod
4. **Error Handling**: Mejora manejo de errores personalizado
5. **Caché**: Implementa caché en repositories
