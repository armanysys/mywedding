"use client"

import { ChevronDown } from "lucide-react"
import { Countdown } from "../countdown/countdown"
import { useEffect, useState } from "react"
import { EventDetails } from "@/Domain/EventDetail"
import type { Couple as CoupleType } from "@/Domain/CoupleInfo"
import { getEventDetailsDataClient } from "@/lib/services/event-details.service"
import { getCoupleInfoClient } from "@/lib/services/couple-info.service"
import { formatDateSpanish } from "@/lib/utils"

export function InitialSection() {
  const [eventDetails, setInitialData] = useState<EventDetails | null>(null)
  const [coupleInfo, setCoupleInfo] = useState<CoupleType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [eventDetailsData, coupleData] = await Promise.all([
          getEventDetailsDataClient(),
          getCoupleInfoClient(),
        ])

        setInitialData(eventDetailsData)
        setCoupleInfo(coupleData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load initial data")
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
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

  if (error || !eventDetails || !coupleInfo) {
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
          src={coupleInfo.PhotoSrcBride || "/placeholder.svg"}
          alt={coupleInfo.BrideName || "Imagen de fondo"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light">{coupleInfo.titleInitSection}</p>

        {coupleInfo && (
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-balance">{coupleInfo.GroomName} & {coupleInfo.BrideName}</h1>
        )}
        <div className="w-16 h-px bg-white/60 mx-auto mb-6" />
        <p className="text-xl md:text-2xl font-light tracking-wide">{formatDateSpanish(eventDetails.countDownDateEvent)}</p>

        {/* Countdown */}
        <Countdown dateEvent={eventDetails.countDownDateEvent} />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          document.getElementById(eventDetails.id)?.scrollIntoView({ behavior: "smooth" })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
