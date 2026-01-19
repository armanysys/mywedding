import { NextResponse } from "next/server"
import { logisticsData } from "@/MockData/logistics.data"

/**
 * GET /api/logistics
 *
 * Returns logistics section data for the wedding website
 *
 * @returns {Logistics} Logistics section data
 *
 * Response Schema:
 * {
 *   title: string                    - Section title
 *   intro: string                    - Introduction text
 *   venue: object                    - Venue information with address and map URL
 *   transport: array                 - Transport options
 *   hotels: array                    - Hotel recommendations
 *   dressCode: object                - Dress code guidelines and color palette
 * }
 *
 * @example
 * // Success Response (200)
 * {
 *   "title": "Información Práctica",
 *   "intro": "Todo lo que necesitas saber para disfrutar al máximo",
 *   "venue": { ... },
 *   "transport": [ ... ],
 *   "hotels": [ ... ],
 *   "dressCode": { ... }
 * }
 *
 * @example
 * // Error Response (500)
 * {
 *   "error": "Failed to fetch logistics data",
 *   "details": "Error message"
 * }
 */
export async function GET() {
  try {
    return NextResponse.json(logisticsData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[API] Logistics Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch logistics data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
