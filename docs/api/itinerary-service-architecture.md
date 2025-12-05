# Itinerary Service Architecture Documentation

## Overview
The Itinerary service implements a layered architecture pattern that separates concerns between data storage, API endpoints, business logic, and presentation. This structure follows the same pattern as the Hero service, promoting maintainability, testability, and scalability.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  components/sections/itinerary.tsx                           │
│  - React Component (use client)                              │
│  - Handles UI state (loading, error)                         │
│  - Consumes itinerary service                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ fetch()
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                          │
│  lib/services/itinerary.service.ts                           │
│  - Centralized API calls                                     │
│  - getItineraryData() - Server-side with revalidation       │
│  - getItineraryDataClient() - Client-side with caching      │
│  - Error handling                                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP GET
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         API LAYER                            │
│  app/api/itinerary/route.ts                                  │
│  - RESTful endpoint: GET /api/itinerary                      │
│  - Response formatting                                       │
│  - HTTP caching headers                                      │
│  - Error responses                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ import
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│  app/api/data/itinerary-data.ts                              │
│  - Static data source                                        │
│  - Exports itineraryData constant                            │
│  - Future: Could connect to database                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    SHARED TYPE DEFINITIONS                   │
│  lib/interfaces/ItineraryProps.ts                            │
│  - TypeScript interfaces                                     │
│  - Shared between client and server                          │
│  - Type safety across layers                                 │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Layer Breakdown

### 1. Client Layer (components/sections/itinerary.tsx)
**Purpose:** Renders the itinerary section UI and manages client-side state

**Responsibilities:**
- Display wedding day schedule with timeline
- Handle loading and error states
- Fetch data on component mount
- Render schedule items with icons

**Key Features:**
- Client component ("use client")
- Uses React hooks (useState, useEffect)
- Calls getItineraryDataClient() from service layer
- Shows loading spinner during data fetch
- Displays error message if fetch fails
- Maps through schedule items dynamically

