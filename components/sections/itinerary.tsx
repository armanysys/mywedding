import { scheduleItem } from "@/lib/data/schedule-item-data"
import { itineraryProps } from "@/lib/data/itinerary-props-data"
import { iconMap } from "@/lib/data/icon-map"

export function Itinerary() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{itineraryProps.Title}</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{itineraryProps.Description}</p>
          </div>

          <div className="space-y-8">
            {scheduleItem.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              return (
                <div key={index} className="flex gap-6 items-start group hover:translate-x-2 transition-transform">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-sage group-hover:text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-4 mb-2">
                      <span className="text-sm font-medium text-sage">{item.time}</span>
                      <h3 className="font-serif text-xl md:text-2xl">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
