"use client"

import { ChevronDown } from "lucide-react"
import { Countdown } from "../countdown/countdown"
import { useEffect, useState } from "react"
import type { Hero as HeroType } from "@/lib/interfaces/Hero"
import { getHeroDataClient } from "@/lib/services/hero.service"

export function HeroSection() {
  const [heroData, setHeroData] = useState<HeroType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadHeroData() {
      try {
        const data = await getHeroDataClient()
        setHeroData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load hero data")
      } finally {
        setIsLoading(false)
      }
    }

    loadHeroData()
  }, [])

  if (isLoading) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-muted">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-muted-foreground">Cargando...</p>
        </div>
      </section>
    )
  }

  if (error || !heroData) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-muted">
        <div className="text-center text-destructive">
          <p>Error al cargar la información</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroData.imageSrc || "/placeholder.svg"}
          alt={heroData.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light">{heroData.subtitle}</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-balance">{heroData.title}</h1>
        <div className="w-16 h-px bg-white/60 mx-auto mb-6" />
        <p className="text-xl md:text-2xl font-light tracking-wide">{heroData.dateLabel}</p>

        {/* Countdown */}
        <Countdown targetDateISO={heroData.targetDateISO} />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          document.getElementById(heroData.detailsId)?.scrollIntoView({ behavior: "smooth" })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
