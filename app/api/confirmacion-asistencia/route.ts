import { NextResponse } from "next/server"
import { confirmacionDataDefault } from "../../../MockData/rsvp-data"

/**
 * GET /api/confirmacion-asistencia
 *
 * Returns RSVP confirmation data for the wedding website
 *
 * @returns {ConfirmacionAsistencia} RSVP confirmation section data
 *
 * Response Schema:
 * {
 *   title: string       - Section title (e.g., "Confirmación de Asistencia")
 *   subtitle: string    - Introductory/descriptive text explaining the RSVP deadline
 *   fechaLimite: string - RSVP deadline date (e.g., "1 de Mayo, 2025")
 * }
 *
 * Example Response:
 * {
 *   "title": "Confirmación de Asistencia",
 *   "subtitle": "Nos encantaría contar con tu presencia en nuestro día especial. Por favor confirma tu asistencia antes del",
 *   "fechaLimite": "1 de Mayo, 2025"
 * }
 */
export async function GET() {
  try {
    return NextResponse.json(confirmacionDataDefault, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch confirmación asistencia data" }, { status: 500 })
  }
}
