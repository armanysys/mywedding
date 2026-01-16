import type { PhotoDescriptio } from "@/Domain/PhotoDescription"

/**
 * Photo Gallery section data source
 * Contains all information needed for the photo gallery section including
 * title, hashtag, description, and photo items
 */
export const photoGalleryData: PhotoDescriptio = {
  title: "Galería de Fotos",
  hastag: "#JuliaYArmando2025",
  description: "Comparte tus fotos usando nuestro hashtag oficial",
  photographer: "Fotografía profesional por Studio Moments",
  photoItems: [
    {
      id: 1,
      src: "/002.jpg",
      alt: "Foto de boda 1",
    },
    {
      id: 2,
      src: "/003.jpg",
      alt: "Foto de boda 2",
    },
    {
      id: 3,
      src: "/004.jpg",
      alt: "Foto de boda 3",
    },
    {
      id: 4,
      src: "/005.jpg",
      alt: "Foto de boda 4",
    },
    {
      id: 5,
      src: "/006.jpg",
      alt: "Foto de boda 5",
    },
    {
      id: 6,
      src: "/007.jpg",
      alt: "Foto de boda 6",
    },
  ],
}

export default photoGalleryData
