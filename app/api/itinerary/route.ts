import { NextResponse } from "next/server"
import { itineraryData } from "../data/itinerary-data"

/**
 * GET /api/itinerary
 *
 * Returns itinerary section data for the wedding website
 *
 * @returns {ItineraryProps} Itinerary section data
 *
 * Response Schema:
 * {
 *   Title: string                   - Section title (e.g., "Itinerario del Día")
 *   Description: string             - Section description
 *   ScheduleItem: ScheduleItem[]    - Array of schedule items
 * }
 *
 * ScheduleItem Schema:
 * {
 *   time: string        - Event time (e.g., "5:00 PM")
 *   title: string       - Event name (e.g., "Ceremonia")
 *   description: string - Event details
 *   icon: string        - Icon name for the event (e.g., "Church", "Music", "Cake")
 * }
 */
export async function GET() {
  try {
    return NextResponse.json(itineraryData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch itinerary data" }, { status: 500 })
  }
}
