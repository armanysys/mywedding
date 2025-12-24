import { itineraryData } from "@/MockData/itinerary-data"

export class ItineraryRepository {
  async findById(id: string): Promise<any> {
    // Simulating database query - In future, this will query Supabase
    return itineraryData
  }

  async getAll(): Promise<any[]> {
    // Simulating database query
    return [itineraryData]
  }
}
