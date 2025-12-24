import type { ConfirmacionAsistencia } from "@/Domain/ConfirmacionAsistencia"

interface RawConfirmacion {
  title: string
  subtitle: string
  fechaLimite: string
}

export class ConfirmacionAsistenciaMapper {
  static toDomain(raw: RawConfirmacion): ConfirmacionAsistencia {
    return {
      title: raw.title,
      subtitle: raw.subtitle,
      fechaLimite: raw.fechaLimite,
    }
  }

  static toPersistence(domain: ConfirmacionAsistencia): RawConfirmacion {
    return {
      title: domain.title,
      subtitle: domain.subtitle,
      fechaLimite: domain.fechaLimite,
    }
  }
}
