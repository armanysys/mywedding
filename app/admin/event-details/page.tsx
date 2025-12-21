import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EventDetailsForm } from "@/app/admin/event-details/event-details-form"

export default function EventDetailsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Detalles del Evento</h1>
        <p className="text-muted-foreground">Administra la fecha, hora y lugar de la boda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del evento</CardTitle>
          <CardDescription>Edita los detalles de la ceremonia y recepción</CardDescription>
        </CardHeader>
        <CardContent>
          <EventDetailsForm />
        </CardContent>
      </Card>
    </div>
  )
}
