"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    // TODO: Implementar guardado
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
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!formData) {
    return <p className="text-muted-foreground text-center py-8">Error al cargar los datos</p>
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Información básica del evento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Información del evento</CardTitle>
            <CardDescription>Datos principales y configuración general</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-medium">
                Título de la sección
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Nuestro Viaje"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subTitle" className="font-medium">
                Nuestra Historia
              </Label>
              <Textarea
                id="subTitle"
                rows={4}
                value={formData.CoupleHistory}
                onChange={(e) => setFormData({ ...formData, CoupleHistory: e.target.value })}
                placeholder="Cuéntanos vuestra historia juntos..."
                className="resize-none"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="countDownDateEvent" className="font-medium">
                  Fecha y Hora de Conteo Regresivo
                </Label>
                <Input
                  id="countDownDateEvent"
                  type="datetime-local"
                  value={formData.countDownDateEvent}
                  onChange={(e) => setFormData({ ...formData, countDownDateEvent: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashtag" className="font-medium">
                  Agregar Hashtags
                </Label>
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
                  <Button type="button" onClick={handleAddHashtag} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {formData.hashtag.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Hashtags agregados</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.hashtag.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHashtag(index)}
                        className="hover:opacity-70 transition-opacity"
                        aria-label={`Eliminar ${tag}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Información detallada del evento */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Información detallada del evento</CardTitle>
                <CardDescription>Agrega bloques con información específica</CardDescription>
              </div>
              <Switch
                checked={formData.isVisibleInformation}
                onCheckedChange={(checked) => setFormData({ ...formData, isVisibleInformation: checked })}
              />
            </div>
          </CardHeader>

          {formData.isVisibleInformation && (
            <CardContent className="space-y-4">
              <Button type="button" onClick={handleAddBlock} variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Agregar bloque de información
              </Button>

              {formData.Information && formData.Information.length > 0 ? (
                <div className="space-y-4">
                  {formData.Information.map((block, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="space-y-4 p-4">
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-4 md:items-start">
                          <div className="space-y-2">
                            <Label htmlFor={`icon-${index}`} className="text-xs font-semibold">
                              Icono
                            </Label>
                            <Select
                              value={block.icon}
                              onValueChange={(value) => handleUpdateBlock(index, "icon", value)}
                            >
                              <SelectTrigger id={`icon-${index}`} className="h-10 text-sm">
                                <SelectValue placeholder="Selecciona un icono">
                                  {block.icon && (
                                    <div className="flex items-center gap-2">
                                      {(() => {
                                        const IconComponent = iconMapping[block.icon as keyof typeof iconMapping]
                                        return IconComponent ? <IconComponent className="h-4 w-4" /> : null
                                      })()}
                                      <span className="text-sm">{block.icon}</span>
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
                            <Label htmlFor={`heading-${index}`} className="text-xs font-semibold">
                              Encabezado
                            </Label>
                            <Input
                              id={`heading-${index}`}
                              value={block.heading}
                              onChange={(e) => handleUpdateBlock(index, "heading", e.target.value)}
                              placeholder="Ej: Fecha"
                              className="h-10 text-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`subheading-${index}`} className="text-xs font-semibold">
                              Subencabezado
                            </Label>
                            <Input
                              id={`subheading-${index}`}
                              value={block.subheading || ""}
                              onChange={(e) => handleUpdateBlock(index, "subheading", e.target.value)}
                              placeholder="Información adicional"
                              className="h-10 text-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`Information-${index}`} className="text-xs font-semibold">
                              Valor
                            </Label>
                            <Input
                              id={`Information-${index}`}
                              value={block.Information}
                              onChange={(e) => handleUpdateBlock(index, "Information", e.target.value)}
                              placeholder="Contenido principal"
                              className="h-10 text-sm"
                            />
                          </div>
                        </div>

                        <div className="border-t pt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`media-visible-${index}`}
                                checked={block.isVisibleMediaUrl || false}
                                onCheckedChange={(checked) => handleUpdateBlock(index, "isVisibleMediaUrl", checked)}
                              />
                              <Label htmlFor={`media-visible-${index}`} className="font-medium text-sm cursor-pointer">
                                Mostrar URLs de medios
                              </Label>
                            </div>
                          </div>

                          {(block.isVisibleMediaUrl || (block.MediaUrl && block.MediaUrl.length > 0)) && (
                            <div className="bg-muted/50 p-4 rounded-lg space-y-3 border border-border/50">
                              {block.MediaUrl && block.MediaUrl.length > 0 ? (
                                <div className="space-y-3">
                                  {block.MediaUrl.map((media, mediaIndex) => (
                                    <div key={mediaIndex} className="flex gap-2 items-end">
                                      <div className="flex-1 space-y-1">
                                        <Select
                                          value={media.platform}
                                          onValueChange={(value) =>
                                            handleUpdateMediaUrl(index, mediaIndex, "platform", value)
                                          }
                                        >
                                          <SelectTrigger className="h-9 text-sm">
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
                                      </div>
                                      <div className="flex-1 space-y-1">
                                        <Input
                                          value={media.url}
                                          onChange={(e) =>
                                            handleUpdateMediaUrl(index, mediaIndex, "url", e.target.value)
                                          }
                                          placeholder="https://..."
                                          className="h-9 text-sm"
                                        />
                                      </div>
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveMediaUrl(index, mediaIndex)}
                                        className="h-9 px-3"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">No hay URLs de medios agregadas</p>
                              )}

                              <Button
                                type="button"
                                onClick={() => handleAddMediaUrl(index)}
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar URL de media
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveBlock(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Eliminar bloque</TooltipContent>
                          </Tooltip>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-8 text-center text-sm text-muted-foreground">
                    <p>No hay bloques de información. Haz clic en "Agregar bloque de información" para crear uno.</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          )}
        </Card>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={saving} size="lg">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar cambios
          </Button>
        </div>
      </form>
    </TooltipProvider>
  )
}
