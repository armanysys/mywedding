import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EventDetails() {
  return (
    <section id="details" className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">Únete a Nosotros</h2>
          <div className="w-24 h-px bg-sage mx-auto mb-12" />

          <p className="text-lg md:text-xl text-muted-foreground mb-16 leading-relaxed max-w-2xl mx-auto text-pretty">
            Después de años de amor y risas, estamos listos para dar el siguiente paso. Nos encantaría que nos acompañes
            en este día tan especial.
          </p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Date */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl mb-2">Fecha</h3>
              <p className="text-muted-foreground">Domingo</p>
              <p className="text-lg font-medium">15 de Junio, 2025</p>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl mb-2">Hora</h3>
              <p className="text-muted-foreground">Ceremonia</p>
              <p className="text-lg font-medium">5:00 PM</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-xl mb-2">Lugar</h3>
              <p className="text-muted-foreground">Jardín Botánico</p>
              <p className="text-lg font-medium mb-3">Ciudad de México</p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://maps.google.com/?q=Jardín+Botánico+Ciudad+de+México"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage border-sage hover:bg-sage hover:text-white"
                >
                  Ver en Mapa
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
