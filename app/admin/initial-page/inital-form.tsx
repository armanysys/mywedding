"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { getCoupleInfoClient } from "@/lib/services/couple-info.service"
import type { Couple } from "@/Domain/CoupleInfo"
import { Loader2 } from "lucide-react"

export function InitialForm() {
  const [formData, setFormData] = useState<Couple | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCoupleInfoClient()
        setFormData(data)
      } catch (error) {
        console.error("Error loading couple info data:", error)
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
      {/* Información de los novios */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Información de los novios</h2>

        <div className="space-y-2">
          <Label htmlFor="titleInitSection">Título de la sección inicial</Label>
          <Input
            id="titleInitSection"
            value={formData.titleInitSection}
            onChange={(e) => setFormData({ ...formData, titleInitSection: e.target.value })}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="groomName">Nombre del novio</Label>
            <Input
              id="groomName"
              value={formData.GroomName}
              onChange={(e) => setFormData({ ...formData, GroomName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brideName">Nombre de la novia</Label>
            <Input
              id="brideName"
              value={formData.BrideName}
              onChange={(e) => setFormData({ ...formData, BrideName: e.target.value })}
            />
          </div>
        </div>

        {/* URL de foto de la novia */}
        <div className="space-y-2">
          <Label htmlFor="photoSrcBride">URL de foto de la novia</Label>
          <Input
            id="photoSrcBride"
            type="url"
            value={formData.PhotoSrcBride}
            onChange={(e) => setFormData({ ...formData, PhotoSrcBride: e.target.value })}
            placeholder="https://example.com/julia.jpg"
          />
        </div>
      </div>

      {/* Redes sociales de la novia */}
      <div className="space-y-4 border-t border-border pt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Redes sociales de la novia</h3>
            <p className="text-sm text-muted-foreground">Gestiona las redes sociales de la novia</p>
          </div>
          <Switch
            checked={formData.isVisibleSocialMediaBride}
            onCheckedChange={(checked) => setFormData({ ...formData, isVisibleSocialMediaBride: checked })}
          />
        </div>

        {formData.isVisibleSocialMediaBride && (
          <div className="grid gap-4 md:grid-cols-2">
            {formData.SocialMediaBride.map((social, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`bride-social-${index}`}>{social.platform}</Label>
                <Input
                  id={`bride-social-${index}`}
                  type="url"
                  value={social.url}
                  onChange={(e) => {
                    const newSocialMedia = [...formData.SocialMediaBride]
                    newSocialMedia[index].url = e.target.value
                    setFormData({ ...formData, SocialMediaBride: newSocialMedia })
                  }}
                  placeholder={`https://${social.platform.toLowerCase()}.com`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Redes sociales del novio */}
      <div className="space-y-4 border-t border-border pt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Redes sociales del novio</h3>
            <p className="text-sm text-muted-foreground">Gestiona las redes sociales del novio</p>
          </div>
          <Switch
            checked={formData.isVisibleSocialMediaGroom}
            onCheckedChange={(checked) => setFormData({ ...formData, isVisibleSocialMediaGroom: checked })}
          />
        </div>

        {formData.isVisibleSocialMediaGroom && (
          <div className="grid gap-4 md:grid-cols-2">
            {formData.SocialMediaGroom.map((social, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`groom-social-${index}`}>{social.platform}</Label>
                <Input
                  id={`groom-social-${index}`}
                  type="url"
                  value={social.url}
                  onChange={(e) => {
                    const newSocialMedia = [...formData.SocialMediaGroom]
                    newSocialMedia[index].url = e.target.value
                    setFormData({ ...formData, SocialMediaGroom: newSocialMedia })
                  }}
                  placeholder={`https://${social.platform.toLowerCase()}.com`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Switch para mostrar información de los padres */}
      <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/50">
        <div className="flex-1 space-y-1">
          <Label htmlFor="isVisibleFamilyInfo" className="text-base font-medium">
            Mostrar información de los padres
          </Label>
          <p className="text-sm text-muted-foreground">
            Activa para mostrar la sección de información de los padres de los novios
          </p>
        </div>
        <Switch
          id="isVisibleFamilyInfo"
          checked={formData.isVisibleFamilyInfo}
          onCheckedChange={(checked) => setFormData({ ...formData, isVisibleFamilyInfo: checked })}
        />
      </div>

      {/* Información de los padres (condicional) */}
      {formData.isVisibleFamilyInfo && (
        <div className="space-y-8 pt-4 border-t border-border">
          {/* Familia del novio */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Familia del novio</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="groomFatherName">Nombre del padre</Label>
                <Input
                  id="groomFatherName"
                  value={formData.GroomFamily?.FaherName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      GroomFamily: {
                        ...formData.GroomFamily,
                        FaherName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groomMotherName">Nombre de la madre</Label>
                <Input
                  id="groomMotherName"
                  value={formData.GroomFamily?.MotherName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      GroomFamily: {
                        ...formData.GroomFamily,
                        MotherName: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="groomFamilyHistory">Historia de la familia</Label>
              <Textarea
                id="groomFamilyHistory"
                rows={3}
                placeholder="Cuéntanos sobre la familia del novio..."
                value={formData.GroomFamily?.FamilyHistory || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    GroomFamily: {
                      ...formData.GroomFamily,
                      FamilyHistory: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Familia de la novia */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Familia de la novia</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="brideFatherName">Nombre del padre</Label>
                <Input
                  id="brideFatherName"
                  value={formData.BrideFamily?.FaherName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      BrideFamily: {
                        ...formData.BrideFamily,
                        FaherName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brideMotherName">Nombre de la madre</Label>
                <Input
                  id="brideMotherName"
                  value={formData.BrideFamily?.MotherName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      BrideFamily: {
                        ...formData.BrideFamily,
                        MotherName: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brideFamilyHistory">Historia de la familia</Label>
              <Textarea
                id="brideFamilyHistory"
                rows={3}
                placeholder="Cuéntanos sobre la familia de la novia..."
                value={formData.BrideFamily?.FamilyHistory || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    BrideFamily: {
                      ...formData.BrideFamily,
                      FamilyHistory: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
