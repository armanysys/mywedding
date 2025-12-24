import { GetCoupleInfoUseCase } from "@/lib/application/use-cases/couple-info/get-couple-info.use-case"
import { NextResponse } from "next/server"

/**
 * GET /api/couple-info
 *
 * Refactorizado para usar Architecture por capas
 */
export async function GET() {
  try {
    const getCoupleInfoUseCase = new GetCoupleInfoUseCase()
    const couple = await getCoupleInfoUseCase.execute()

    return NextResponse.json(couple, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[API] Couple Info Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch couple info data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
