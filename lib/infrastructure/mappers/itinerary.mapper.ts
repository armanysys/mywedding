import type { ItineraryProps } from "@/Domain/ItineraryProps"

interface RawItinerary {
  Title: string
  Description: string
  ScheduleItem: any[]
}

export class ItineraryMapper {
  static toDomain(raw: RawItinerary): ItineraryProps {
    return {
      Title: raw.Title,
      Description: raw.Description,
      ScheduleItem: raw.ScheduleItem,
    }
  }

  static toPersistence(domain: ItineraryProps): RawItinerary {
    return {
      Title: domain.Title,
      Description: domain.Description,
      ScheduleItem: domain.ScheduleItem,
    }
  }
}
