# Hero API Documentation

## Overview

The Hero API provides data for the hero section of the wedding website, including couple names, wedding date, countdown timer information, and background image details.

## Endpoint

\`\`\`
GET /api/hero
\`\`\`

## Response Format

### Success Response (200 OK)

\`\`\`json
{
  "title": "Julia & Armando",
  "subtitle": "Celebra con nosotros",
  "dateLabel": "19 de Abril, 2026",
  "targetDateISO": "2026-04-19T00:00:00",
  "imageSrc": "/romantic-wedding-photo.jpg",
  "imageAlt": "Julia y Armando",
  "detailsId": "details"
}
\`\`\`

### Error Response (500 Internal Server Error)

\`\`\`json
{
  "error": "Failed to fetch hero data",
  "details": "Error message"
}
\`\`\`

## Schema Definition

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Couple names (e.g., "Julia & Armando") |
| `subtitle` | string | Yes | Subtitle text displayed below the title |
| `dateLabel` | string | Yes | Human-readable wedding date |
| `targetDateISO` | string | Yes | ISO 8601 date string for countdown timer |
| `imageSrc` | string | Yes | Path to hero background image |
| `imageAlt` | string | Yes | Alt text for accessibility |
| `detailsId` | string | No | HTML ID for smooth scroll navigation |

## Usage Examples

### Client-side Fetch (React/Next.js)

\`\`\`typescript
import { apiService } from '@/lib/services/api.service'

async function loadHeroData() {
  try {
    const heroData = await apiService.getHero()
    console.log(heroData.title) // "Julia & Armando"
  } catch (error) {
    console.error('Failed to load hero data:', error)
  }
}
\`\`\`

### Direct Fetch

\`\`\`typescript
const response = await fetch('/api/hero')
const data = await response.json()
\`\`\`

## Caching Strategy

- **Cache-Control**: `public, s-maxage=3600, stale-while-revalidate=86400`
- Content is cached for 1 hour (3600 seconds)
- Stale content can be served for up to 24 hours while revalidating

## Service Layer Architecture

The Hero API follows a three-layer architecture:

1. **Data Layer** (`app/api/data/hero-data.ts`): Contains the static hero data
2. **Service Layer** (`app/api/hero-services/hero.service.ts`): Business logic and validation
3. **API Layer** (`app/api/hero/route.ts`): HTTP endpoint and error handling

## TypeScript Interface

\`\`\`typescript
interface Hero {
  title: string
  subtitle: string
  dateLabel: string
  targetDateISO: string
  imageSrc: string
  imageAlt: string
  detailsId?: string
}
\`\`\`

## Error Handling

The API implements comprehensive error handling:
- Validates data structure before returning
- Logs errors server-side with `[API] Hero Error:` prefix
- Returns structured error responses with details
- Includes HTTP status codes (200, 500)

## Future Enhancements

Potential improvements for scalability:
- Database integration for dynamic content
- Multi-language support
- Image optimization metadata
- Real-time updates via WebSocket
- A/B testing variants
