import { ItineraryForm } from "@/app/admin/itinerary/itinerary-form"

export default function ItineraryAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Itinerario</h1>
          <p className="text-muted-foreground">Edita las actividades y horarios del día de la boda</p>
        </div>
        <ItineraryForm />
      </div>
    </div>
  )
}
