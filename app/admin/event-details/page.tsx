import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EventDetailsForm } from "@/app/admin/event-details/event-details-form"

export default function EventDetailsAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detalles del Evento</h1>
          <p className="text-muted-foreground">Administra la fecha, hora y lugar de la ceremonia y recepción de la boda</p>
        </div>
        <Card>
          <CardContent>
            <EventDetailsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
