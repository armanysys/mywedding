"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { LogOut, User, Shield, Mail } from "lucide-react"

interface UserProfile {
  user: {
    id: string
    email: string
  }
  profile: {
    role: string
    first_name: string | null
    last_name: string | null
  } | null
}

const roleLabels: Record<string, string> = {
  super_admin: "Super Administrador",
  novio: "Novio/a",
  planeadora: "Planeadora",
  invitado: "Invitado",
}

const roleColors: Record<string, string> = {
  super_admin: "bg-red-500/10 text-red-500",
  novio: "bg-primary/10 text-primary",
  planeadora: "bg-blue-500/10 text-blue-500",
  invitado: "bg-muted text-muted-foreground",
}

export default function SettingsPage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me")
        const data = await response.json()

        if (data.authenticated) {
          setUserProfile({
            user: data.user,
            profile: data.profile,
          })
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Error logging out:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra tu cuenta y preferencias del sistema.</p>
      </div>

      <Separator />

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información de la Cuenta
          </CardTitle>
          <CardDescription>Detalles de tu cuenta y rol en el sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userProfile ? (
            <>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userProfile.user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Rol:</span>
                {userProfile.profile ? (
                  <Badge className={roleColors[userProfile.profile.role] || ""}>
                    {roleLabels[userProfile.profile.role] || userProfile.profile.role}
                  </Badge>
                ) : (
                  <Badge variant="outline">Sin asignar</Badge>
                )}
              </div>

              {userProfile.profile?.first_name && (
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {userProfile.profile.first_name} {userProfile.profile.last_name}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No se pudo cargar la información del usuario.</p>
          )}
        </CardContent>
      </Card>

      {/* Logout Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </CardTitle>
          <CardDescription>Cierra tu sesión actual y vuelve a la página de inicio.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-destructive-foreground border-t-transparent rounded-full animate-spin" />
                Cerrando sesión...
              </span>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
