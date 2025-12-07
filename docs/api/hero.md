# Hero API Documentation

## Overview

The Hero API provides data for the hero section of the wedding website, including couple names, wedding date, countdown timer information, and background image details.

---

## Endpoint

### GET `/api/hero`

Retrieves hero section data for displaying the main banner with couple names, wedding date, and background image.

#### Request
- **Method:** `GET`
- **URL:** `/api/hero`
- **Headers:** None required
- **Body:** None

#### Response

**Success Response (200 OK)**

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

**Error Response (500 Internal Server Error)**

\`\`\`json
{
  "error": "Failed to fetch hero data",
  "details": "Specific error message"
}
\`\`\`

---

## Data Schema

### Hero

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Couple names (e.g., "Julia & Armando") |
| `subtitle` | `string` | Yes | Subtitle text displayed below the title |
| `dateLabel` | `string` | Yes | Human-readable wedding date |
| `targetDateISO` | `string` | Yes | ISO 8601 date string for countdown timer |
| `imageSrc` | `string` | Yes | Path to hero background image |
| `imageAlt` | `string` | Yes | Alt text for accessibility |
| `detailsId` | `string` | No | HTML ID for smooth scroll navigation |

---

## Usage Example

### Client-Side (React/Next.js)

\`\`\`typescript
import { apiService } from '@/lib/services/api.service'
import type { Hero } from '@/lib/interfaces/Hero'

async function fetchHeroData() {
  try {
    const data: Hero = await apiService.getHero()
    console.log(data.title) // "Julia & Armando"
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

---

## Caching

- **Cache-Control:** `public, s-maxage=3600, stale-while-revalidate=86400`
- Data is cached for 1 hour (3600 seconds)
- Stale content can be served for up to 24 hours while revalidating

---

## Architecture

### Layered Structure

\`\`\`
app/api/hero/
├── route.ts                    # API endpoint handler
├── hero-services/
│   └── hero.service.ts        # Business logic layer
└── data/
    └── hero-data.ts           # Data source
\`\`\`

### Service Layer
The service layer (`HeroService`) provides:
- Data retrieval methods
- Validation logic
- Business rules enforcement
- Future scalability for database integration

### Client Service
Centralized API calls in `lib/services/api.service.ts`:
- Consistent error handling
- Response parsing
- Type safety
- Easy maintenance

---

## Future Enhancements

1. **Database Integration**: Replace static data with database queries
2. **Multi-language Support**: Add i18n for different locales
3. **Image Optimization**: Include responsive image metadata
4. **Real-time Updates**: WebSocket support for live countdown
5. **A/B Testing**: Support multiple hero variants
6. **Authentication**: Protected routes for editing hero content

---

## Related Endpoints

- `GET /api/gift-registry` - Gift registry data
- `GET /api/event-details` - Event details data
- `GET /api/itinerary` - Event itinerary data
- `GET /api/photo-gallery` - Photo gallery data
