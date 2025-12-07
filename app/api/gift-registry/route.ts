import { NextResponse } from "next/server"
import { giftRegistryData } from "../data/gift-registry-data"

/**
 * GET /api/gift-registry
 *
 * Returns gift registry section data for the wedding website
 *
 * @returns {GiftDescription} Complete gift registry data
 *
 * Response Schema:
 * {
 *   title: string                      - Section title (e.g., "Mesa de Regalos")
 *   intro: string                      - Introduction text
 *   note: string                       - Additional notes or instructions
 *   giftRegistry: Array<{              - Store registry options
 *     id: string                       - Unique identifier
 *     codigo: string                   - Registry code
 *     name: string                     - Store name (e.g., "Liverpool")
 *     url: string                      - Store URL
 *     description?: string             - Optional description
 *   }>
 *   transferAccounts: Array<{          - Bank transfer details (supports multiple accounts)
 *     bank: string                     - Bank name (e.g., "BBVA")
 *     account: string                  - Account number
 *     clabe: string                    - CLABE number for transfers
 *     holder: string                   - Account holder name
 *   }>
 * }
 *
 * @example
 * // Success Response (200)
 * {
 *   "title": "Mesa de Regalos",
 *   "intro": "Tu presencia es nuestro mejor regalo...",
 *   "note": "Los regalos físicos pueden ser entregados...",
 *   "giftRegistry": [...],
 *   "transferAccounts": [...]
 * }
 *
 * @example
 * // Error Response (500)
 * {
 *   "error": "Failed to fetch gift registry data",
 *   "details": "Error message"
 * }
 */
export async function GET() {
  try {
    return NextResponse.json(giftRegistryData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[API] Gift Registry Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch gift registry data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
