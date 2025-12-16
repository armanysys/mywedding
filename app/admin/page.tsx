import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Calendar, MapPin, ImageIcon, Gift, Car, Music, Users } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    title: "Hero",
    description: "Información principal de los novios",
    href: "/admin/hero",
    icon: Heart,
  },
  {
    title: "Detalles del Evento",
    description: "Fecha, hora y lugar de la boda",
    href: "/admin/event-details",
    icon: Calendar,
  },
  {
    title: "Itinerario",
    description: "Programa del día de la boda",
    href: "/admin/itinerary",
    icon: MapPin,
  },
  {
    title: "Galería de Fotos",
    description: "Imágenes de la pareja",
    href: "/admin/photo-gallery",
    icon: ImageIcon,
  },
  {
    title: "Mesa de Regalos",
    description: "Lista de regalos y registros",
    href: "/admin/gift-registry",
    icon: Gift,
  },
  {
    title: "Logística",
    description: "Hospedaje y transporte",
    href: "/admin/logistics",
    icon: Car,
  },
  {
    title: "Playlist",
    description: "Lista de reproducción de Spotify",
    href: "/admin/spotify-playlist",
    icon: Music,
  },
  {
    title: "Confirmaciones",
    description: "RSVPs y confirmaciones de asistencia",
    href: "/admin/rsvp",
    icon: Users,
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <p className="text-muted-foreground">Administra el contenido de tu página de boda</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-colors hover:bg-accent">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
