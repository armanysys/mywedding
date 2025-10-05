import { Car, Hotel, Shirt, Navigation } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Logistics() {
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Información Práctica</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Todo lo que necesitas saber para disfrutar al máximo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* How to Get There */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Cómo Llegar</h3>
                    <p className="text-muted-foreground mb-4">
                      Jardín Botánico de la UNAM
                      <br />
                      Av. Universidad 3000, Coyoacán
                      <br />
                      Ciudad de México, 04510
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-sage text-sage hover:bg-sage hover:text-white bg-transparent"
                      asChild
                    >
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                        Abrir en Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Estacionamiento:</strong> Disponible en el lugar, entrada por Av. Universidad
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Parking */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Transporte</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Metro: Línea 3, estación Universidad</li>
                      <li>• Metrobús: Línea 1, estación Dr. Gálvez</li>
                      <li>• Uber/Taxi: Disponible en la zona</li>
                      <li>• Estacionamiento gratuito en el lugar</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accommodation */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Hotel className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Alojamiento</h3>
                    <p className="text-muted-foreground mb-4">Hoteles recomendados cerca del lugar</p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium">Hotel Coyoacán</p>
                        <p className="text-muted-foreground">A 5 min del lugar • Tarifa especial: $1,200/noche</p>
                      </div>
                      <div>
                        <p className="font-medium">City Express Coyoacán</p>
                        <p className="text-muted-foreground">A 10 min del lugar • Tarifa especial: $900/noche</p>
                      </div>
                      <p className="text-xs text-muted-foreground italic mt-4">
                        Menciona "Boda Julia & Armando" para obtener la tarifa especial
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dress Code */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Shirt className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Código de Vestimenta</h3>
                    <p className="text-muted-foreground mb-4">Formal / Etiqueta</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Hombres:</strong> Traje oscuro o smoking
                      </p>
                      <p>
                        <strong>Mujeres:</strong> Vestido largo o cocktail elegante
                      </p>
                      <div className="mt-4 pt-4 border-t">
                        <p className="font-medium mb-2">Paleta de colores sugerida:</p>
                        <div className="flex gap-2">
                          <div
                            className="w-10 h-10 rounded-full bg-sage border-2 border-white shadow-sm"
                            title="Verde salvia"
                          />
                          <div
                            className="w-10 h-10 rounded-full bg-cream border-2 border-white shadow-sm"
                            title="Crema"
                          />
                          <div
                            className="w-10 h-10 rounded-full bg-gold border-2 border-white shadow-sm"
                            title="Dorado"
                          />
                          <div
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: "#d4a574" }}
                            title="Terracota"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Por favor evita el blanco</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
