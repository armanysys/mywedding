import type { GiftDescription } from "@/Domain/GiftRegistry"

/**
 * Application Layer - Gift Registry Service
 * 
 * Centralized service for all gift-registry-related API calls.
 * This service handles business logic and data processing for gift registry.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Fetches gift registry section data from the API (Server-side)
 * @returns Promise<GiftDescription> Gift registry data
 * @throws Error if the request fails
 */
export async function getGiftDescriptionData(): Promise<GiftDescription> {
  const response = await fetch(`${API_BASE_URL}/api/gift-registry`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Gift Registry data: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<GiftDescription> Gift registry data
 */
export async function getGiftDescriptionDataClient(): Promise<GiftDescription> {
  const response = await fetch("/api/gift-registry", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Gift Registry data: ${response.statusText}`)
  }

  return response.json()
}
