import type { Couple } from "@/Domain/CoupleInfo"

/**
 * Couple Info Service
 * Centralized service for all couple-info-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Fetches couple information from the API
 * @returns Promise<Couple> Couple data
 * @throws Error if the request fails
 */
export async function getCoupleInfo(): Promise<Couple> {
    const response = await fetch(`${API_BASE_URL}/api/couple-info`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch couple info: ${response.statusText}`)
    }

    return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<Couple> Couple data
 */
export async function getCoupleInfoClient(): Promise<Couple> {
    const response = await fetch("/api/couple-info", {
        cache: "no-store",
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch couple info: ${response.statusText}`)
    }

    return response.json()
}
