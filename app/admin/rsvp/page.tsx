import { RsvpForm } from "@/app/admin/rsvp/rsvp-form"

export default function RsvpAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Confirmaciones</h1>
          <p className="text-muted-foreground">Administra el formulario de confirmación de asistencia</p>
        </div>
        <RsvpForm />
      </div>
    </div>
  )
}
