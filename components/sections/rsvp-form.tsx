"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Confirma tu Asistencia</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Por favor confirma tu asistencia antes del 1 de Mayo, 2025
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
                  {/* Name */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre(s)</Label>
                      <Input id="firstName" required placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido(s)</Label>
                      <Input id="lastName" required placeholder="Tus apellidos" />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" required placeholder="tu@email.com" />
                    </div>
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

                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="guests">Número de Invitados</Label>
                    <Input id="guests" type="number" min="1" max="5" defaultValue="1" required />
                    <p className="text-sm text-muted-foreground">Incluyéndote a ti</p>
                  </div>

                  {/* Menu Selection */}
                  <div className="space-y-3">
                    <Label>Preferencia de Menú</Label>
                    <RadioGroup defaultValue="regular" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="regular" />
                        <Label htmlFor="regular" className="font-normal cursor-pointer">
                          Menú Regular
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegetarian" id="vegetarian" />
                        <Label htmlFor="vegetarian" className="font-normal cursor-pointer">
                          Vegetariano
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegan" id="vegan" />
                        <Label htmlFor="vegan" className="font-normal cursor-pointer">
                          Vegano
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
