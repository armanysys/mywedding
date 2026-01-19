"use client"

import { Car, Hotel, Shirt, Navigation } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getLogisticsDataClient } from "@/Application/services"
import type { Logistics as LogisticsType } from "@/Domain/Logistic"

export function Logistics() {
  const [data, setData] = useState<LogisticsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logisticsData = await getLogisticsDataClient()
        setData(logisticsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load logistics data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Cargando información...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">{error || "Error al cargar los datos"}</p>
          </div>
        </div>
      </section>
    )
  }

  const { title, intro, venue, transport, hotels, dressCode } = data

  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{title}</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* How to Get There */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Cómo Llegar</h3>
                    <p className="text-muted-foreground mb-4">
                      {venue.name}
                      <br />
                      {venue.address.line1}
                      <br />
                      {venue.address.city}, {venue.address.postalCode}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-sage text-sage hover:bg-sage hover:text-white bg-transparent"
                      asChild
                    >
                      <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
                        Abrir en Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Estacionamiento:</strong> {venue.parkingInfo}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Parking */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Transporte</h3>
                    <ul className="text-muted-foreground space-y-2">
                      {transport.map((t, i) => (
                        <li key={i}>
                          • {t.mode}: {t.details}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accommodation */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Hotel className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Alojamiento</h3>
                    <p className="text-muted-foreground mb-4">Hoteles recomendados cerca del lugar</p>
                    <div className="space-y-3 text-sm">
                      {hotels.map((h) => (
                        <div key={h.name}>
                          <p className="font-medium">{h.name}</p>
                          <p className="text-muted-foreground">{h.details}</p>
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground italic mt-4">
                        Menciona "Boda Julia & Armando" para obtener la tarifa especial
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dress Code */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Shirt className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Código de Vestimenta</h3>
                    <p className="text-muted-foreground mb-4">{dressCode.code}</p>
                    <div className="space-y-2 text-sm">
                      <p>{dressCode.details}</p>
                      <div className="mt-4 pt-4 border-t">
                        <p className="font-medium mb-2">Paleta de colores sugerida:</p>
                        <div className="flex gap-2">
                          {dressCode.colors.map((c) => (
                            <div
                              key={c.name}
                              className={`w-10 h-10 rounded-full ${c.hex ? "" : ""}`}
                              title={c.name}
                              style={c.hex ? { backgroundColor: c.hex } : undefined}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Por favor evita el blanco</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
