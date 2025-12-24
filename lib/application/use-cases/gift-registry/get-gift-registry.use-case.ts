import type { GiftDescription } from "@/Domain/GiftRegistry"
import { GiftRegistryMapper } from "@/lib/infrastructure/mappers/gift-registry.mapper"
import { GiftRegistryRepository } from "@/lib/infrastructure/repositories/gift-registry.repository"

/**
 * GetGiftRegistryUseCase
 * Lógica de negocio: obtener mesa de regalos
 */
export class GetGiftRegistryUseCase {
  private giftRepository: GiftRegistryRepository
  private giftMapper: GiftRegistryMapper

  constructor() {
    this.giftRepository = new GiftRegistryRepository()
    this.giftMapper = new GiftRegistryMapper()
  }

  async execute(): Promise<GiftDescription> {
    // 1. Obtener datos crudos
    const rawGiftRegistry = await this.giftRepository.findOne()

    if (!rawGiftRegistry) {
      throw new Error("Gift registry not found")
    }

    // 2. Transformar a Domain Model
    const giftRegistry = this.giftMapper.toDomain(rawGiftRegistry)

    // 3. Validaciones de negocio
    if (!giftRegistry.giftRegistry || giftRegistry.giftRegistry.length === 0) {
      throw new Error("No gifts available in registry")
    }

    // 4. Retornar
    return giftRegistry
  }
}
