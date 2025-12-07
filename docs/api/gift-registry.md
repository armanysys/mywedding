# Gift Registry API Documentation

## Overview
The Gift Registry API provides gift registry information for the wedding website, including store registries and bank transfer details.

---

## Endpoint

### GET `/api/gift-registry`

Retrieves complete gift registry data including store registries (Liverpool, Amazon, etc.) and bank transfer account information.

#### Request
- **Method:** `GET`
- **URL:** `/api/gift-registry`
- **Headers:** None required
- **Body:** None

#### Response

**Success Response (200 OK)**

\`\`\`json
{
  "title": "Mesa de Regalos",
  "intro": "Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, estas son nuestras opciones",
  "note": "Los regalos físicos pueden ser entregados el día del evento. Habrá un buzón especial para sobres y tarjetas.",
  "giftRegistry": [
    {
      "id": "001",
      "codigo": "CODIGO",
      "name": "Liverpool",
      "url": "https://liverpool.com.mx",
      "description": "Encuentra nuestra lista en Liverpool"
    },
    {
      "id": "002",
      "codigo": "CODIGO",
      "name": "Amazon",
      "url": "https://amazon.com.mx",
      "description": "Encuentra nuestra lista en Amazon"
    }
  ],
  "transferAccounts": [
    {
      "bank": "BBVA",
      "account": "0123456789",
      "clabe": "012345678901234567",
      "holder": "Julia García"
    },
    {
      "bank": "Santander",
      "account": "0123456789",
      "clabe": "012345678901234567",
      "holder": "Julia García"
    }
  ]
}
\`\`\`

**Error Response (500 Internal Server Error)**

\`\`\`json
{
  "error": "Failed to fetch gift registry data",
  "details": "Specific error message"
}
\`\`\`

---

## Data Schema

### GiftDescription

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Section title |
| `intro` | `string` | Yes | Introduction text |
| `note` | `string` | Yes | Additional notes or instructions |
| `giftRegistry` | `GiftRegistry[]` | Yes | Array of store registry options |
| `transferAccounts` | `TransferAccount[]` | Yes | Array of bank transfer accounts |

### GiftRegistry

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `codigo` | `string` | Yes | Registry code |
| `name` | `string` | Yes | Store name |
| `url` | `string` | Yes | Store URL |
| `description` | `string` | No | Optional description |

### TransferAccount

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bank` | `string` | Yes | Bank name |
| `account` | `string` | Yes | Account number |
| `clabe` | `string` | Yes | CLABE number for transfers |
| `holder` | `string` | Yes | Account holder name |

---

## Usage Example

### Client-Side (React/Next.js)

\`\`\`typescript
import { apiService } from '@/lib/services/api.service'
import type { GiftDescription } from '@/lib/interfaces/GiftRegistry'

async function fetchGiftRegistry() {
  try {
    const data: GiftDescription = await apiService.getGiftRegistry()
    console.log(data)
  } catch (error) {
    console.error('Failed to fetch gift registry:', error)
  }
}
\`\`\`

### Direct Fetch

\`\`\`typescript
const response = await fetch('/api/gift-registry')
const data = await response.json()
\`\`\`

---

## Caching

- **Cache-Control:** `public, s-maxage=3600, stale-while-revalidate=86400`
- Data is cached for 1 hour with stale-while-revalidate for 24 hours

---

## Architecture

### Layered Structure

\`\`\`
app/api/gift-registry/
├── route.ts                              # API endpoint handler
├── gift-registry-services/
│   └── gift-registry.service.ts         # Business logic layer
└── data/
    └── gift-registry-data.ts            # Data source
\`\`\`

### Service Layer
The service layer (`GiftRegistryService`) provides:
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
2. **Authentication**: Add protected routes for admin management
3. **CRUD Operations**: Implement POST/PUT/DELETE for managing registries
4. **Validation**: Add request/response validation with Zod
5. **Rate Limiting**: Implement API rate limiting
6. **Analytics**: Track registry clicks and transfers

---

## Related Endpoints

- `GET /api/hero` - Hero section data
- `GET /api/event-details` - Event details data
- `GET /api/itinerary` - Event itinerary data
- `GET /api/photo-gallery` - Photo gallery data
