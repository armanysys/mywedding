import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ItineraryForm } from "@/components/admin/forms/itinerary-form"

export default function ItineraryAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Itinerario</h1>
        <p className="text-muted-foreground">Administra el programa del día de la boda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programa del evento</CardTitle>
          <CardDescription>Edita las actividades y horarios del día</CardDescription>
        </CardHeader>
        <CardContent>
          <ItineraryForm />
        </CardContent>
      </Card>
    </div>
  )
}
