"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function LogisticsForm() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "Logística",
    description: "Información sobre hospedaje y transporte",
    hotels: "",
    transport: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // TODO: Implementar guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    alert("Datos guardados correctamente")
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
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hotels">Información de hoteles</Label>
        <Textarea
          id="hotels"
          value={formData.hotels}
          onChange={(e) => setFormData({ ...formData, hotels: e.target.value })}
          placeholder="Lista de hoteles recomendados..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="transport">Información de transporte</Label>
        <Textarea
          id="transport"
          value={formData.transport}
          onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
          placeholder="Información sobre transporte..."
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
