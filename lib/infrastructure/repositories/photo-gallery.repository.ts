import { photoGalleryData } from "@/MockData/photo-gallery-data"

export class PhotoGalleryRepository {
  async findById(id: string): Promise<any> {
    // Simulating database query - In future, this will query Supabase
    return photoGalleryData
  }

  async getAll(): Promise<any[]> {
    // Simulating database query
    return [photoGalleryData]
  }
}
