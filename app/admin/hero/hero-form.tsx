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

  // Convierte un ISO (UTC) a valor para `input[type=datetime-local]` (representación local)
  const isoToLocalInput = (iso?: string | null) => {
    if (!iso) return ""
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ""
    const pad = (n: number) => String(n).padStart(2, "0")
    const yyyy = d.getFullYear()
    const mm = pad(d.getMonth() + 1)
    const dd = pad(d.getDate())
    const hh = pad(d.getHours())
    const min = pad(d.getMinutes())
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`
  }

  // Convierte valor de `input[type=datetime-local]` (local) a ISO UTC para almacenar
  const localInputToIso = (local: string) => {
    // `new Date(local)` interpreta la cadena como hora local
    const d = new Date(local)
    return isNaN(d.getTime()) ? local : d.toISOString()
  }

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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información principal */}
      <div className="space-y-4">
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
      </div>

      {/* Fecha del evento */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dateEvent">Fecha y hora</Label>
          <Input
            id="dateEvent"
            type="datetime-local"
            value={isoToLocalInput(formData.dateEvent)}
            onChange={(e) =>
              setFormData({ ...formData, dateEvent: localInputToIso(e.target.value) })
            }
          />
        </div>
      </div>

      {/* Redes sociales y contacto */}
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="facebookUrl">Facebook</Label>
            <Input
              id="facebookUrl"
              type="url"
              placeholder="https://facebook.com/..."
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagramUrl">Instagram</Label>
            <Input
              id="instagramUrl"
              type="url"
              placeholder="https://instagram.com/..."
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="contacto@ejemplo.com"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Hashtag */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hashtag">Hashtag</Label>
          <Input
            id="hashtag"
            placeholder="#MiBoda2026"
            value={formData.hashtag}
            onChange={(e) => setFormData({ ...formData, hashtag: e.target.value })}
          />
        </div>
      </div>

      {/* Línea final */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="endLine">Mensaje final</Label>
          <Textarea
            id="endLine"
            rows={3}
            placeholder="Un mensaje especial para tus invitados..."
            value={formData.endLine}
            onChange={(e) => setFormData({ ...formData, endLine: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
