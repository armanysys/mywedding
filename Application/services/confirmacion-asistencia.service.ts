import type { ConfirmacionAsistencia } from "@/Domain/ConfirmacionAsistencia"

/**
 * Application Layer - Confirmacion Asistencia Service
 * 
 * Centralized service for all RSVP confirmation-related API calls and data management.
 * This service handles business logic and data processing for attendance confirmation.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Server-side fetcher for RSVP confirmation data from the API
 * @returns Promise<ConfirmacionAsistencia> RSVP confirmation data
 * @throws Error if the request fails
 */
export async function getConfirmacionAsistenciaDataFromAPI(): Promise<ConfirmacionAsistencia> {
  const response = await fetch(`${API_BASE_URL}/api/confirmacion-asistencia`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch confirmación asistencia data: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Client-side version for use in client components
 * @returns Promise<ConfirmacionAsistencia> RSVP confirmation data
 */
export async function getConfirmacionAsistenciaDataClient(): Promise<ConfirmacionAsistencia> {
  const response = await fetch("/api/confirmacion-asistencia", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch confirmación asistencia data: ${response.statusText}`)
  }

  return response.json()
}
