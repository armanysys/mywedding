# Ejemplos Prácticos - Cómo Agregar Nuevas Features

## Escenario 1: Agregar un nuevo endpoint GET simple

### Tarea: Crear endpoint `/api/testimonials` que retorne testimonios

### Paso 1: Crear Domain Model
```typescript
// Domain/Testimonial.ts
export interface Testimonial {
  id: string
  author: string
  content: string
  role: string
  image?: string
}

export interface TestimonialSection {
  title: string
  testimonials: Testimonial[]
}
```

### Paso 2: Crear Mapper
```typescript
// lib/infrastructure/mappers/testimonial.mapper.ts
import type { TestimonialSection } from "@/Domain/Testimonial"

export class TestimonialMapper {
  static toDomain(raw: any): TestimonialSection {
    return {
      title: raw.title,
      testimonials: raw.testimonials.map((t: any) => ({
        id: t.id,
        author: t.author,
        content: t.content,
        role: t.role,
        image: t.image,
      }))
    }
  }
}
```

### Paso 3: Crear Repository
```typescript
// lib/infrastructure/repositories/testimonial.repository.ts
import { testimonialData } from "@/MockData/testimonial-data"

export class TestimonialRepository {
  async getAll(): Promise<any> {
    // Futuro: query a Supabase
    return testimonialData
  }
}
```

### Paso 4: Crear Use-Case
```typescript
// lib/application/use-cases/testimonial/get-testimonials.use-case.ts
import type { TestimonialSection } from "@/Domain/Testimonial"
import type { TestimonialRepository } from "@/lib/infrastructure/repositories/testimonial.repository"
import type { TestimonialMapper } from "@/lib/infrastructure/mappers/testimonial.mapper"

export class GetTestimonialsUseCase {
  constructor(
    private repository: TestimonialRepository,
    private mapper: TestimonialMapper
  ) {}

  async execute(): Promise<TestimonialSection> {
    const raw = await this.repository.getAll()
    return this.mapper.toDomain(raw)
  }
}
```

### Paso 5: Agregar a Factory
```typescript
// lib/application/factories/use-case.factory.ts
// Agregar al class:

static createGetTestimonialsUseCase(): GetTestimonialsUseCase {
  const repository = new TestimonialRepository()
  const mapper = TestimonialMapper
  return new GetTestimonialsUseCase(repository, mapper)
}
```

### Paso 6: Crear API Route
```typescript
// app/api/testimonials/route.ts
import { NextResponse } from "next/server"
import { UseCaseFactory } from "@/lib/application/factories/use-case.factory"

export async function GET() {
  try {
    const useCase = UseCaseFactory.createGetTestimonialsUseCase()
    const testimonials = await useCase.execute()

    return NextResponse.json(testimonials, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    )
  }
}
```

### Paso 7: Crear Service (cliente HTTP)
```typescript
// lib/services/testimonial.service.ts
export const testimonialService = {
  async getTestimonials() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`
    )
    if (!response.ok) throw new Error('Failed to fetch testimonials')
    return response.json()
  }
}
```

### Paso 8: Agregar a lib/services/index.ts
```typescript
export { testimonialService } from './testimonial.service'
```

### Paso 9: Usar en Componente
```typescript
// components/testimonials-section.tsx
'use client'

import { useEffect, useState } from 'react'
import { testimonialService } from '@/lib/services'
import type { TestimonialSection } from '@/Domain/Testimonial'

export function TestimonialsSection() {
  const [data, setData] = useState<TestimonialSection | null>(null)

  useEffect(() => {
    testimonialService.getTestimonials().then(setData)
  }, [])

  if (!data) return null

  return (
    <section>
      <h2>{data.title}</h2>
      {data.testimonials.map(t => (
        <div key={t.id}>
          <p>{t.content}</p>
          <p>{t.author}</p>
        </div>
      ))}
    </section>
  )
}
```

---

## Escenario 2: Agregar un endpoint POST con validación

### Tarea: Crear endpoint `/api/rsvp` para guardar confirmaciones

### Paso 1: Crear Use-Case con validación
```typescript
// lib/application/use-cases/rsvp/create-rsvp.use-case.ts
import type { RSVPRepository } from "@/lib/infrastructure/repositories/rsvp.repository"

