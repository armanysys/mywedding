import { Gift, CreditCard, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function GiftRegistry() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Mesa de Regalos</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, estas son nuestras opciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Store Registry */}
            <Card className="border-2 hover:border-sage transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-sage" />
                </div>
                <h3 className="font-serif text-2xl mb-3">Lista de Regalos</h3>
                <p className="text-muted-foreground mb-6">Encuentra nuestra lista en Liverpool y Amazon</p>
                <div className="space-y-3">
                  <Button className="w-full bg-sage hover:bg-sage/90" asChild>
                    <a href="https://liverpool.com.mx" target="_blank" rel="noopener noreferrer">
                      Ver en Liverpool
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-sage text-sage hover:bg-sage hover:text-white bg-transparent"
                    asChild
                  >
                    <a href="https://amazon.com.mx" target="_blank" rel="noopener noreferrer">
                      Ver en Amazon
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cash Gift */}
            <Card className="border-2 hover:border-sage transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-sage" />
                </div>
                <h3 className="font-serif text-2xl mb-3">Transferencia</h3>
                <p className="text-muted-foreground mb-6">Si prefieres hacer una transferencia bancaria</p>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Banco:</span> BBVA
                  </div>
                  <div>
                    <span className="font-medium">Cuenta:</span> 0123456789
                  </div>
                  <div>
                    <span className="font-medium">CLABE:</span> 012345678901234567
                  </div>
                  <div>
                    <span className="font-medium">Titular:</span> Julia García
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Note */}
          <div className="text-center bg-sage/5 p-8 rounded-lg">
            <Heart className="w-8 h-8 text-sage mx-auto mb-4" />
            <p className="text-muted-foreground italic text-pretty">
              Los regalos físicos pueden ser entregados el día del evento. Habrá un buzón especial para sobres y
              tarjetas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
