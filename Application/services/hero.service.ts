import type { Hero } from "@/Domain/Hero"

/**
 * Application Layer - Hero Service
 * 
 * Centralized service for all hero-related API calls.
 * This service handles business logic and data processing for the hero section.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Fetches hero section data from the API (Server-side)
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
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch hero data: ${response.statusText}`)
  }

  return response.json()
}
