import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhotoGalleryForm } from "@/components/admin/forms/photo-gallery-form"

export default function PhotoGalleryAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Galería de Fotos</h1>
        <p className="text-muted-foreground">Administra las imágenes de la pareja</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Imágenes</CardTitle>
          <CardDescription>Agrega, edita o elimina fotos de la galería</CardDescription>
        </CardHeader>
        <CardContent>
          <PhotoGalleryForm />
        </CardContent>
      </Card>
    </div>
  )
}
