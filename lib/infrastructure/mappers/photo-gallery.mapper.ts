import type { PhotoDescriptio } from "@/Domain/PhotoDescription"

interface RawPhotoGallery {
  title: string
  hastag: string
  description: string
  photographer?: string
  photoItems: any[]
}

export class PhotoGalleryMapper {
  static toDomain(raw: RawPhotoGallery): PhotoDescriptio {
    return {
      title: raw.title,
      hastag: raw.hastag,
      description: raw.description,
      photographer: raw.photographer,
      photoItems: raw.photoItems,
    }
  }

  static toPersistence(domain: PhotoDescriptio): RawPhotoGallery {
    return {
      title: domain.title,
      hastag: domain.hastag,
      description: domain.description,
      photographer: domain.photographer,
      photoItems: domain.photoItems,
    }
  }
}
