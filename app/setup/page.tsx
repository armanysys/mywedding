"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, AlertCircle } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [formData, setFormData] = useState({
    email: "armando@example.com",
    password: "Admin123!",
    firstName: "Armando",
    lastName: "Antonio",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/auth/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "super_admin",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult({
          success: true,
          message: data.message || "Usuario super_admin creado exitosamente",
        })
      } else {
        setResult({
          success: false,
          message: data.error || "Error al crear el usuario",
        })
      }
    } catch {
      setResult({
        success: false,
        message: "Error de conexión",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-rose-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-rose-500" />
          </div>
          <CardTitle className="text-2xl">Configuración Inicial</CardTitle>
          <CardDescription>Crear usuario Super Admin</CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              {result.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <div>
                <p className="font-medium">{result.success ? "Éxito" : "Error"}</p>
                <p className="text-sm">{result.message}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear Super Admin"}
              </Button>
            </form>
          )}

          {result?.success && (
            <div className="mt-4 text-center">
              <a href="/login" className="text-rose-600 hover:underline">
                Ir al Login →
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
