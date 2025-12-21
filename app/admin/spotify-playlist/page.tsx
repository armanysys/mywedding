import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SpotifyPlaylistForm } from "@/components/admin/forms/spotify-playlist-form"

export default function SpotifyPlaylistAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Playlist de Spotify</h1>
          <p className="text-muted-foreground">Administra la lista de reproducción de la boda</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Spotify</CardTitle>
            <CardDescription>Edita el enlace de la playlist de Spotify</CardDescription>
          </CardHeader>
          <CardContent>
            <SpotifyPlaylistForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
