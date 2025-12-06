import { Gift, CreditCard, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import giftRegistryData, { mesasRegalos, transferDetails } from "@/lib/data/gift-registry.data"

export function GiftRegistry() {
  const { title, intro, note } = giftRegistryData

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{title}</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Store Registry */}
            {mesasRegalos.map((item) => (
              <Card key={item.id} className="border-2 hover:border-sage transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">{item.name}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-sage text-sage hover:bg-sage hover:text-white bg-transparent"
                      asChild
                    >
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        Ver en {item.name}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Cash Gift - Now iterates over transferDetails array to support multiple bank accounts */}
            {transferDetails.map((transfer, index) => (
              <Card key={index} className="border-2 hover:border-sage transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">Transferencia</h3>
                  <p className="text-muted-foreground mb-6">Si prefieres hacer una transferencia bancaria</p>
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Banco:</span> {transfer.bank}
                    </div>
                    <div>
                      <span className="font-medium">Cuenta:</span> {transfer.account}
                    </div>
                    <div>
                      <span className="font-medium">CLABE:</span> {transfer.clabe}
                    </div>
                    <div>
                      <span className="font-medium">Titular:</span> {transfer.holder}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Note */}
          <div className="text-center bg-sage/5 p-8 rounded-lg">
            <Heart className="w-8 h-8 text-sage mx-auto mb-4" />
            <p className="text-muted-foreground italic text-pretty">{note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
