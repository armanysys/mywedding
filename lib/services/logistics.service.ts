import type { Logistics } from "@/Domain/Logistic"

/**
 * Logistics Service
 * Centralized service for all logistics-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Fetches logistics section data from the API
 * @returns Promise<Logistics> Logistics data
 * @throws Error if the request fails
 */
export async function getLogisticsData(): Promise<Logistics> {
  const response = await fetch(`${API_BASE_URL}/api/logistics`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch logistics data: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<Logistics> Logistics data
 */
export async function getLogisticsDataClient(): Promise<Logistics> {
  const response = await fetch("/api/logistics", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch logistics data: ${response.statusText}`)
  }

  return response.json()
}
