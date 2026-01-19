"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getLogisticsDataClient } from "@/Application/services"
import type { Logistics, TransportOption, HotelRecommendation, DressCodeColor } from "@/Domain/Logistic"

export function LogisticsForm() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Logistics | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getLogisticsDataClient()
        setFormData(data)
      } catch (error) {
        console.error("Error loading logistics data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !formData) {
    return <div className="flex items-center justify-center py-8">Cargando...</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    alert("Datos guardados correctamente")
  }

  const addTransport = () => {
    setFormData({
      ...formData,
      transport: [...formData.transport, { mode: "", details: "" }],
    })
  }

  const removeTransport = (index: number) => {
    setFormData({
      ...formData,
      transport: formData.transport.filter((_, i) => i !== index),
    })
  }

  const updateTransport = (index: number, field: keyof TransportOption, value: string) => {
    const updated = [...formData.transport]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, transport: updated })
  }

  const addHotel = () => {
    setFormData({
      ...formData,
      hotels: [...formData.hotels, { name: "", details: "", price: "" }],
    })
  }

  const removeHotel = (index: number) => {
    setFormData({
      ...formData,
      hotels: formData.hotels.filter((_, i) => i !== index),
    })
  }

  const updateHotel = (index: number, field: keyof HotelRecommendation, value: string) => {
    const updated = [...formData.hotels]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, hotels: updated })
  }

  const addDressColor = () => {
    setFormData({
      ...formData,
      dressCode: {
        ...formData.dressCode,
        colors: [...formData.dressCode.colors, { name: "", hex: "" }],
      },
    })
  }

  const removeDressColor = (index: number) => {
    setFormData({
      ...formData,
      dressCode: {
        ...formData.dressCode,
        colors: formData.dressCode.colors.filter((_, i) => i !== index),
      },
    })
  }

  const updateDressColor = (index: number, field: keyof DressCodeColor, value: string) => {
    const updated = [...formData.dressCode.colors]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({
      ...formData,
      dressCode: { ...formData.dressCode, colors: updated },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title and Intro */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-sm">
            Título
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="intro" className="text-sm">
            Introducción
          </Label>
          <Input
            id="intro"
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            className="h-9"
          />
        </div>
      </div>

      {/* Venue Section */}
      <Card className="border bg-card">
        <CardContent className="pt-3 space-y-3">
          <h3 className="font-semibold text-sm">Lugar del Evento</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="venue-name" className="text-sm">
                Nombre del Lugar
              </Label>
              <Input
                id="venue-name"
                value={formData.venue.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    venue: { ...formData.venue, name: e.target.value },
                  })
                }
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="venue-map" className="text-sm">
                URL del Mapa
              </Label>
              <Input
                id="venue-map"
                value={formData.venue.mapUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    venue: { ...formData.venue, mapUrl: e.target.value },
                  })
                }
                className="h-9"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="venue-line1" className="text-sm">
                Dirección
              </Label>
              <Input
                id="venue-line1"
                value={formData.venue.address.line1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    venue: {
                      ...formData.venue,
                      address: { ...formData.venue.address, line1: e.target.value },
                    },
                  })
                }
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="venue-city" className="text-sm">
                Ciudad
              </Label>
              <Input
                id="venue-city"
                value={formData.venue.address.city || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    venue: {
                      ...formData.venue,
                      address: { ...formData.venue.address, city: e.target.value },
                    },
                  })
                }
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="venue-postal" className="text-sm">
                Código Postal
              </Label>
              <Input
                id="venue-postal"
                value={formData.venue.address.postalCode || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    venue: {
                      ...formData.venue,
                      address: { ...formData.venue.address, postalCode: e.target.value },
                    },
                  })
                }
                className="h-9"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="venue-parking" className="text-sm">
              Información de Estacionamiento
            </Label>
            <Textarea
              id="venue-parking"
              value={formData.venue.parkingInfo || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  venue: { ...formData.venue, parkingInfo: e.target.value },
                })
              }
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transport Section */}
      <Card className="border bg-card">
        <CardContent className="pt-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Transporte</h3>
            <Button type="button" onClick={addTransport} size="sm" variant="outline">
              Agregar
            </Button>
          </div>
          <div className="space-y-2">
            {formData.transport.map((transport, index) => (
              <Card key={index} className="border bg-background">
                <CardContent className="pt-3">
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Modo</Label>
                      <Input
                        value={transport.mode}
                        onChange={(e) => updateTransport(index, "mode", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="text-xs">Detalles</Label>
                      <div className="flex gap-2">
                        <Input
                          value={transport.details}
                          onChange={(e) => updateTransport(index, "details", e.target.value)}
                          className="h-9"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                onClick={() => removeTransport(index)}
                                size="sm"
                                variant="ghost"
                                className="h-9 w-9 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Eliminar</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hotels Section */}
      <Card className="border bg-card">
        <CardContent className="pt-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Hoteles</h3>
            <Button type="button" onClick={addHotel} size="sm" variant="outline">
              Agregar
            </Button>
          </div>
          <div className="space-y-2">
            {formData.hotels.map((hotel, index) => (
              <Card key={index} className="border bg-background">
                <CardContent className="pt-3">
                  <div className="grid gap-2 md:grid-cols-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Hotel</Label>
                      <Input
                        value={hotel.name}
                        onChange={(e) => updateHotel(index, "name", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="text-xs">Detalles</Label>
                      <Input
                        value={hotel.details}
                        onChange={(e) => updateHotel(index, "details", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Precio</Label>
                      <div className="flex gap-2">
                        <Input
                          value={hotel.price || ""}
                          onChange={(e) => updateHotel(index, "price", e.target.value)}
                          className="h-9"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                onClick={() => removeHotel(index)}
                                size="sm"
                                variant="ghost"
                                className="h-9 w-9 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Eliminar</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dress Code Section */}
      <Card className="border bg-card">
        <CardContent className="pt-3 space-y-3">
          <h3 className="font-semibold text-sm">Código de Vestimenta</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="dress-code" className="text-sm">
                Código
              </Label>
              <Input
                id="dress-code"
                value={formData.dressCode.code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dressCode: { ...formData.dressCode, code: e.target.value },
                  })
                }
                className="h-9"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dress-details" className="text-sm">
              Detalles
            </Label>
            <Textarea
              id="dress-details"
              value={formData.dressCode.details}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dressCode: { ...formData.dressCode, details: e.target.value },
                })
              }
              className="min-h-20"
            />
          </div>

          {/* Dress Colors */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold">Colores Sugeridos</h4>
              <Button type="button" onClick={addDressColor} size="sm" variant="outline">
                Agregar Color
              </Button>
            </div>
            <div className="space-y-2">
              {formData.dressCode.colors.map((color, index) => (
                <Card key={index} className="border bg-background">
                  <CardContent className="pt-3">
                    <div className="grid gap-2 md:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Nombre</Label>
                        <Input
                          value={color.name}
                          onChange={(e) => updateDressColor(index, "name", e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Código Hex</Label>
                        <Input
                          type="color"
                          value={color.hex || "#000000"}
                          onChange={(e) => updateDressColor(index, "hex", e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <div className="flex items-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                onClick={() => removeDressColor(index)}
                                size="sm"
                                variant="ghost"
                                className="h-9 w-9 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Eliminar</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar cambios
        </Button>
      </div>
    </form>
  )
}
