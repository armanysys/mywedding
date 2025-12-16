import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroForm } from "@/components/admin/forms/hero-form"

export default function HeroAdminPage() {
  return (
    <div className="space-y-6">
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
  )
}
