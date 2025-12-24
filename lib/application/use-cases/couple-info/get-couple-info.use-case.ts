import type { Couple } from "@/Domain/CoupleInfo"
import { CoupleInfoMapper } from "@/lib/infrastructure/mappers/couple-info.mapper"
import { CoupleInfoRepository } from "@/lib/infrastructure/repositories/couple-info.repository"

/**
 * GetCoupleInfoUseCase
 * Lógica de negocio: obtener información de la pareja
 */
export class GetCoupleInfoUseCase {
  private coupleRepository: CoupleInfoRepository
  private coupleMapper: CoupleInfoMapper

  constructor() {
    this.coupleRepository = new CoupleInfoRepository()
    this.coupleMapper = new CoupleInfoMapper()
  }

  async execute(): Promise<Couple> {
    // 1. Obtener datos crudos
    const rawCouple = await this.coupleRepository.findOne()

    if (!rawCouple) {
      throw new Error("Couple info not found")
    }

    // 2. Transformar a Domain Model
    const couple = this.coupleMapper.toDomain(rawCouple)

    // 3. Validaciones de negocio
    if (!couple.GroomName || !couple.BrideName) {
      throw new Error("Groom and Bride names are required")
    }

    // 4. Retornar
    return couple
  }
}
