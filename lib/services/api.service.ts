/**
 * Centralized API Service
 * Handles all client-side API calls with consistent error handling and response parsing
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use cache in production, disable in development
      cache: process.env.NODE_ENV === "production" ? "force-cache" : "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    console.error(`[API Service] Error fetching ${endpoint}:`, error)
    throw error
  }
}

/**
 * API Service exports for all endpoints
 */
export const apiService = {
  /**
   * Fetch gift registry data
   * @returns {Promise<GiftDescription>} Gift registry data
   */
  getGiftRegistry: async () => {
    return fetchAPI("/api/gift-registry")
  },

  /**
   * Fetch hero section data
   * @returns {Promise<Hero>} Hero section data
   */
  getHero: async () => {
    return fetchAPI("/api/hero")
  },

  /**
   * Fetch event details data
   * @returns {Promise<EventDetails>} Event details data
   */
  getEventDetails: async () => {
    return fetchAPI("/api/event-details")
  },

  /**
   * Fetch itinerary data
   * @returns {Promise<ItineraryData>} Itinerary data
   */
  getItinerary: async () => {
    return fetchAPI("/api/itinerary")
  },

  /**
   * Fetch photo gallery data
   * @returns {Promise<PhotoGalleryData>} Photo gallery data
   */
  getPhotoGallery: async () => {
    return fetchAPI("/api/photo-gallery")
  },
}

export default apiService
