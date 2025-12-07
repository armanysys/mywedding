import { heroData } from "../data/hero-data"
import type { Hero } from "@/lib/interfaces/Hero"

/**
 * Hero Service Layer
 * Handles business logic for hero section data retrieval
 */
export class HeroService {
  /**
   * Retrieves complete hero section information
   * @returns {Promise<Hero>} Hero section data including title, date, and image
   */
  static async getHeroData(): Promise<Hero> {
    // Simulate async operation - in production this might fetch from database
    return Promise.resolve(heroData)
  }

  /**
   * Validates hero data structure
   * @param data - Hero data to validate
   * @returns {boolean} True if data is valid
   */
  static validateHeroData(data: Hero): boolean {
    return !!(data.title && data.subtitle && data.dateLabel && data.targetDateISO && data.imageSrc && data.imageAlt)
  }
}
