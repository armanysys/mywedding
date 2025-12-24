import type { Hero } from "@/Domain/Hero"
import { HeroMapper } from "@/lib/infrastructure/mappers/hero.mapper"
import { HeroRepository } from "@/lib/infrastructure/repositories/hero.repository"

/**
 * GetHeroUseCase
 * Lógica de negocio: obtener hero data
 *
 * Responsabilidades:
 * 1. Llamar al repository para obtener datos crudos
 * 2. Transformar a Domain Model
 * 3. Aplicar reglas de negocio
 * 4. Retornar datos listos para API
 */
export class GetHeroUseCase {
  private heroRepository: HeroRepository
  private heroMapper: HeroMapper

  constructor() {
    this.heroRepository = new HeroRepository()
    this.heroMapper = new HeroMapper()
  }

  async execute(): Promise<Hero> {
    // 1. Obtener datos crudos
    const rawHero = await this.heroRepository.findById(1)

    if (!rawHero) {
      throw new Error("Hero data not found")
    }

    // 2. Transformar a Domain Model
    const hero = this.heroMapper.toDomain(rawHero)

    // 3. Aplicar reglas de negocio (si las hay)
    // Ejemplo: validar que todos los campos requeridos existan
    if (!hero.title || !hero.subtitle) {
      throw new Error("Hero must have title and subtitle")
    }

    // 4. Retornar
    return hero
  }
}
