# Hero Service Architecture Documentation

## Overview
The Hero service implements a layered architecture pattern that separates concerns between data storage, API endpoints, business logic, and presentation. This structure promotes maintainability, testability, and scalability.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  components/sections/hero.tsx                                │
│  - React Component (use client)                              │
│  - Handles UI state (loading, error)                         │
│  - Consumes hero service                                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ fetch()
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                          │
│  lib/services/hero.service.ts                                │
│  - Centralized API calls                                     │
│  - getHeroData() - Server-side with revalidation            │
│  - getHeroDataClient() - Client-side with caching           │
│  - Error handling                                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP GET
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         API LAYER                            │
│  app/api/hero/route.ts                                       │
│  - RESTful endpoint: GET /api/hero                           │
│  - Response formatting                                       │
│  - HTTP caching headers                                      │
│  - Error responses                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ import
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│  app/api/hero/data/hero-data.ts                              │
│  - Static data source                                        │
│  - Exports heroData constant                                 │
│  - Future: Could connect to database                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    SHARED TYPE DEFINITIONS                   │
│  lib/interfaces/Hero.ts                                      │
│  - TypeScript interface                                      │
│  - Shared between client and server                          │
│  - Type safety across layers                                 │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Layer Breakdown

### 1. Client Layer (components/sections/hero.tsx)
**Purpose:** Renders the hero section UI and manages client-side state

**Responsibilities:**
- Display hero content (title, subtitle, date, image)
- Handle loading and error states
- Fetch data on component mount
- User interactions (scroll behavior)

**Key Features:**
- Client component ("use client")
- Uses React hooks (useState, useEffect)
- Calls getHeroDataClient() from service layer
- Shows loading spinner during data fetch
- Displays error message if fetch fails

