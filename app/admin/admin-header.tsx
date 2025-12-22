"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

const sectionNames: Record<string, string> = {
  admin: "Dashboard",
  "initial-page": "Información de los novios",
  "event-details": "Detalles del Evento",
  itinerary: "Itinerario",
  "photo-gallery": "Galería de Fotos",
  "gift-registry": "Mesa de Regalos",
  logistics: "Logística",
  "spotify-playlist": "Playlist",
  rsvp: "Confirmaciones",
  settings: "Configuración",
}

export function AdminHeader() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const currentSection = segments[segments.length - 1]
  const sectionName = sectionNames[currentSection] || currentSection

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          {currentSection !== "admin" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{sectionName}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
