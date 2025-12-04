"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getEventDetailsDataClient } from "@/lib/services/event-details.service"
import type { EventDetails as EventDetailsType } from "@/lib/interfaces/EventDetail"

export function EventDetails() {
  const [eventDetails, setEventDetails] = useState<EventDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await getEventDetailsDataClient()
        setEventDetails(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load event details")
        console.error("[v0] Error fetching event details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEventDetails()
  }, [])

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-sage/20 rounded-lg w-64 mx-auto mb-6" />
              <div className="w-24 h-px bg-sage/20 mx-auto mb-12" />
              <div className="h-24 bg-sage/10 rounded-lg max-w-2xl mx-auto mb-16" />
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-sage/10 mb-4" />
                    <div className="h-6 bg-sage/10 rounded w-20 mb-2" />
                    <div className="h-4 bg-sage/10 rounded w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !eventDetails) {
    return (
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-red-600 text-lg">{error || "No se pudieron cargar los detalles del evento"}</p>
          </div>
        </div>
      </section>
    )
  }

  const { id, title, intro, dateBlock, timeBlock, locationBlock } = eventDetails

  return (
    <section id={id} className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">{title}</h2>
          <div className="w-24 h-px bg-sage mx-auto mb-12" />

          <p className="text-lg md:text-xl text-muted-foreground mb-16 leading-relaxed max-w-2xl mx-auto text-pretty">
            {intro}
          </p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Date */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl mb-2">{dateBlock.heading}</h3>
              <p className="text-muted-foreground">{dateBlock.subheading}</p>
              <p className="text-lg font-medium">{dateBlock.value}</p>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl mb-2">{timeBlock.heading}</h3>
              <p className="text-muted-foreground">{timeBlock.subheading}</p>
              <p className="text-lg font-medium">{timeBlock.value}</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl mb-2">{locationBlock.heading}</h3>
              <p className="text-muted-foreground">{locationBlock.subheading}</p>
              <p className="text-lg font-medium mb-3">{locationBlock.value}</p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={locationBlock.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage border-sage hover:bg-sage hover:text-white"
                >
                  Ver en Mapa
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
