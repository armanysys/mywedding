import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GiftRegistryForm } from "@/components/admin/forms/gift-registry-form"

export default function GiftRegistryAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mesa de Regalos</h1>
        <p className="text-muted-foreground">Administra la lista de regalos y registros</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registros de regalos</CardTitle>
          <CardDescription>Edita la información de la mesa de regalos</CardDescription>
        </CardHeader>
        <CardContent>
          <GiftRegistryForm />
        </CardContent>
      </Card>
    </div>
  )
}
