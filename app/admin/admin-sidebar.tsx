"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Heart,
  Calendar,
  MapPin,
  ImageIcon,
  Gift,
  Car,
  Music,
  Users,
  LayoutDashboard,
  Settings,
  ExternalLink,
  ChevronDown,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Información de los novios",
    href: "/admin/initial-page",
    icon: Heart,
  },
  {
    title: "Detalles del Evento",
    href: "/admin/event-details",
    icon: Calendar,
  },
  {
    title: "Itinerario",
    href: "/admin/itinerary",
    icon: MapPin,
  },
  {
    title: "Galería de Fotos",
    href: "/admin/photo-gallery",
    icon: ImageIcon,
  },
  {
    title: "Mesa de Regalos",
    href: "/admin/gift-registry",
    icon: Gift,
  },
  {
    title: "Logística",
    href: "/admin/logistics",
    icon: Car,
  },
  {
    title: "Playlist",
    href: "/admin/spotify-playlist",
    icon: Music,
  },
  {
    title: "Confirmaciones",
    href: "/admin/rsvp",
    icon: Users,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <Link href="/admin" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-semibold">Wedding Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Secciones
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ver sitio">
              <Link href="/" target="_blank">
                <ExternalLink className="h-4 w-4" />
                <span>Ver sitio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Configuración">
              <Link href="/admin/settings">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
