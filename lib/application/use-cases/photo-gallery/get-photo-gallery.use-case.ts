import type { PhotoDescriptio } from "@/Domain/PhotoDescription"
import type { PhotoGalleryRepository } from "@/lib/infrastructure/repositories/photo-gallery.repository"
import type { PhotoGalleryMapper } from "@/lib/infrastructure/mappers/photo-gallery.mapper"

export class GetPhotoGalleryUseCase {
  constructor(
    private photoGalleryRepository: PhotoGalleryRepository,
    private mapper: PhotoGalleryMapper,
  ) {}

  async execute(): Promise<PhotoDescriptio> {
    const rawPhotoGallery = await this.photoGalleryRepository.findById("default")

    if (!rawPhotoGallery) {
      throw new Error("Photo gallery not found")
    }

    return this.mapper.toDomain(rawPhotoGallery)
  }
}
