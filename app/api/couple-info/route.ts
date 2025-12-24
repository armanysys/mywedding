import { NextResponse } from "next/server"
import { UseCaseFactory } from "@/lib/application/factories/use-case.factory"

/**
 * GET /api/couple-info
 *
 * Refactorizado para usar Architecture por capas
 */
export async function GET() {
  try {
    const useCase = UseCaseFactory.createGetCoupleInfoUseCase()
    const couple = await useCase.execute()

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
