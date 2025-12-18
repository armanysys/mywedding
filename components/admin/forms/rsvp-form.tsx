"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getConfirmacionAsistenciaDataClient } from "@/lib/services/confirmacion-asistencia.service"
import type { ConfirmacionAsistencia } from "@/Domain/ConfirmacionAsistencia"
import { Loader2 } from "lucide-react"

export function RsvpForm() {
  const [formData, setFormData] = useState<ConfirmacionAsistencia | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getConfirmacionAsistenciaDataClient()
        setFormData(data)
      } catch (error) {
        console.error("Error loading RSVP data:", error)
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
        <Label htmlFor="titulo">Título de la sección</Label>
        <Input
          id="titulo"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="labelNombre">Etiqueta del campo nombre</Label>
        <Input
          id="labelNombre"
          value={formData.labelNombre}
          onChange={(e) => setFormData({ ...formData, labelNombre: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="labelAsistencia">Etiqueta del campo asistencia</Label>
        <Input
          id="labelAsistencia"
          value={formData.labelAsistencia}
          onChange={(e) => setFormData({ ...formData, labelAsistencia: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="textoBoton">Texto del botón</Label>
        <Input
          id="textoBoton"
          value={formData.textoBoton}
          onChange={(e) => setFormData({ ...formData, textoBoton: e.target.value })}
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
