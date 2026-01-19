"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getEventDetailsDataClient } from "@/Application/services"
import type { EventDetails as EventDetailsType } from "@/Domain/EventDetail"
import { iconMapping } from "@/Domain/IconMaping"

const isValidUrl = (url: string | undefined | null): boolean => {
  if (!url) return false
  const trimmed = url.trim()
  return trimmed.length > 0
}

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

  const { id, title, CoupleHistory, Information } = eventDetails

  return (
    <section id={id} className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">{title}</h2>
          <div className="w-24 h-px bg-sage mx-auto mb-12" />

          <p className="text-lg md:text-xl text-muted-foreground mb-16 leading-relaxed max-w-2xl mx-auto text-pretty">
            {CoupleHistory}
          </p>

          {Information && Information.length > 0 && (
            <div
              className={`grid gap-8 md:gap-12 ${Information.length === 3 ? "md:grid-cols-3" : Information.length === 2 ? "md:grid-cols-2" : Information.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"}`}
            >
              {Information.map((block, index) => {
                const IconComponent = iconMapping[block.icon as keyof typeof iconMapping]

                return (
                  <div key={`${block.heading}-${index}`} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-sage" />
                    </div>
                    <h3 className="font-serif text-xl mb-2">{block.heading}</h3>
                    {block.subheading && <p className="text-muted-foreground">{block.subheading}</p>}
                    <p className="text-lg font-medium mb-3">{block.Information}</p>

                    {block.isVisibleMediaUrl && block.MediaUrl && block.MediaUrl.length > 0 && (
                      <div className="flex gap-2">
                        {block.MediaUrl.map((media, mediaIndex) => {
                          const SocialIcon = iconMapping[media.platform as keyof typeof iconMapping]
                          if (!SocialIcon || !isValidUrl(media.url)) return null

                          return (
                            <Button key={`${media.platform}-${mediaIndex}`} variant="outline" size="sm" asChild>
                              <a
                                href={media.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sage border-sage hover:bg-sage hover:text-white"
                                aria-label={`Ver en ${media.platform}`}
                              >
                                <SocialIcon className="w-4 h-4" />
                              </a>
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
