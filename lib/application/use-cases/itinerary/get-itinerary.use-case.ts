import type { ItineraryProps } from "@/Domain/ItineraryProps"
import type { ItineraryRepository } from "@/lib/infrastructure/repositories/itinerary.repository"
import type { ItineraryMapper } from "@/lib/infrastructure/mappers/itinerary.mapper"

export class GetItineraryUseCase {
  constructor(
    private itineraryRepository: ItineraryRepository,
    private mapper: ItineraryMapper,
  ) {}

  async execute(): Promise<ItineraryProps> {
    const rawItinerary = await this.itineraryRepository.findById("default")

    if (!rawItinerary) {
      throw new Error("Itinerary not found")
    }

    return this.mapper.toDomain(rawItinerary)
  }
}
