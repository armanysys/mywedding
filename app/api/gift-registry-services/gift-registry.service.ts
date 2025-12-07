import { giftRegistryData } from "../data/gift-registry-data"
import type { GiftDescription } from "@/lib/interfaces/GiftRegistry"

/**
 * Gift Registry Service Layer
 * Handles business logic for gift registry data retrieval
 */
export class GiftRegistryService {
  /**
   * Retrieves complete gift registry information
   * @returns {Promise<GiftDescription>} Gift registry data including stores and bank accounts
   */
  static async getGiftRegistryData(): Promise<GiftDescription> {
    // Simulate async operation - in production this might fetch from database
    return Promise.resolve(giftRegistryData)
  }

  /**
   * Validates gift registry data structure
   * @param data - Gift registry data to validate
   * @returns {boolean} True if data is valid
   */
  static validateGiftRegistryData(data: GiftDescription): boolean {
    return !!(
      data.title &&
      data.intro &&
      data.note &&
      Array.isArray(data.giftRegistry) &&
      Array.isArray(data.transferAccounts) &&
      data.giftRegistry.length > 0 &&
      data.transferAccounts.length > 0
    )
  }
}
