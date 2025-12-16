"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getItineraryDataClient } from "@/lib/services/itinerary.service"
import type { ItineraryProps } from "@/lib/interfaces/ItineraryProps"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ItineraryForm() {
  const [formData, setFormData] = useState<ItineraryProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getItineraryDataClient()
        setFormData(data)
      } catch (error) {
        console.error("Error loading itinerary:", error)
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

  const addItem = () => {
    if (!formData) return
    setFormData({
      ...formData,
      items: [...formData.items, { time: "", title: "", description: "", icon: "" }],
    })
  }

  const removeItem = (index: number) => {
    if (!formData) return
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: string, value: string) => {
    if (!formData) return
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Actividades</Label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar actividad
          </Button>
        </div>

        {formData.items.map((item, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Hora</Label>
                    <Input value={item.time} onChange={(e) => updateItem(index, "time", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input value={item.title} onChange={(e) => updateItem(index, "title", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
