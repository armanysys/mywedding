import { NextResponse } from "next/server"
import { UseCaseFactory } from "@/lib/application/factories/use-case.factory"

/**
 * GET /api/hero
 *
 * Refactorizado para usar Architecture por capas
 * - Use-case: GetHeroUseCase (lógica de negocio)
 * - Repository: HeroRepository (acceso a datos)
 * - Mapper: HeroMapper (transformación de datos)
 */
export async function GET() {
  try {
    const useCase = UseCaseFactory.createGetHeroUseCase()
    const hero = await useCase.execute()

    return NextResponse.json(hero, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[API] Hero Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch hero data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
