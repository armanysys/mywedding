"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"
import type { PhotoDescriptio } from "@/Domain/PhotoDescription"

export const getImageUrl = (src: string, size: { width: number; height: number }) => {
  return `${src}?height=${size.height}&width=${size.width}`
}

export type UsePhotoGalleryReturn = {
  selectedIndex: number | null
  setSelectedIndex: (v: number | null) => void
  touchStart: number | null
  touchEnd: number | null
  carouselRef: React.RefObject<HTMLDivElement | null>
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  handleNext: () => void
  handlePrevious: () => void
}

export function usePhotoGallery(photoData: PhotoDescriptio): UsePhotoGalleryReturn {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return (prev - 1 + photoData.photoItems.length) % photoData.photoItems.length
    })
  }, [photoData.photoItems.length])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return (prev + 1) % photoData.photoItems.length
    })
  }, [photoData.photoItems.length])

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
      const itemWidth = carousel.scrollWidth / photoData.photoItems.length
      carousel.scrollTo({
        left: itemWidth * selectedIndex,
        behavior: "smooth",
      })
    }
  }, [selectedIndex, photoData.photoItems.length])

  return {
    selectedIndex,
    setSelectedIndex,
    touchStart,
    touchEnd,
    carouselRef,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    handleNext,
    handlePrevious,
  }
}
