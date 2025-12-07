"use client"

import { Gift, CreditCard, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { apiService } from "@/lib/services/api.service"
import type { GiftDescription } from "@/lib/interfaces/GiftRegistry"

export function GiftRegistrySection() {
  const [giftData, setGiftData] = useState<GiftDescription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGiftRegistry = async () => {
      try {
        setLoading(true)
        const data = await apiService.getGiftRegistry()
        setGiftData(data)
        setError(null)
      } catch (err) {
        console.error("[Gift Registry] Failed to load data:", err)
        setError("No se pudo cargar la información de regalos. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchGiftRegistry()
  }, [])

  // Loading state
  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded-lg w-64 mx-auto mb-6" />
              <div className="h-4 bg-muted rounded w-96 mx-auto mb-12" />
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-muted rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error || !giftData) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
              <p className="text-destructive font-medium">{error || "Error al cargar los datos"}</p>
              <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const { title, intro, note, giftRegistry, transferAccounts } = giftData

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{title}</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Store Registry */}
            {giftRegistry.map((item) => (
              <Card key={item.id} className="border-2 hover:border-sage transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">{item.name}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-sage text-sage hover:bg-sage hover:text-white bg-transparent"
                      asChild
                    >
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        Ver en {item.name}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Bank Transfer Accounts - Supports multiple accounts */}
            {transferAccounts.map((transfer, index) => (
              <Card key={index} className="border-2 hover:border-sage transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">Transferencia - {transfer.bank}</h3>
                  <p className="text-muted-foreground mb-6">Si prefieres hacer una transferencia bancaria</p>
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Banco:</span> {transfer.bank}
                    </div>
                    <div>
                      <span className="font-medium">Cuenta:</span> {transfer.account}
                    </div>
                    <div>
                      <span className="font-medium">CLABE:</span> {transfer.clabe}
                    </div>
                    <div>
                      <span className="font-medium">Titular:</span> {transfer.holder}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Note */}
          <div className="text-center bg-sage/5 p-8 rounded-lg">
            <Heart className="w-8 h-8 text-sage mx-auto mb-4" />
            <p className="text-muted-foreground italic text-pretty">{note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
