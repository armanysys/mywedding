"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { getEventDetailsDataClient } from "@/lib/services/event-details.service"
import type { EventDetails, EventBlock } from "@/Domain/EventDetail"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { iconMapping } from "@/Domain/IconMaping"

export function EventDetailsForm() {
  const [formData, setFormData] = useState<EventDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getEventDetailsDataClient()
        setFormData(data)
      } catch (error) {
        console.error("Error loading event details:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // TODO: Implementar guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    alert("Datos guardados correctamente")
  }

  const handleAddBlock = () => {
    if (!formData) return

    const newBlock: EventBlock = {
      icon: "",
      heading: "",
      value: "",
      subheading: "",
      mapUrl: "",
      InstagraUrl: "",
    }

    const updatedInformation = [...(formData.Information || []), newBlock]
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleRemoveBlock = (index: number) => {
    if (!formData || !formData.Information) return

    const updatedInformation = formData.Information.filter((_, i) => i !== index)
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleUpdateBlock = (index: number, field: keyof EventBlock, value: string) => {
    if (!formData || !formData.Information) return

    const updatedInformation = formData.Information.map((block, i) =>
      i === index ? { ...block, [field]: value } : block,
    )
    setFormData({ ...formData, Information: updatedInformation })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!formData) {
    return <p className="text-muted-foreground">Error al cargar los datos</p>
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título de la sección</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subTitle">Subtítulo</Label>
          <Input
            id="subTitle"
            value={formData.subTitle}
            onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Información del Evento</Label>
            <Button type="button" onClick={handleAddBlock} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar más información
            </Button>
          </div>

          {formData.Information && formData.Information.length > 0 ? (
            <div className="space-y-3">
              {formData.Information.map((block, index) => (
                <Card key={index} className="py-2 gap-1">
                  <CardContent className="space-y-3 pb-4 pt-4">
                    <div className="grid gap-3 md:grid-cols-4 items-start">
                      <div className="space-y-1.5">
                        <Label htmlFor={`icon-${index}`} className="text-xs">
                          Icono
                        </Label>
                        <Select value={block.icon} onValueChange={(value) => handleUpdateBlock(index, "icon", value)}>
                          <SelectTrigger id={`icon-${index}`} className="h-9">
                            <SelectValue placeholder="Selecciona un icono">
                              {block.icon && (
                                <div className="flex items-center gap-2">
                                  {(() => {
                                    const IconComponent = iconMapping[block.icon as keyof typeof iconMapping]
                                    return IconComponent ? <IconComponent className="h-4 w-4" /> : null
                                  })()}
                                  <span className="text-sm">{block.icon}</span>
                                </div>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(iconMapping).map((iconName) => {
                              const IconComponent = iconMapping[iconName as keyof typeof iconMapping]
                              return (
                                <SelectItem key={iconName} value={iconName}>
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4" />
                                    <span>{iconName}</span>
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor={`heading-${index}`} className="text-xs">
                          Encabezado
                        </Label>
                        <Input
                          id={`heading-${index}`}
                          value={block.heading}
                          onChange={(e) => handleUpdateBlock(index, "heading", e.target.value)}
                          placeholder="Ej: Fecha, Hora, Ubicación"
                          className="h-9"
                        />
                      </div>

                      <div className="flex items-end h-full">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveBlock(index)}
                              className="w-full h-9"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Eliminar</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor={`value-${index}`} className="text-xs">
                          Valor
                        </Label>
                        <Input
                          id={`value-${index}`}
                          value={block.value}
                          onChange={(e) => handleUpdateBlock(index, "value", e.target.value)}
                          placeholder="Contenido principal"
                          className="h-9"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor={`subheading-${index}`} className="text-xs">
                          Subencabezado (opcional)
                        </Label>
                        <Input
                          id={`subheading-${index}`}
                          value={block.subheading || ""}
                          onChange={(e) => handleUpdateBlock(index, "subheading", e.target.value)}
                          placeholder="Información adicional"
                          className="h-9"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor={`mapUrl-${index}`} className="text-xs">
                          URL del Mapa (opcional)
                        </Label>
                        <Input
                          id={`mapUrl-${index}`}
                          value={block.mapUrl || ""}
                          onChange={(e) => handleUpdateBlock(index, "mapUrl", e.target.value)}
                          placeholder="https://maps.google.com/..."
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor={`instagraUrl-${index}`} className="text-xs">
                          URL de Instagram (opcional)
                        </Label>
                        <Input
                          id={`instagraUrl-${index}`}
                          value={block.InstagraUrl || ""}
                          onChange={(e) => handleUpdateBlock(index, "InstagraUrl", e.target.value)}
                          placeholder="https://instagram.com/..."
                          className="h-9"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center text-sm text-muted-foreground">
                No hay bloques de información. Haz clic en "Agregar más información" para crear uno.
              </CardContent>
            </Card>
          )}
        </div>

        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar cambios
        </Button>
      </form>
    </TooltipProvider>
  )
}
