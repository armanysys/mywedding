import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ItineraryForm } from "@/app/admin/itinerary/itinerary-form"

export default function ItineraryAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
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
    </div>
  )
}
