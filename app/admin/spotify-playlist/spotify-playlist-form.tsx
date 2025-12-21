"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function SpotifyPlaylistForm() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "Nuestra Playlist",
    description: "Escucha las canciones que serán parte de nuestra celebración",
    spotifyUrl: "",
    spotifyEmbedUrl: "",
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
        <Label htmlFor="spotifyUrl">URL de la playlist de Spotify</Label>
        <Input
          id="spotifyUrl"
          value={formData.spotifyUrl}
          onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
          placeholder="https://open.spotify.com/playlist/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="spotifyEmbedUrl">URL de embed de Spotify</Label>
        <Input
          id="spotifyEmbedUrl"
          value={formData.spotifyEmbedUrl}
          onChange={(e) => setFormData({ ...formData, spotifyEmbedUrl: e.target.value })}
          placeholder="https://open.spotify.com/embed/playlist/..."
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
