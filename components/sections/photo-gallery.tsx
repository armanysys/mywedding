"use client"

import { Camera } from "lucide-react"
import { photosItems } from "@/lib/data/photo-Item-data"

export function PhotoGallery() {
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Galería de Fotos</h2>
            <div className="w-24 h-px bg-sage mx-auto mb-8" />

            {/* Hashtag */}
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm mb-8">
              <span className="font-medium text-lg">#JuliaYArmando2025</span>
            </div>

            <p className="text-muted-foreground mb-8 text-pretty">Comparte tus fotos usando nuestro hashtag oficial</p>

          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photosItems.map((photo) => (
              <div key={photo.id} className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Photographer Credit */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Camera className="w-5 h-5" />
              <span>Fotografía profesional por Studio Moments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
