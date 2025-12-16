import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SpotifyPlaylistForm } from "@/components/admin/forms/spotify-playlist-form"

export default function SpotifyPlaylistAdminPage() {
  return (
    <div className="space-y-6">
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
  )
}
