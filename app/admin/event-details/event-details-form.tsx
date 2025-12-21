"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getEventDetailsDataClient } from "@/lib/services/event-details.service"
import type { EventDetails } from "@/Domain/EventDetail"
import { Loader2 } from "lucide-react"

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
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.intro ?? ""}
          onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Fecha</Label>
          <Input
            id="date"
            value={formData.dateBlock.value}
            onChange={(e) => setFormData({ ...formData, dateBlock: { ...formData.dateBlock, value: e.target.value } })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Hora</Label>
          <Input
            id="time"
            value={formData.timeBlock.value}
            onChange={(e) => setFormData({ ...formData, timeBlock: { ...formData.timeBlock, value: e.target.value } })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            value={formData.locationBlock.value}
            onChange={(e) => setFormData({ ...formData, locationBlock: { ...formData.locationBlock, value: e.target.value } })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Lugar</Label>
          <Input
            id="location"
            value={formData.locationBlock.subheading}
            onChange={(e) => setFormData({ ...formData, locationBlock: { ...formData.locationBlock, subheading: e.target.value } })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mapUrl">URL del mapa</Label>
        <Input
          id="mapUrl"
          value={formData.locationBlock.mapUrl ?? ""}
          onChange={(e) => setFormData({ ...formData, locationBlock: { ...formData.locationBlock, mapUrl: e.target.value } })}
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
