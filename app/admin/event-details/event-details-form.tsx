"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { getEventDetailsDataClient } from "@/lib/services/event-details.service"
import type { EventDetails, EventBlock } from "@/Domain/EventDetail"
import type { SocialMedia } from "@/Domain/SocialMedia"
import { Loader2, Plus, Trash2, X } from "lucide-react"
import { iconMapping } from "@/Domain/IconMaping"
import { Textarea } from "@/components/ui/textarea"

export function EventDetailsForm() {
  const [formData, setFormData] = useState<EventDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hashtagInput, setHashtagInput] = useState("")

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
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    alert("Datos guardados correctamente")
  }

  const handleAddBlock = () => {
    if (!formData) return

    const newBlock: EventBlock = {
      icon: "",
      heading: "",
      Information: "",
      subheading: "",
      isVisibleMediaUrl: false,
      MediaUrl: [],
    }

    const updatedInformation = [...(formData.Information || []), newBlock]
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleRemoveBlock = (index: number) => {
    if (!formData || !formData.Information) return

    const updatedInformation = formData.Information.filter((_, i) => i !== index)
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleUpdateBlock = (index: number, field: keyof EventBlock, value: string | boolean) => {
    if (!formData || !formData.Information) return

    const updatedInformation = formData.Information.map((block, i) =>
      i === index ? { ...block, [field]: value } : block,
    )
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleAddMediaUrl = (blockIndex: number) => {
    if (!formData || !formData.Information) return

    const updatedInformation = formData.Information.map((block, i) => {
      if (i === blockIndex) {
        return {
          ...block,
          MediaUrl: [...(block.MediaUrl || []), { platform: "", url: "" }],
        }
      }
      return block
    })
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleRemoveMediaUrl = (blockIndex: number, mediaIndex: number) => {
    if (!formData || !formData.Information) return

    const updatedInformation = formData.Information.map((block, i) => {
      if (i === blockIndex) {
        return {
          ...block,
          MediaUrl: (block.MediaUrl || []).filter((_, idx) => idx !== mediaIndex),
        }
      }
      return block
    })
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleUpdateMediaUrl = (blockIndex: number, mediaIndex: number, field: keyof SocialMedia, value: string) => {
    if (!formData || !formData.Information) return

    const updatedInformation = formData.Information.map((block, i) => {
      if (i === blockIndex) {
        return {
          ...block,
          MediaUrl: (block.MediaUrl || []).map((media, idx) =>
            idx === mediaIndex ? { ...media, [field]: value } : media,
          ),
        }
      }
      return block
    })
    setFormData({ ...formData, Information: updatedInformation })
  }

  const handleAddHashtag = () => {
    if (!formData || !hashtagInput.trim()) return
    const hashtag = hashtagInput.startsWith("#") ? hashtagInput : `#${hashtagInput}`
    setFormData({ ...formData, hashtag: [...formData.hashtag, hashtag] })
    setHashtagInput("")
  }

  const handleRemoveHashtag = (index: number) => {
    if (!formData) return
    const updatedHashtags = formData.hashtag.filter((_, i) => i !== index)
    setFormData({ ...formData, hashtag: updatedHashtags })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Error al cargar los datos</p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección: Información General */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la sección</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subTitle">Nuestra Historia</Label>
              <Textarea
                id="subTitle"
                rows={4}
                value={formData.CoupleHistory}
                onChange={(e) => setFormData({ ...formData, CoupleHistory: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="countDownDateEvent">Fecha y Hora de Conteo Regresivo</Label>
                <Input
                  id="countDownDateEvent"
                  type="datetime-local"
                  value={formData.countDownDateEvent}
                  onChange={(e) => setFormData({ ...formData, countDownDateEvent: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashtag">Hashtags</Label>
                <div className="flex gap-2">
                  <Input
                    id="hashtag"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    placeholder="Ej: #JuliaYArmando2026"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddHashtag()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddHashtag}
                    variant="outline"
                    size="icon"
                    className="shrink-0 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.hashtag.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.hashtag.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveHashtag(index)}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Información del Evento */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">Información del Evento</CardTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isVisibleInformation"
                    checked={formData.isVisibleInformation}
                    onCheckedChange={(checked) => setFormData({ ...formData, isVisibleInformation: checked })}
                  />
                  <Label htmlFor="isVisibleInformation" className="text-sm cursor-pointer">
                    Mostrar sección
                  </Label>
                </div>
              </div>
            </div>
          </CardHeader>

          {formData.isVisibleInformation && (
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button type="button" onClick={handleAddBlock} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar bloque
                </Button>
              </div>

              {formData.Information && formData.Information.length > 0 ? (
                <div className="space-y-4">
                  {formData.Information.map((block, index) => (
                    <Card key={index} className="border-dashed">
                      <CardContent className="pt-4 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor={`icon-${index}`} className="text-sm">
                              Icono
                            </Label>
                            <Select
                              value={block.icon}
                              onValueChange={(value) => handleUpdateBlock(index, "icon", value)}
                            >
                              <SelectTrigger id={`icon-${index}`}>
                                <SelectValue placeholder="Selecciona un icono">
                                  {block.icon && (
                                    <div className="flex items-center gap-2">
                                      {(() => {
                                        const IconComponent = iconMapping[block.icon as keyof typeof iconMapping]
                                        return IconComponent ? <IconComponent className="h-4 w-4" /> : null
                                      })()}
                                      <span>{block.icon}</span>
                                    </div>
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(iconMapping).map((iconName) => {
                                  const IconComponent = iconMapping[iconName as keyof typeof iconMapping]
                                  return (
                                    <SelectItem key={iconName} value={iconName}>
                                      <div className="flex items-center gap-2">
                                        <IconComponent className="h-4 w-4" />
                                        <span>{iconName}</span>
                                      </div>
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`heading-${index}`} className="text-sm">
                              Encabezado
                            </Label>
                            <Input
                              id={`heading-${index}`}
                              value={block.heading}
                              onChange={(e) => handleUpdateBlock(index, "heading", e.target.value)}
                              placeholder="Ej: Fecha, Hora, Ubicación"
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                            <Label htmlFor={`subheading-${index}`} className="text-sm">
                              Subencabezado (opcional)
                            </Label>
                            <Input
                              id={`subheading-${index}`}
                              value={block.subheading || ""}
                              onChange={(e) => handleUpdateBlock(index, "subheading", e.target.value)}
                              placeholder="Información adicional"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`Information-${index}`} className="text-sm">
                            Valor
                          </Label>
                          <Input
                            id={`Information-${index}`}
                            value={block.Information}
                            onChange={(e) => handleUpdateBlock(index, "Information", e.target.value)}
                            placeholder="Contenido principal"
                          />
                        </div>

                        {/* Media URLs Section */}
                        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`media-switch-${index}`}
                                checked={block.isVisibleMediaUrl || false}
                                onCheckedChange={(checked) => handleUpdateBlock(index, "isVisibleMediaUrl", checked)}
                              />
                              <Label htmlFor={`media-switch-${index}`} className="text-sm cursor-pointer">
                                URLs de medios
                              </Label>
                            </div>
                            {block.isVisibleMediaUrl && (
                              <Button
                                type="button"
                                onClick={() => handleAddMediaUrl(index)}
                                variant="outline"
                                size="sm"
                              >
                                <Plus className="mr-1 h-3.5 w-3.5" />
                                Agregar
                              </Button>
                            )}
                          </div>

                          {block.isVisibleMediaUrl && block.MediaUrl && block.MediaUrl.length > 0 && (
                            <div className="space-y-2">
                              {block.MediaUrl.map((media, mediaIndex) => (
                                <div key={mediaIndex} className="flex gap-2 items-center">
                                  <Select
                                    value={media.platform}
                                    onValueChange={(value) =>
                                      handleUpdateMediaUrl(index, mediaIndex, "platform", value)
                                    }
                                  >
                                    <SelectTrigger className="w-32 shrink-0">
                                      <SelectValue placeholder="Plataforma">
                                        {media.platform && (
                                          <div className="flex items-center gap-2">
                                            {(() => {
                                              const IconComponent =
                                                iconMapping[media.platform as keyof typeof iconMapping]
                                              return IconComponent ? <IconComponent className="h-4 w-4" /> : null
                                            })()}
                                            <span className="text-sm">{media.platform}</span>
                                          </div>
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {["Map", "Instagram", "Facebook"].map((platform) => {
                                        const IconComponent = iconMapping[platform as keyof typeof iconMapping]
                                        return (
                                          <SelectItem key={platform} value={platform}>
                                            <div className="flex items-center gap-2">
                                              {IconComponent && <IconComponent className="h-4 w-4" />}
                                              <span>{platform}</span>
                                            </div>
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    value={media.url}
                                    onChange={(e) => handleUpdateMediaUrl(index, mediaIndex, "url", e.target.value)}
                                    placeholder="https://..."
                                    className="flex-1"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveMediaUrl(index, mediaIndex)}
                                    className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}

                          {block.isVisibleMediaUrl && (!block.MediaUrl || block.MediaUrl.length === 0) && (
                            <p className="text-sm text-muted-foreground text-center py-2">
                              No hay URLs de medios. Haz clic en "Agregar" para crear una.
                            </p>
                          )}
                        </div>

                        <div className="flex justify-end pt-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveBlock(index)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar bloque
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Eliminar este bloque</TooltipContent>
                          </Tooltip>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No hay bloques de información. Haz clic en "Agregar bloque" para crear uno.
                  </p>
                </div>
              )}
            </CardContent>
          )}
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={saving} size="lg">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar cambios
          </Button>
        </div>
      </form>
    </TooltipProvider>
  )
}
