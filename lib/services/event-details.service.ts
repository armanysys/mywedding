import type { EventDetails } from "@/Domain/EventDetail"

/**
 * Event Details Service
 * Centralized service for all event-details-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Fetches event details section data from the API (Server-side)
 * @returns Promise<EventDetails> Event details data
 * @throws Error if the request fails
 */
export async function getEventDetailsData(): Promise<EventDetails> {
  const response = await fetch(`${API_BASE_URL}/api/event-details`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch event details data: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<EventDetails> Event details data
 */
export async function getEventDetailsDataClient(): Promise<EventDetails> {
  const response = await fetch("/api/event-details", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch event details data: ${response.statusText}`)
  }

  return response.json()
}
