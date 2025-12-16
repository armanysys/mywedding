"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getHeroDataClient } from "@/lib/services/hero.service"
import type { Hero } from "@/lib/interfaces/Hero"
import { Loader2 } from "lucide-react"

export function HeroForm() {
  const [formData, setFormData] = useState<Hero | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHeroDataClient()
        setFormData(data)
      } catch (error) {
        console.error("Error loading hero data:", error)
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
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="groomName">Nombre del novio</Label>
          <Input
            id="groomName"
            value={formData.groomName}
            onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brideName">Nombre de la novia</Label>
          <Input
            id="brideName"
            value={formData.brideName}
            onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="weddingDate">Fecha de la boda</Label>
        <Input
          id="weddingDate"
          value={formData.weddingDate}
          onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Frase</Label>
        <Textarea
          id="tagline"
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="backgroundImage">URL de la imagen de fondo</Label>
        <Input
          id="backgroundImage"
          value={formData.backgroundImage}
          onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
