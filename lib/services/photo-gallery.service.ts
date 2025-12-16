import type { PhotoDescriptio } from "@/lib/interfaces/PhotoDescription"

/**
 * Photo Gallery Service
 * Centralized service for all photo gallery-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Fetches photo gallery section data from the API
 * @returns Promise<PhotoDescriptio> Photo gallery data
 * @throws Error if the request fails
 */
export async function getPhotoGalleryData(): Promise<PhotoDescriptio> {
  const response = await fetch(`${API_BASE_URL}/api/photo-gallery`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch photo gallery data: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<PhotoDescriptio> Photo gallery data
 */
export async function getPhotoGalleryDataClient(): Promise<PhotoDescriptio> {
  const response = await fetch("/api/photo-gallery", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch photo gallery data: ${response.statusText}`)
  }

  return response.json()
}
