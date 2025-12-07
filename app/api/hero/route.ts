import { NextResponse } from "next/server"
import { HeroService } from "../hero-services/hero.service"

/**
 * GET /api/hero
 *
 * Returns hero section data for the wedding website
 *
 * @returns {Hero} Hero section data
 *
 * Response Schema:
 * {
 *   title: string           - Couple names (e.g., "Julia & Armando")
 *   subtitle: string        - Subtitle text (e.g., "Celebra con nosotros")
 *   dateLabel: string       - Human-readable date (e.g., "19 de Abril, 2026")
 *   targetDateISO: string   - ISO date string for countdown (e.g., "2026-04-19T00:00:00")
 *   imageSrc: string        - Path to hero background image
 *   imageAlt: string        - Alt text for hero image
 *   detailsId: string       - HTML ID for scroll target
 * }
 *
 * @example
 * // Success Response (200)
 * {
 *   "title": "Julia & Armando",
 *   "subtitle": "Celebra con nosotros",
 *   "dateLabel": "19 de Abril, 2026",
 *   "targetDateISO": "2026-04-19T00:00:00",
 *   "imageSrc": "/romantic-wedding-photo.jpg",
 *   "imageAlt": "Julia y Armando",
 *   "detailsId": "details"
 * }
 *
 * @example
 * // Error Response (500)
 * {
 *   "error": "Failed to fetch hero data",
 *   "details": "Error message"
 * }
 */
export async function GET() {
  try {
    const data = await HeroService.getHeroData()

    // Validate data before returning
    if (!HeroService.validateHeroData(data)) {
      throw new Error("Invalid hero data structure")
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[API] Hero Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch hero data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
