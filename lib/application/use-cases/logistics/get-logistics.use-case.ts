import type { Logistics } from "@/Domain/Logistic"
import type { LogisticsRepository } from "@/lib/infrastructure/repositories/logistics.repository"
import type { LogisticsMapper } from "@/lib/infrastructure/mappers/logistics.mapper"

export class GetLogisticsUseCase {
  constructor(
    private logisticsRepository: LogisticsRepository,
    private mapper: LogisticsMapper,
  ) {}

  async execute(): Promise<Logistics> {
    const rawLogistics = await this.logisticsRepository.findById("default")

    if (!rawLogistics) {
      throw new Error("Logistics not found")
    }

    return this.mapper.toDomain(rawLogistics)
  }
}
