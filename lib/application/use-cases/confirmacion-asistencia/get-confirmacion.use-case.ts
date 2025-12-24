import type { ConfirmacionAsistencia } from "@/Domain/ConfirmacionAsistencia"
import type { ConfirmacionAsistenciaRepository } from "@/lib/infrastructure/repositories/confirmacion-asistencia.repository"
import type { ConfirmacionAsistenciaMapper } from "@/lib/infrastructure/mappers/confirmacion-asistencia.mapper"

export class GetConfirmacionUseCase {
  constructor(
    private confirmacionRepository: ConfirmacionAsistenciaRepository,
    private mapper: ConfirmacionAsistenciaMapper,
  ) {}

  async execute(): Promise<ConfirmacionAsistencia> {
    const rawConfirmacion = await this.confirmacionRepository.findById("default")

    if (!rawConfirmacion) {
      throw new Error("Confirmación not found")
    }

    return this.mapper.toDomain(rawConfirmacion)
  }
}
