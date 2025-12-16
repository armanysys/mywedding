import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogisticsForm } from "@/components/admin/forms/logistics-form"

export default function LogisticsAdminPage() {
  return (
    <div className="space-y-6">
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
  )
}
