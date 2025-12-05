import type { ItineraryProps } from "@/lib/interfaces/ItineraryProps"

/**
 * Itinerary Service
 * Centralized service for all itinerary-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Fetches itinerary section data from the API (Server-side)
 * @returns Promise<ItineraryProps> Itinerary data including schedule items
 * @throws Error if the request fails
 */
export async function getItineraryData(): Promise<ItineraryProps> {
  const response = await fetch(`${API_BASE_URL}/api/itinerary`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch itinerary data: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<ItineraryProps> Itinerary data including schedule items
 */
export async function getItineraryDataClient(): Promise<ItineraryProps> {
  const response = await fetch("/api/itinerary", {
    cache: "force-cache",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch itinerary data: ${response.statusText}`)
  }

  return response.json()
}
