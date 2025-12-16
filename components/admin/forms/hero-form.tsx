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
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dateLabel">Etiqueta de fecha</Label>
          <Input
            id="dateLabel"
            value={formData.dateLabel}
            onChange={(e) => setFormData({ ...formData, dateLabel: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetDateISO">Fecha objetivo (ISO)</Label>
          <Input
            id="targetDateISO"
            type="datetime-local"
            value={formData.targetDateISO.slice(0, 16)}
            onChange={(e) => setFormData({ ...formData, targetDateISO: new Date(e.target.value).toISOString() })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="imageSrc">URL de la imagen</Label>
          <Input
            id="imageSrc"
            value={formData.imageSrc}
            onChange={(e) => setFormData({ ...formData, imageSrc: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageAlt">Texto alternativo de imagen</Label>
          <Input
            id="imageAlt"
            value={formData.imageAlt}
            onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="detailsId">ID de detalles</Label>
          <Input
            id="detailsId"
            value={formData.detailsId}
            onChange={(e) => setFormData({ ...formData, detailsId: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hashtag">Hashtag</Label>
          <Input
            id="hashtag"
            value={formData.hashtag}
            onChange={(e) => setFormData({ ...formData, hashtag: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="facebookUrl">URL de Facebook</Label>
          <Input
            id="facebookUrl"
            type="url"
            value={formData.facebookUrl}
            onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagramUrl">URL de Instagram</Label>
          <Input
            id="instagramUrl"
            type="url"
            value={formData.instagramUrl}
            onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endLine">Línea final</Label>
        <Textarea
          id="endLine"
          value={formData.endLine}
          onChange={(e) => setFormData({ ...formData, endLine: e.target.value })}
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
