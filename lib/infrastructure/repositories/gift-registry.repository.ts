import { giftRegistryData } from "@/MockData/gift-registry-data"

/**
 * GiftRegistryRepository
 * Accede a datos crudos de Gift Registry (actualmente MockData)
 * En futuro: conectará a Supabase
 */
export class GiftRegistryRepository {
  /**
   * Obtiene gift registry data - actualmente de MockData
   * En futuro: SELECT * FROM gift_registries
   */
  async findOne(): Promise<any> {
    return giftRegistryData
  }

  /**
   * Filtra regalos por criterios
   * @param filters - Criterios de filtrado
   */
  async findWithFilters(filters: {
    category?: string
    maxPrice?: number
    available?: boolean
  }): Promise<any[]> {
    let gifts = giftRegistryData.giftRegistry || []

    // Aplicar filtros
    if (filters.category) {
      gifts = gifts.filter((g: any) => g.description?.includes(filters.category))
    }

    return gifts
  }
}
