import { NextResponse } from "next/server"
import { heroData } from "../data/hero-data"

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
 */
export async function GET() {
  try {
    return NextResponse.json(heroData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500 })
  }
}
