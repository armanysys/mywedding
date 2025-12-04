import { NextResponse } from "next/server"
import { eventDetailsData } from "../data/event-details-data"

/**
 * GET /api/event-details
 *
 * Returns event details section data for the wedding website
 *
 * @returns {EventDetails} Event details section data
 *
 * Response Schema:
 * {
 *   id: string              - Section HTML ID (e.g., "details")
 *   title: string           - Section title (e.g., "Únete a Nosotros")
 *   intro?: string          - Introductory text
 *   dateBlock: {
 *     heading: string       - Block heading (e.g., "Fecha")
 *     subheading?: string   - Optional subheading (e.g., "Domingo")
 *     value: string         - Main value (e.g., "15 de Junio, 2025")
 *     extra?: string        - Optional extra information
 *   }
 *   timeBlock: {
 *     heading: string       - Block heading (e.g., "Hora")
 *     subheading?: string   - Optional subheading (e.g., "Ceremonia")
 *     value: string         - Main value (e.g., "5:00 PM")
 *     extra?: string        - Optional extra information
 *   }
 *   locationBlock: {
 *     heading: string       - Block heading (e.g., "Lugar")
 *     subheading?: string   - Optional subheading (e.g., "Jardín Botánico")
 *     value: string         - Main value (e.g., "Ciudad de México")
 *     extra?: string        - Optional extra information
 *     mapUrl?: string       - Google Maps URL for location
 *   }
 * }
 */
export async function GET() {
  try {
    return NextResponse.json(eventDetailsData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch event details data" }, { status: 500 })
  }
}
