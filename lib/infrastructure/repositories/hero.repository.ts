import { heroData } from "@/MockData/hero-data"

/**
 * HeroRepository
 * Accede a datos crudos del Hero (actualmente MockData)
 * En futuro: conectará a Supabase
 */
export class HeroRepository {
  /**
   * Obtiene hero data - actualmente de MockData
   * En futuro: SELECT * FROM heroes
   */
  async findById(id: number): Promise<any> {
    // Simulación de BD - en futuro será query a Supabase
    return heroData
  }

  /**
   * Obtiene todos los heroes (si existen múltiples)
   */
  async findAll(): Promise<any[]> {
    return [heroData]
  }
}
