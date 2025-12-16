import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RsvpForm } from "@/components/admin/forms/rsvp-form"

export default function RsvpAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Confirmaciones</h1>
        <p className="text-muted-foreground">Administra el formulario de confirmación de asistencia</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de RSVP</CardTitle>
          <CardDescription>Edita los textos y opciones del formulario de confirmación</CardDescription>
        </CardHeader>
        <CardContent>
          <RsvpForm />
        </CardContent>
      </Card>
    </div>
  )
}
