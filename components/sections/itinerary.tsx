"use client"

import { useEffect, useState } from "react"
import { getItineraryDataClient } from "@/lib/services/itinerary.service"
import type { ItineraryProps } from "@/Domain/ItineraryProps"
import { iconMap } from "@/lib/data/icon-map"
import { Loader2 } from "lucide-react"

export function Itinerary() {
  const [itineraryData, setItineraryData] = useState<ItineraryProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchItineraryData() {
      try {
        const data = await getItineraryDataClient()
        setItineraryData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load itinerary data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchItineraryData()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-sage" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-destructive text-center">Error: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (!itineraryData) {
    return null
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{itineraryData.Title}</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{itineraryData.Description}</p>
          </div>

          <div className="space-y-8">
            {itineraryData.ScheduleItem.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              return (
                <div key={index} className="flex gap-6 items-start group hover:translate-x-2 transition-transform">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-sage group-hover:text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-4 mb-2">
                      <span className="text-sm font-medium text-sage">{item.time}</span>
                      <h3 className="font-serif text-xl md:text-2xl">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
