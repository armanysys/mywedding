import type { EventDetails } from "@/Domain/EventDetail"
import type { EventDetailsRepository } from "@/lib/infrastructure/repositories/event-details.repository"
import type { EventDetailsMapper } from "@/lib/infrastructure/mappers/event-details.mapper"

export class GetEventDetailsUseCase {
  constructor(
    private eventDetailsRepository: EventDetailsRepository,
    private mapper: EventDetailsMapper,
  ) {}

  async execute(): Promise<EventDetails> {
    const rawEventDetails = await this.eventDetailsRepository.findById("default")

    if (!rawEventDetails) {
      throw new Error("Event details not found")
    }

    return this.mapper.toDomain(rawEventDetails)
  }
}
