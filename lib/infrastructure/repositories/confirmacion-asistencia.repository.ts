import { confirmacionDataDefault } from "@/MockData/rsvp-data"

export class ConfirmacionAsistenciaRepository {
  async findById(id: string): Promise<any> {
    // Simulating database query - In future, this will query Supabase
    return confirmacionDataDefault
  }

  async getAll(): Promise<any[]> {
    // Simulating database query
    return [confirmacionDataDefault]
  }
}
