import type { Logistics } from "@/Domain/Logistic"

interface RawLogistics {
  title: string
  intro: string
  venue: any
  transport: any[]
  hotels: any[]
  dressCode: any
}

export class LogisticsMapper {
  static toDomain(raw: RawLogistics): Logistics {
    return {
      title: raw.title,
      intro: raw.intro,
      venue: raw.venue,
      transport: raw.transport,
      hotels: raw.hotels,
      dressCode: raw.dressCode,
    }
  }

  static toPersistence(domain: Logistics): RawLogistics {
    return {
      title: domain.title,
      intro: domain.intro,
      venue: domain.venue,
      transport: domain.transport,
      hotels: domain.hotels,
      dressCode: domain.dressCode,
    }
  }
}