**Code Flow:**
\`\`\`tsx
useEffect → getHeroDataClient() → setState → render UI
\`\`\`

---

### 2. Service Layer (lib/services/hero.service.ts)
**Purpose:** Centralize all hero-related API communication

**Functions:**

#### `getHeroData()` - Server-Side
\`\`\`typescript
- Uses: Server Components, SSR, SSG
- Caching: ISR with 1-hour revalidation
- URL: process.env.NEXT_PUBLIC_API_URL + /api/hero
- Returns: Promise<Hero>
\`\`\`

#### `getHeroDataClient()` - Client-Side
\`\`\`typescript
- Uses: Client Components (browser)
- Caching: force-cache (browser cache)
- URL: /api/hero (relative)
- Returns: Promise<Hero>
\`\`\`

**Benefits:**
- Single source of truth for API calls
- Easy to mock for testing
- Consistent error handling
- Flexible caching strategies

---

### 3. API Layer (app/api/hero/route.ts)
**Purpose:** RESTful API endpoint for hero data

**Endpoint:**
\`\`\`
GET /api/hero
\`\`\`

**Response Schema:**
\`\`\`typescript
{
  title: string           // "Julia & Armando"
  subtitle: string        // "Celebra con nosotros"
  dateLabel: string       // "19 de Abril, 2026"
  targetDateISO: string   // "2026-04-19T00:00:00"
  imageSrc: string        // "/romantic-wedding-photo-.jpg"
  imageAlt: string        // "Julia y Armando"
  detailsId: string       // "details"
}
\`\`\`

**HTTP Headers:**
\`\`\`
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
\`\`\`
- `s-maxage=3600`: CDN cache for 1 hour
- `stale-while-revalidate=86400`: Serve stale for 24h while revalidating

**Error Handling:**
\`\`\`typescript
Success: 200 OK + Hero data
Error: 500 Internal Server Error + { error: string }
\`\`\`

**Characteristics:**
- Runs on server only
- Access to environment variables (without NEXT_PUBLIC_)
- Can connect to databases
- Secure API keys handling

---

### 4. Data Layer (app/api/hero/data/hero-data.ts)
**Purpose:** Data source for hero information

**Current Implementation:**
- Static constant export
- Hardcoded wedding data
- Type-safe with Hero interface

**Future Scalability:**
\`\`\`typescript
// Could be replaced with:
- Database query (Supabase, Neon)
- CMS fetch (Contentful, Sanity)
- External API call
- Dynamic user input
\`\`\`

**Location Reasoning:**
- Lives in `/app/api/hero/data/` (server-side)
- Not exposed to client bundle
- Can contain sensitive data if needed
- Easy to replace with database later

---

### 5. Shared Types (lib/interfaces/Hero.ts)
**Purpose:** Type definitions shared across all layers

**Interface:**
\`\`\`typescript
export interface Hero {
  title: string
  subtitle: string
  dateLabel: string
  targetDateISO: string
  imageSrc: string
  imageAlt: string
  detailsId: string
}
\`\`\`

**Why Shared?**
- Ensures type consistency
- TypeScript interfaces don't generate JS code
- Safe to import in both client and server
- Single source of truth for data structure

---

## Data Flow

### Client Request Flow
\`\`\`
1. User visits page
   ↓
2. Hero component mounts
   ↓
3. useEffect triggers
   ↓
4. Calls getHeroDataClient()
   ↓
5. Fetches /api/hero
   ↓
6. API route returns heroData
   ↓
7. Service returns typed data
   ↓
8. Component updates state
   ↓
9. UI renders with data
\`\`\`

### Caching Strategy

**Browser (Client):**
\`\`\`
fetch("/api/hero", { cache: "force-cache" })
→ Cached indefinitely in browser
\`\`\`

**CDN/Edge (Server):**
\`\`\`
Cache-Control: s-maxage=3600
→ Cached for 1 hour on CDN
→ Stale content served for 24h while revalidating
\`\`\`

**ISR (Next.js):**
\`\`\`
next: { revalidate: 3600 }
→ Server regenerates page every hour
\`\`\`

---

## File Structure

\`\`\`
mywedding/
├── app/
│   ├── api/
│   │   └── hero/
│   │       ├── route.ts              # API endpoint (SERVER)
│   │       └── data/
│   │           └── hero-data.ts      # Data source (SERVER)
│   └── page.tsx
├── components/
│   └── sections/
│       └── hero.tsx                  # UI Component (CLIENT)
├── lib/
│   ├── interfaces/
│   │   └── Hero.ts                   # Shared types (BOTH)
│   └── services/
│       └── hero.service.ts           # API calls (BOTH)
└── docs/
    └── api/
        └── hero-service-architecture.md  # This file
\`\`\`

---

## Environment Variables

### NEXT_PUBLIC_API_URL
\`\`\`bash
# Optional - defaults to "" (relative URLs)
NEXT_PUBLIC_API_URL=https://mywedding.vercel.app

# Development (not needed)
# Uses relative URLs: /api/hero

# Production
# Set if API is on different domain
\`\`\`

**Why NEXT_PUBLIC_ prefix?**
- Exposed to browser/client code
- Required for client-side fetch calls
- Without prefix, only available on server

---

## Benefits of This Architecture

### 1. Separation of Concerns
- Data layer: What to serve
- API layer: How to serve it
- Service layer: How to request it
- Client layer: How to display it

### 2. Testability
\`\`\`typescript
// Mock service in tests
jest.mock("@/lib/services/hero.service", () => ({
  getHeroDataClient: jest.fn().mockResolvedValue(mockHeroData)
}))
\`\`\`

### 3. Scalability
- Easy to add new endpoints
- Can replace data source without changing API
- Service layer abstracts implementation details

### 4. Type Safety
- End-to-end TypeScript
- Compile-time error checking
- IDE autocomplete support

### 5. Performance
- Multiple caching layers
- Optimized for both SSR and CSR
- CDN-ready with proper headers

### 6. Maintainability
- Clear file organization
- Single responsibility per file
- Easy to locate and update code

---

## Common Patterns & Best Practices

### Error Handling
\`\`\`typescript
try {
  const data = await getHeroDataClient()
  setHeroData(data)
} catch (err) {
  setError(err.message)
} finally {
  setIsLoading(false)
}
\`\`\`

### Loading States
\`\`\`tsx
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
return <HeroContent data={heroData} />
\`\`\`

### Type Safety
\`\`\`typescript
// Always type API responses
async function getHeroDataClient(): Promise<Hero> {
  const response = await fetch("/api/hero")
  return response.json() // TypeScript knows this is Hero
}
\`\`\`

---

## Future Enhancements

### Database Integration
\`\`\`typescript
// app/api/hero/data/hero-data.ts
import { supabase } from "@/lib/supabase"

export async function getHeroData() {
  const { data } = await supabase
    .from("hero_sections")
    .select("*")
    .single()
  return data
}
\`\`\`

### Dynamic Content
\`\`\`typescript
// Support multiple weddings
GET /api/hero?weddingId=123
\`\`\`

### Caching Invalidation
\`\`\`typescript
// Add mutation endpoint
POST /api/hero/revalidate
// Clears cache on content update
\`\`\`

### Admin Interface
\`\`\`typescript
// CRUD operations
PUT /api/hero
DELETE /api/hero
\`\`\`

---

## Troubleshooting

### API not returning data
1. Check network tab in DevTools
2. Verify `/api/hero` endpoint exists
3. Check server logs for errors

### Type errors
1. Ensure Hero interface is up to date
2. Verify imports use correct path aliases (@/)
3. Check tsconfig.json paths configuration

### Caching issues
1. Clear browser cache
2. Check Cache-Control headers
3. Verify revalidate settings

---

## Related Documentation
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [TypeScript in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
