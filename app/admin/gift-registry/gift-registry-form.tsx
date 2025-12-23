"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getGiftDescriptionDataClient } from "@/lib/services/gift-registry.service"
import type { GiftDescription, GiftRegistry, TransferAccount } from "@/Domain/GiftRegistry"
import { Loader2, Trash2 } from "lucide-react"

export function GiftRegistryForm() {
  const [formData, setFormData] = useState<GiftDescription | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getGiftDescriptionDataClient()
        setFormData(data)
      } catch (error) {
        console.error("Error loading gift registry:", error)
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

  const addGiftRegistry = () => {
    if (!formData) return
    const newRegistry: GiftRegistry = {
      id: Date.now().toString(),
      codigo: "",
      name: "",
      url: "",
      description: "",
    }
    setFormData({
      ...formData,
      giftRegistry: [...formData.giftRegistry, newRegistry],
    })
  }

  const updateGiftRegistry = (index: number, field: keyof GiftRegistry, value: string) => {
    if (!formData) return
    const updated = [...formData.giftRegistry]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, giftRegistry: updated })
  }

  const removeGiftRegistry = (index: number) => {
    if (!formData) return
    setFormData({
      ...formData,
      giftRegistry: formData.giftRegistry.filter((_, i) => i !== index),
    })
  }

  const addTransferAccount = () => {
    if (!formData) return
    const newAccount: TransferAccount = {
      bank: "",
      account: "",
      clabe: "",
      holder: "",
    }
    setFormData({
      ...formData,
      transferAccounts: [...formData.transferAccounts, newAccount],
    })
  }

  const updateTransferAccount = (index: number, field: keyof TransferAccount, value: string) => {
    if (!formData) return
    const updated = [...formData.transferAccounts]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, transferAccounts: updated })
  }

  const removeTransferAccount = (index: number) => {
    if (!formData) return
    setFormData({
      ...formData,
      transferAccounts: formData.transferAccounts.filter((_, i) => i !== index),
    })
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

      <div className="space-y-2">
        <Label htmlFor="intro">Introducción</Label>
        <Textarea
          id="intro"
          value={formData.intro}
          onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Nota</Label>
        <Textarea
          id="note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Tiendas de Regalos</h3>
          <Button type="button" variant="outline" size="sm" onClick={addGiftRegistry}>
            + Agregar Tienda
          </Button>
        </div>

        <div className="space-y-3">
          {formData.giftRegistry.map((registry, index) => (
            <Card key={registry.id} className="overflow-hidden">
              <CardContent className="pt-3 px-3 pb-3">
                <div className="space-y-3">
                  {/* First row: Código, Nombre, URL, Remove button */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`registry-codigo-${index}`} className="text-xs">
                        Código
                      </Label>
                      <Input
                        id={`registry-codigo-${index}`}
                        placeholder="Código"
                        value={registry.codigo}
                        onChange={(e) => updateGiftRegistry(index, "codigo", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`registry-name-${index}`} className="text-xs">
                        Nombre
                      </Label>
                      <Input
                        id={`registry-name-${index}`}
                        placeholder="Ej: Liverpool"
                        value={registry.name}
                        onChange={(e) => updateGiftRegistry(index, "name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`registry-url-${index}`} className="text-xs">
                        URL
                      </Label>
                      <Input
                        id={`registry-url-${index}`}
                        placeholder="https://example.com"
                        value={registry.url}
                        onChange={(e) => updateGiftRegistry(index, "url", e.target.value)}
                      />
                    </div>

                    <div className="flex items-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeGiftRegistry(index)}
                              className="w-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Eliminar</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Second row: Description */}
                  <div className="space-y-1">
                    <Label htmlFor={`registry-desc-${index}`} className="text-xs">
                      Descripción
                    </Label>
                    <Textarea
                      id={`registry-desc-${index}`}
                      placeholder="Descripción de la tienda"
                      value={registry.description || ""}
                      onChange={(e) => updateGiftRegistry(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Cuentas de Transferencia</h3>
          <Button type="button" variant="outline" size="sm" onClick={addTransferAccount}>
            + Agregar Cuenta
          </Button>
        </div>

        <div className="space-y-3">
          {formData.transferAccounts.map((account, index) => (
            <Card key={`${account.bank}-${index}`} className="overflow-hidden">
              <CardContent className="pt-3 px-3 pb-3">
                <div className="space-y-3">
                  {/* First row: Banco, Cuenta, CLABE, Remove button */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`account-bank-${index}`} className="text-xs">
                        Banco
                      </Label>
                      <Input
                        id={`account-bank-${index}`}
                        placeholder="Ej: BBVA"
                        value={account.bank}
                        onChange={(e) => updateTransferAccount(index, "bank", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`account-number-${index}`} className="text-xs">
                        Cuenta
                      </Label>
                      <Input
                        id={`account-number-${index}`}
                        placeholder="Número de cuenta"
                        value={account.account}
                        onChange={(e) => updateTransferAccount(index, "account", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`account-clabe-${index}`} className="text-xs">
                        CLABE
                      </Label>
                      <Input
                        id={`account-clabe-${index}`}
                        placeholder="CLABE interbancaria"
                        value={account.clabe}
                        onChange={(e) => updateTransferAccount(index, "clabe", e.target.value)}
                      />
                    </div>

                    <div className="flex items-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeTransferAccount(index)}
                              className="w-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Eliminar</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Second row: Titular */}
                  <div className="space-y-1">
                    <Label htmlFor={`account-holder-${index}`} className="text-xs">
                      Titular de la Cuenta
                    </Label>
                    <Input
                      id={`account-holder-${index}`}
                      placeholder="Nombre del titular"
                      value={account.holder}
                      onChange={(e) => updateTransferAccount(index, "holder", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
