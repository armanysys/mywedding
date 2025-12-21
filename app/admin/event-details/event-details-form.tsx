"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getEventDetailsDataClient } from "@/lib/services/event-details.service"
import type { EventDetails, EventBlock } from "@/Domain/EventDetail"
import { Loader2, Plus, Trash2 } from "lucide-react"

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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Información del Evento</Label>
          <Button type="button" onClick={handleAddBlock} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Agregar más información
          </Button>
        </div>

        {formData.Information && formData.Information.length > 0 ? (
          <div className="space-y-4">
            {formData.Information.map((block, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium">Bloque {index + 1}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveBlock(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`heading-${index}`}>Encabezado</Label>
                      <Input
                        id={`heading-${index}`}
                        value={block.heading}
                        onChange={(e) => handleUpdateBlock(index, "heading", e.target.value)}
                        placeholder="Ej: Fecha, Hora, Ubicación"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`subheading-${index}`}>Subencabezado (opcional)</Label>
                      <Input
                        id={`subheading-${index}`}
                        value={block.subheading || ""}
                        onChange={(e) => handleUpdateBlock(index, "subheading", e.target.value)}
                        placeholder="Información adicional"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`value-${index}`}>Valor</Label>
                    <Input
                      id={`value-${index}`}
                      value={block.value}
                      onChange={(e) => handleUpdateBlock(index, "value", e.target.value)}
                      placeholder="Contenido principal del bloque"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`mapUrl-${index}`}>URL del Mapa (opcional)</Label>
                      <Input
                        id={`mapUrl-${index}`}
                        value={block.mapUrl || ""}
                        onChange={(e) => handleUpdateBlock(index, "mapUrl", e.target.value)}
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`instagraUrl-${index}`}>URL de Instagram (opcional)</Label>
                      <Input
                        id={`instagraUrl-${index}`}
                        value={block.InstagraUrl || ""}
                        onChange={(e) => handleUpdateBlock(index, "InstagraUrl", e.target.value)}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
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
  )
}
