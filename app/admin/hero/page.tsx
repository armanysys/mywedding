"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroForm } from "@/app/admin/hero/hero-form"

export default function HeroAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hero</h1>
          <p className="text-muted-foreground">Administra la información principal de los novios</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de los novios</CardTitle>
            <CardDescription>Edita los nombres, fecha de la boda y la imagen principal</CardDescription>
          </CardHeader>
          <CardContent>
            <HeroForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
