import { Heart, Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Names */}
          <h3 className="font-serif text-3xl md:text-4xl mb-4">Julia & Armando</h3>
          <div className="w-16 h-px bg-background/40 mx-auto mb-6" />

          {/* Date */}
          <p className="text-lg mb-8 opacity-90">15 de Junio, 2025</p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a href="mailto:julia.armando@wedding.com" className="hover:text-sage transition-colors" aria-label="Email">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* Hashtag */}
          <p className="text-sm opacity-75 mb-6">#JuliaYArmando2025</p>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-2 text-sm opacity-60">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 fill-current" />
            <span>para nuestro día especial</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
