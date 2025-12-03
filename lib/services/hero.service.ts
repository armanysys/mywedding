import type { Hero } from "@/lib/interfaces/Hero"

/**
 * Hero Service
 * Centralized service for all hero-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/hero"

/**
 * Fetches hero section data from the API
 * @returns Promise<Hero> Hero data
 * @throws Error if the request fails
 */
export async function getHeroData(): Promise<Hero> {
  const response = await fetch(`${API_BASE_URL}/api/hero`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch hero data: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<Hero> Hero data
 */
export async function getHeroDataClient(): Promise<Hero> {
  const response = await fetch("/api/hero", {
    cache: "force-cache",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch hero data: ${response.statusText}`)
  }

  return response.json()
}
