import { eventDetailsData } from "@/MockData/event-details-data"

export class EventDetailsRepository {
  async findById(id: string): Promise<any> {
    // Simulating database query - In future, this will query Supabase
    return eventDetailsData
  }

  async getAll(): Promise<any[]> {
    // Simulating database query
    return [eventDetailsData]
  }
}
