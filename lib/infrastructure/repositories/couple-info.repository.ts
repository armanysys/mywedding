import { coupleInfo } from "@/MockData/couple-info-data"

/**
 * CoupleInfoRepository
 * Accede a datos crudos de Couple Info (actualmente MockData)
 * En futuro: conectará a Supabase
 */
export class CoupleInfoRepository {
  /**
   * Obtiene couple info - actualmente de MockData
   * En futuro: SELECT * FROM couple_info LIMIT 1
   */
  async findOne(): Promise<any> {
    return coupleInfo
  }
}
