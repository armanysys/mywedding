import { SpotifyPlaylistForm } from "@/app/admin/spotify-playlist/spotify-playlist-form"

export default function SpotifyPlaylistAdminPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Playlist de Spotify</h1>
          <p className="text-muted-foreground">Administra la lista de reproducción de la boda</p>
        </div>
        <SpotifyPlaylistForm />
      </div>
    </div>
  )
}
