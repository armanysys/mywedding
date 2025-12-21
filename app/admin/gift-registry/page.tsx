import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GiftRegistryForm } from "@/components/admin/forms/gift-registry-form"

export default function GiftRegistryAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
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
    </div>
  )
}
