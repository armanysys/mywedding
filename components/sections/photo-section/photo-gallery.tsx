"use client"

import type React from "react"
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react"
import { photoDescriptio } from "@/lib/data/photo-description-data"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

const getImageUrl = (src: string, size: { width: number; height: number }) => {
  return `${src}?height=${size.height}&width=${size.width}`
}

function PhotoTile({
  photo,
  onClick,
}: {
  photo: (typeof photoDescriptio.photoItems)[number]
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
}: {
  selectedIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  carouselRef: React.RefObject<HTMLDivElement | null>
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
}) {
  const currentPhoto = photoDescriptio.photoItems[selectedIndex]
  const photoCounter = `${selectedIndex + 1} / ${photoDescriptio.photoItems.length}`

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Cerrar galería"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Desktop: Single Image with Navigation Arrows */}
      <div className="hidden md:flex items-center justify-center w-full h-full px-20">
        {/* Previous Arrow */}
        <Button
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
        </Button>

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
        <Button
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
        </Button>
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
          {photoDescriptio.photoItems.map((photo, index) => (
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
                {index + 1} / {photoDescriptio.photoItems.length}
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return (prev - 1 + photoDescriptio.photoItems.length) % photoDescriptio.photoItems.length
    })
  }, [])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return (prev + 1) % photoDescriptio.photoItems.length
    })
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrevious()
    }
  }, [touchStart, touchEnd, handleNext, handlePrevious])

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        setSelectedIndex(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, handlePrevious, handleNext])

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "unset"
      }
    }
  }, [selectedIndex])

  useEffect(() => {
    if (selectedIndex !== null && carouselRef.current) {
      const carousel = carouselRef.current
      const itemWidth = carousel.scrollWidth / photoDescriptio.photoItems.length
      carousel.scrollTo({
        left: itemWidth * selectedIndex,
        behavior: "smooth",
      })
    }
  }, [selectedIndex])

  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Galería de Fotos</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-8" />

            {/* Hashtag */}
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm mb-8">
              <span className="font-medium text-lg">#JuliaYArmando2025</span>
            </div>

            <p className="text-muted-foreground mb-8 text-pretty">Comparte tus fotos usando nuestro hashtag oficial</p>

            <p className="text-sm text-muted-foreground md:hidden">👆 Toca una foto y desliza para ver más</p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photoDescriptio.photoItems.map((photo, index) => (
              <PhotoTile key={photo.id} photo={photo} onClick={() => setSelectedIndex(index)} />
            ))}
          </div>

          {/* Photographer Credit */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Camera className="w-5 h-5" />
              <span>Fotografía profesional por Studio Moments</span>
            </div>
          </div>
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
        />
      )}
    </section>
  )
}