**Code Flow:**
\`\`\`tsx
useEffect → getItineraryDataClient() → setState → render schedule UI
\`\`\`

---

### 2. Service Layer (lib/services/itinerary.service.ts)
**Purpose:** Centralize all itinerary-related API communication

**Functions:**

#### `getItineraryData()` - Server-Side
\`\`\`typescript
- Uses: Server Components, SSR, SSG
- Caching: ISR with 1-hour revalidation
- URL: process.env.NEXT_PUBLIC_API_URL + /api/itinerary
- Returns: Promise<ItineraryProps>
\`\`\`

#### `getItineraryDataClient()` - Client-Side
\`\`\`typescript
- Uses: Client Components (browser)
- Caching: force-cache (browser cache)
- URL: /api/itinerary (relative)
- Returns: Promise<ItineraryProps>
\`\`\`

**Benefits:**
- Single source of truth for API calls
- Easy to mock for testing
- Consistent error handling
- Flexible caching strategies

---

### 3. API Layer (app/api/itinerary/route.ts)
**Purpose:** RESTful API endpoint for itinerary data

**Endpoint:**
\`\`\`
GET /api/itinerary
\`\`\`

**Response Schema:**
\`\`\`typescript
{
  Title: string              // "Itinerario del Día"
  Description: string        // "Un día lleno de amor, alegría y celebración"
  ScheduleItem: [
    {
      time: string          // "5:00 PM"
      title: string         // "Ceremonia"
      description: string   // "Intercambio de votos en el jardín principal"
      icon: string          // "Church" (references iconMap)
    },
    // ... more schedule items
  ]
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
Success: 200 OK + ItineraryProps data
Error: 500 Internal Server Error + { error: string }
\`\`\`

**Characteristics:**
- Runs on server only
- Access to environment variables
- Can connect to databases
- Secure API keys handling

---

### 4. Data Layer (app/api/data/itinerary-data.ts)
**Purpose:** Data source for wedding day schedule information

**Current Implementation:**
- Static constant export
- Hardcoded wedding schedule
- Type-safe with ItineraryProps interface
- Contains 6 schedule items (ceremony to cake cutting)

**Schedule Items:**
1. Ceremonia (5:00 PM)
2. Cóctel de Bienvenida (6:00 PM)
3. Recepción (7:00 PM)
4. Primer Baile (9:00 PM)
5. Fiesta (9:30 PM)
6. Pastel (11:00 PM)

**Future Scalability:**
\`\`\`typescript
// Could be replaced with:
- Database query (Supabase, Neon)
- CMS fetch (Contentful, Sanity)
- Admin panel for schedule management
- Dynamic time zone conversion
- Multi-language support
\`\`\`

**Location Reasoning:**
- Lives in `/app/api/data/` (server-side)
- Not exposed to client bundle
- Centralized with other data sources
- Easy to replace with database later

---

### 5. Shared Types (lib/interfaces/ItineraryProps.ts)
**Purpose:** Type definitions shared across all layers

**Interfaces:**
\`\`\`typescript
export interface ItineraryProps {
  Title: string
  Description: string
  ScheduleItem: ScheduleItem[]
}

export interface ScheduleItem {
  time: string
  title: string
  description: string
  icon: string  // References iconMap keys
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
2. Itinerary component mounts
   ↓
3. useEffect triggers
   ↓
4. Calls getItineraryDataClient()
   ↓
5. Fetches /api/itinerary
   ↓
6. API route returns itineraryData
   ↓
7. Service returns typed data
   ↓
8. Component updates state
   ↓
9. UI renders schedule with icons
\`\`\`

### Caching Strategy

**Browser (Client):**
\`\`\`
fetch("/api/itinerary", { cache: "force-cache" })
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
│   │   ├── itinerary/
│   │   │   └── route.ts              # API endpoint (SERVER)
│   │   └── data/
│   │       └── itinerary-data.ts     # Data source (SERVER)
│   └── page.tsx
├── components/
│   └── sections/
│       └── itinerary.tsx             # UI Component (CLIENT)
├── lib/
│   ├── interfaces/
│   │   └── ItineraryProps.ts         # Shared types (BOTH)
│   ├── services/
│   │   └── itinerary.service.ts      # API calls (BOTH)
│   └── data/
│       └── icon-map.ts               # Icon mapping utility
└── docs/
    └── api/
        └── itinerary-service-architecture.md  # This file
\`\`\`

---

## Icon Integration

The itinerary uses a shared `iconMap` from `lib/data/icon-map.ts` to render icons for each schedule item:

**Supported Icons:**
- Church (Ceremony)
- Utensils (Reception, Cocktails)
- Music (Dance, Party)
- Cake (Cake cutting)

**Usage:**
\`\`\`typescript
const Icon = iconMap[item.icon as keyof typeof iconMap]
<Icon className="w-6 h-6" />
\`\`\`

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
jest.mock("@/lib/services/itinerary.service", () => ({
  getItineraryDataClient: jest.fn().mockResolvedValue(mockItineraryData)
}))
\`\`\`

### 3. Scalability
- Easy to add new schedule items
- Can replace data source without changing API
- Service layer abstracts implementation details
- Ready for database integration

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
- Consistent with other services (Hero, Event Details)

---

## Common Patterns & Best Practices

### Error Handling
\`\`\`typescript
try {
  const data = await getItineraryDataClient()
  setItineraryData(data)
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
if (!itineraryData) return null
return <ItineraryContent data={itineraryData} />
\`\`\`

### Type Safety
\`\`\`typescript
// Always type API responses
async function getItineraryDataClient(): Promise<ItineraryProps> {
  const response = await fetch("/api/itinerary")
  return response.json() // TypeScript knows this is ItineraryProps
}
\`\`\`

---

## Future Enhancements

### Database Integration
\`\`\`typescript
// app/api/data/itinerary-data.ts
import { supabase } from "@/lib/supabase"

export async function getItineraryData() {
  const { data } = await supabase
    .from("schedule_items")
    .select("*")
    .order("time", { ascending: true })
  return data
}
\`\`\`

### Dynamic Time Zones
\`\`\`typescript
// Convert times based on guest location
GET /api/itinerary?timezone=America/Los_Angeles
\`\`\`

### Multi-language Support
\`\`\`typescript
// Return schedule in different languages
GET /api/itinerary?lang=en
GET /api/itinerary?lang=es
\`\`\`

### Admin Panel
\`\`\`typescript
// CRUD operations for schedule management
POST /api/itinerary      // Add schedule item
PUT /api/itinerary/:id   // Update schedule item
DELETE /api/itinerary/:id // Remove schedule item
\`\`\`

### Real-time Updates
\`\`\`typescript
// WebSocket or polling for live schedule changes
- Venue changes
- Time adjustments
- Additional events
\`\`\`

---

## Migration Notes

### Changes from Static Implementation

**Before (Static):**
\`\`\`typescript
// lib/data/itinerary.data.ts
export const itineraryProps = { ... }

// components/sections/itinerary.tsx
import { itineraryProps } from "@/lib/data/itinerary.data"
// Direct usage - no async
\`\`\`

**After (API-based):**
\`\`\`typescript
// app/api/data/itinerary-data.ts
export const itineraryData = { ... }

// components/sections/itinerary.tsx
import { getItineraryDataClient } from "@/lib/services/itinerary.service"
// Async fetch with loading/error states
\`\`\`

**Benefits of Migration:**
- Enables future database integration
- Adds caching at multiple levels
- Consistent with other sections
- Better error handling
- Testable architecture

---

## Troubleshooting

### API not returning data
1. Check network tab in DevTools
2. Verify `/api/itinerary` endpoint exists
3. Check server logs for errors
4. Confirm itineraryData is properly exported

### Loading state never completes
1. Check for JavaScript errors in console
2. Verify fetch is not blocked by CORS
3. Check network connectivity
4. Ensure API route is deployed

### Icons not displaying
1. Verify icon names in data match iconMap keys
2. Check iconMap import path
3. Ensure lucide-react is installed
4. Verify icon component rendering

### Type errors
1. Ensure ItineraryProps interface is up to date
2. Verify imports use correct path aliases (@/)
3. Check tsconfig.json paths configuration
4. Rebuild TypeScript after changes

### Caching issues
1. Clear browser cache
2. Check Cache-Control headers in Network tab
3. Verify revalidate settings in service
4. Test in incognito mode

---

## Testing Recommendations

### Unit Tests
\`\`\`typescript
describe("getItineraryDataClient", () => {
  it("should fetch and return itinerary data", async () => {
    const data = await getItineraryDataClient()
    expect(data).toHaveProperty("Title")
    expect(data.ScheduleItem).toBeInstanceOf(Array)
  })
})
\`\`\`

### Integration Tests
\`\`\`typescript
describe("Itinerary Component", () => {
  it("should render schedule items", async () => {
    render(<Itinerary />)
    await waitFor(() => {
      expect(screen.getByText("Ceremonia")).toBeInTheDocument()
    })
  })
})
\`\`\`

### E2E Tests
\`\`\`typescript
test("should display complete wedding schedule", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByText("Itinerario del Día")).toBeVisible()
  await expect(page.getByText("5:00 PM")).toBeVisible()
})
\`\`\`

---

## Related Documentation
- [Hero Service Architecture](./hero-service-architecture.md)
- [Event Details Service Architecture](./event-details-service-architecture.md)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [TypeScript in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

---

## Summary

The Itinerary service provides a robust, scalable architecture for managing wedding day schedule data. By following the same layered pattern as other services in the application, it ensures consistency, maintainability, and readiness for future enhancements like database integration and real-time updates.

**Key Takeaways:**
- 4 layers: Data → API → Service → Client
- Type-safe end-to-end
- Multiple caching strategies
- Easy to test and maintain
- Consistent with Hero and Event Details services
- Ready for production deployment
