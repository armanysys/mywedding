import { NextResponse } from "next/server"
import { photoGalleryData } from "../../../MockData/photo-gallery-data"

/**
 * GET /api/photo-gallery
 *
 * Returns photo gallery section data for the wedding website
 *
 * @returns {PhotoDescriptio} Photo gallery section data
 *
 * Response Schema:
 * {
 *   title: string           - Gallery section title (e.g., "Galería de Fotos")
 *   hastag: string          - Wedding hashtag (e.g., "#JuliaYArmando2025")
 *   description: string     - Gallery description text
 *   photographer?: string   - Photographer credit (optional)
 *   photoItems: PhotoItem[] - Array of photo items
 * }
 *
 * PhotoItem Schema:
 * {
 *   id: number              - Unique photo identifier
 *   src: string             - Path to photo image
 *   alt: string             - Alt text for photo
 *   caption?: string        - Optional photo caption
 * }
 */
export async function GET() {
  try {
    return NextResponse.json(photoGalleryData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch photo gallery data" }, { status: 500 })
  }
}
