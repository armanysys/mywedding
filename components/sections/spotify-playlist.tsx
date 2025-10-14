import { Music, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SpotifyPlaylist() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Nuestra Playlist</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Ayúdanos a crear la banda sonora perfecta para nuestra boda. Agrega tus canciones favoritas a nuestra
              playlist de Spotify.
            </p>
          </div>

          <div className="bg-gradient-to-br from-sage/10 to-cream rounded-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-sage flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-white" />
            </div>

            <h3 className="font-serif text-2xl md:text-3xl mb-4">Lista de Reproducción de la Boda</h3>

            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Desde canciones románticas hasta tus favoritas para bailar, queremos que la música refleje a todos
              nuestros seres queridos.
            </p>

            <Button size="lg" className="bg-sage hover:bg-sage/90 text-white" asChild>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Music className="w-5 h-5" />
                Abrir en Spotify
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>

            <p className="text-sm text-muted-foreground mt-6">
              ¿No tienes Spotify? Envíanos tus sugerencias por WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
