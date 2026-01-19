"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { getConfirmacionAsistenciaDataClient } from "@/Application/services"
import type { ConfirmacionAsistencia } from "@/Domain/ConfirmacionAsistencia"

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false)
  const [confirmacionData, setConfirmacionData] = useState<ConfirmacionAsistencia | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchConfirmacionData() {
      try {
        const data = await getConfirmacionAsistenciaDataClient()
        setConfirmacionData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load hero data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchConfirmacionData()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">Cargando formulario...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!confirmacionData) {
    return null
  }

  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{confirmacionData.title}</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {confirmacionData.subtitle} {confirmacionData.fechaLimite}
            </p>
          </div>

          {submitted ? (
            <Card className="border-2 border-sage">
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-sage mx-auto mb-4" />
                <h3 className="font-serif text-2xl mb-2">¡Gracias por confirmar!</h3>
                <p className="text-muted-foreground">Hemos recibido tu confirmación. ¡Nos vemos pronto!</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" type="tel" placeholder="55 1234 5678" />
                    </div>
                  </div>

                  {/* Attendance */}
                  <div className="space-y-3">
                    <Label>¿Asistirás?</Label>
                    <RadioGroup defaultValue="yes" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="font-normal cursor-pointer">
                          Sí, asistiré con gusto
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="font-normal cursor-pointer">
                          No podré asistir
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Dietary Restrictions */}
                  <div className="space-y-2">
                    <Label htmlFor="restrictions">Alergias o Restricciones Alimentarias</Label>
                    <Textarea
                      id="restrictions"
                      placeholder="Por favor indícanos si tienes alguna alergia o restricción alimentaria"
                      rows={3}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje para los Novios (Opcional)</Label>
                    <Textarea id="message" placeholder="Déjanos un mensaje especial" rows={4} />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full bg-sage hover:bg-sage/90 text-white">
                    Confirmar Asistencia
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
