"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!formData) {
    return <p className="text-muted-foreground text-center py-8">Error al cargar los datos</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Información de los novios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Información de los novios</CardTitle>
          <CardDescription>Datos básicos de la pareja</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titleInitSection" className="font-medium">
              Título de la sección inicial
            </Label>
            <Input
              id="titleInitSection"
              value={formData.titleInitSection}
              onChange={(e) => setFormData({ ...formData, titleInitSection: e.target.value })}
              placeholder="Ej: Conoce a los novios"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="groomName" className="font-medium">
                Nombre del novio
              </Label>
              <Input
                id="groomName"
                value={formData.GroomName}
                onChange={(e) => setFormData({ ...formData, GroomName: e.target.value })}
                placeholder="Nombre completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brideName" className="font-medium">
                Nombre de la novia
              </Label>
              <Input
                id="brideName"
                value={formData.BrideName}
                onChange={(e) => setFormData({ ...formData, BrideName: e.target.value })}
                placeholder="Nombre completo"
              />
            </div>
          </div>

          {/* URL de foto de la novia */}
          <div className="space-y-2">
            <Label htmlFor="photoSrcBride" className="font-medium">
              URL de foto de la novia
            </Label>
            <Input
              id="photoSrcBride"
              type="url"
              value={formData.PhotoSrcBride}
              onChange={(e) => setFormData({ ...formData, PhotoSrcBride: e.target.value })}
              placeholder="https://ejemplo.com/foto-novia.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Redes sociales de la novia */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Redes sociales de la novia</CardTitle>
              <CardDescription>Gestiona las redes sociales de la novia</CardDescription>
            </div>
            <Switch
              checked={formData.isVisibleSocialMediaBride}
              onCheckedChange={(checked) => setFormData({ ...formData, isVisibleSocialMediaBride: checked })}
            />
          </div>
        </CardHeader>

        {formData.isVisibleSocialMediaBride && (
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {formData.SocialMediaBride.map((social, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`bride-social-${index}`} className="font-medium text-sm">
                    {social.platform}
                  </Label>
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
          </CardContent>
        )}
      </Card>

      {/* Redes sociales del novio */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Redes sociales del novio</CardTitle>
              <CardDescription>Gestiona las redes sociales del novio</CardDescription>
            </div>
            <Switch
              checked={formData.isVisibleSocialMediaGroom}
              onCheckedChange={(checked) => setFormData({ ...formData, isVisibleSocialMediaGroom: checked })}
            />
          </div>
        </CardHeader>

        {formData.isVisibleSocialMediaGroom && (
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {formData.SocialMediaGroom.map((social, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`groom-social-${index}`} className="font-medium text-sm">
                    {social.platform}
                  </Label>
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
          </CardContent>
        )}
      </Card>

      {/* Switch para mostrar información de los padres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="isVisibleFamilyInfo" className="text-base font-semibold">
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
        </CardContent>
      </Card>

      {/* Información de los padres (condicional) */}
      {formData.isVisibleFamilyInfo && (
        <div className="space-y-6">
          {/* Familia del novio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Familia del novio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="groomFatherName" className="font-medium">
                    Nombre del padre
                  </Label>
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
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groomMotherName" className="font-medium">
                    Nombre de la madre
                  </Label>
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
                    placeholder="Nombre completo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="groomFamilyHistory" className="font-medium">
                  Historia de la familia
                </Label>
                <Textarea
                  id="groomFamilyHistory"
                  rows={4}
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
            </CardContent>
          </Card>

          {/* Familia de la novia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Familia de la novia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="brideFatherName" className="font-medium">
                    Nombre del padre
                  </Label>
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
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brideMotherName" className="font-medium">
                    Nombre de la madre
                  </Label>
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
                    placeholder="Nombre completo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brideFamilyHistory" className="font-medium">
                  Historia de la familia
                </Label>
                <Textarea
                  id="brideFamilyHistory"
                  rows={4}
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
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={saving} size="lg">
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar cambios
        </Button>
      </div>
    </form>
  )
}
