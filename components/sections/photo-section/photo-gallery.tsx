"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react"
import { getPhotoGalleryDataClient } from "@/lib/services/photo-gallery.service"
import type { PhotoDescriptio } from "@/Domain/PhotoDescription"
import { Button as UiButton } from "@/components/ui/button"
import { getImageUrl, usePhotoGallery } from "./photo-gallery.logic"

function PhotoTile({
  photo,
  onClick,
}: {
  photo: PhotoDescriptio["photoItems"][number]
  onClick: () => void
}) {
  return (
    <div className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer" onClick={onClick}>
      <img
        src={getImageUrl(photo.src || "/placeholder.svg", { width: 400, height: 400 })}
        alt={photo.alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
  )
}

function Lightbox({
  selectedIndex,
  onClose,
  onNext,
  onPrevious,
  carouselRef,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  photoData,
}: {
  selectedIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  carouselRef: React.RefObject<HTMLDivElement | null>
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  photoData: PhotoDescriptio
}) {
  const currentPhoto = photoData.photoItems[selectedIndex]
  const photoCounter = `${selectedIndex + 1} / ${photoData.photoItems.length}`

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Close Button */}
      <UiButton
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Cerrar galería"
      >
        <X className="w-6 h-6" />
      </UiButton>

      {/* Desktop: Single Image with Navigation Arrows */}
      <div className="hidden md:flex items-center justify-center w-full h-full px-20">
        {/* Previous Arrow */}
        <UiButton
          variant="ghost"
          size="icon"
          className="absolute left-4 text-white hover:bg-white/20 h-12 w-12"
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-8 h-8" />
        </UiButton>

        {/* Image */}
        <div className="relative max-w-5xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
          <img
            src={getImageUrl(currentPhoto.src || "/placeholder.svg", { width: 1200, height: 1200 })}
            alt={currentPhoto.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
          <p className="text-white text-center mt-4">{photoCounter}</p>
        </div>

        {/* Next Arrow */}
        <UiButton
          variant="ghost"
          size="icon"
          className="absolute right-4 text-white hover:bg-white/20 h-12 w-12"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-8 h-8" />
        </UiButton>
      </div>

      {/* Mobile: Horizontal Carousel with Swipe */}
      <div
        className="md:hidden w-full h-full flex items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photoData.photoItems.map((photo, index) => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center snap-center px-4"
            >
              <img
                src={getImageUrl(photo.src || "/placeholder.svg", { width: 800, height: 800 })}
                alt={photo.alt}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4">
                {index + 1} / {photoData.photoItems.length}
              </p>
              {index === selectedIndex && <p className="text-white/70 text-sm mt-2">Desliza para ver más →</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PhotoGallery() {
  const [photoData, setPhotoData] = useState<PhotoDescriptio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getPhotoGalleryDataClient()
        setPhotoData(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load photo gallery")
        console.error("[v0] Error fetching photo gallery data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const {
    selectedIndex,
    setSelectedIndex,
    carouselRef,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    handleNext,
    handlePrevious,
  } = usePhotoGallery(photoData || { title: "", hastag: "", description: "", photoItems: [] })

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground">Cargando galería...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !photoData) {
    return (
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-destructive">{error || "Error al cargar la galería"}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{photoData.title}</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-8" />

            {/* Hashtag */}
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm mb-8">
              <span className="font-medium text-lg">{photoData.hastag}</span>
            </div>

            <p className="text-muted-foreground mb-8 text-pretty">{photoData.description}</p>

            <p className="text-sm text-muted-foreground md:hidden">👆 Toca una foto y desliza para ver más</p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photoData.photoItems.map((photo, index) => (
              <PhotoTile key={photo.id} photo={photo} onClick={() => setSelectedIndex(index)} />
            ))}
          </div>

          {/* Photographer Credit */}
          {photoData.photographer && (
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Camera className="w-5 h-5" />
                <span>{photoData.photographer}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedIndex !== null && (
        <Lightbox
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          carouselRef={carouselRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          photoData={photoData}
        />
      )}
    </section>
  )
}