export interface CreateRSVPInput {
  name: string
  email: string
  numberOfGuests: number
  dietary?: string
  message?: string
}

export class CreateRSVPUseCase {
  constructor(private repository: RSVPRepository) {}

  async execute(input: CreateRSVPInput) {
    // Validación
    if (!input.name || input.name.trim().length === 0) {
      throw new Error('Name is required')
    }
    if (!input.email || !input.email.includes('@')) {
      throw new Error('Valid email is required')
    }
    if (input.numberOfGuests < 1 || input.numberOfGuests > 10) {
      throw new Error('Number of guests must be between 1 and 10')
    }

    // Guardar
    const rsvp = await this.repository.create({
      ...input,
      createdAt: new Date()
    })

    return rsvp
  }
}
```

### Paso 2: Agregar método POST a Repository
```typescript
// lib/infrastructure/repositories/rsvp.repository.ts
export class RSVPRepository {
  async create(data: any): Promise<any> {
    // Futuro: INSERT a Supabase
    console.log('RSVP saved:', data)
    return data
  }
}
```

### Paso 3: Agregar a Factory
```typescript
static createCreateRSVPUseCase(): CreateRSVPUseCase {
  const repository = new RSVPRepository()
  return new CreateRSVPUseCase(repository)
}
```

### Paso 4: Crear API Route POST
```typescript
// app/api/rsvp/route.ts
import { NextResponse } from "next/server"
import { UseCaseFactory } from "@/lib/application/factories/use-case.factory"

export async function POST(request: Request) {
  try {
    const input = await request.json()
    const useCase = UseCaseFactory.createCreateRSVPUseCase()
    const rsvp = await useCase.execute(input)

    return NextResponse.json(rsvp, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create RSVP' },
      { status: 400 }
    )
  }
}
```

### Paso 5: Crear Service con POST
```typescript
// lib/services/rsvp.service.ts
export const rsvpService = {
  async createRSVP(input: CreateRSVPInput) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rsvp`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      }
    )
    if (!response.ok) throw new Error('Failed to create RSVP')
    return response.json()
  }
}
```

### Paso 6: Usar en Componente
```typescript
// components/rsvp-form.tsx
'use client'

import { useState } from 'react'
import { rsvpService } from '@/lib/services'

export function RSVPForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      await rsvpService.createRSVP({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        numberOfGuests: parseInt(formData.get('guests') as string),
        dietary: formData.get('dietary') as string,
        message: formData.get('message') as string,
      })
      // Success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <input name="guests" type="number" min="1" max="10" required />
      <input name="dietary" />
      <textarea name="message" />
      <button disabled={loading}>{loading ? 'Guardando...' : 'Confirmar'}</button>
      {error && <p>{error}</p>}
    </form>
  )
}
```

---

## Resumen Rápido: Checklist para nuevas features

```
□ 1. Crear Domain Model (Domain/*.ts)
□ 2. Crear Mapper (lib/infrastructure/mappers/*.mapper.ts)
□ 3. Crear Repository (lib/infrastructure/repositories/*.repository.ts)
□ 4. Crear Use-Case (lib/application/use-cases/*/*.use-case.ts)
□ 5. Agregar a Factory (lib/application/factories/use-case.factory.ts)
□ 6. Crear API Route (app/api/**/route.ts)
□ 7. Crear Service (lib/services/*.service.ts)
□ 8. Agregar a lib/services/index.ts
□ 9. Crear Componente que usa el Service
□ 10. Testear
```

---

## Migración de MockData a Supabase

Cuando estes listo para usar Supabase, **solo cambias los repositories**:

```typescript
// lib/infrastructure/repositories/hero.repository.ts

import { createClient } from '@/lib/supabase/server'

export class HeroRepository {
  async findById(id: string): Promise<any> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('heroes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async getAll(): Promise<any[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('heroes')
      .select('*')

    if (error) throw error
    return data
  }
}
```

**Eso es todo**. Todo lo demás sigue funcionando igual.
