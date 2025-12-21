import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogisticsForm } from "@/app/admin/logistics/logistics-form"

export default function LogisticsAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logística</h1>
          <p className="text-muted-foreground">Administra la información de hospedaje y transporte</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información logística</CardTitle>
            <CardDescription>Edita los detalles de hospedaje, transporte y recomendaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <LogisticsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
