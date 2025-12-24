"use client"

import type React from "react"
import { InitialForm } from "@/app/admin/initial-page/inital-form"

export default function InitialAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Información de los novios</h1>
          <p className="text-muted-foreground">Edita los nombres, fecha de la boda y la imagen principal</p>
        </div>
        <InitialForm />
      </div>
    </div>
  )
}
