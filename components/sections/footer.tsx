"use client"

import { useEffect, useState } from "react"
import { Heart, Instagram, Facebook, Mail } from "lucide-react"
import { getHeroDataClient } from "@/Application/services"
import type { Hero } from "@/Domain/Hero"
import { formatDateSpanish } from "@/lib/utils"

export function Footer() {
  const [footerData, setFooterData] = useState<Hero | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    async function fetchFooterData() {
      try {
        const data = await getHeroDataClient()
        setFooterData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load footer data")
      } finally {
        setLoading(false)
      }
    }

    fetchFooterData()
  }, [])

  if (loading) {
    return (
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="opacity-60">Cargando...</p>
          </div>
        </div>
      </footer>
    )
  }

  if (error || !footerData) {
    return null
  }

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Names */}
          <h3 className="font-serif text-3xl md:text-4xl mb-4">{footerData.title}</h3>
          <div className="w-16 h-px bg-background/40 mx-auto mb-6" />

          {/* Date */}
          <p className="text-lg mb-8 opacity-90">{formatDateSpanish(footerData.dateEvent)}</p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href={footerData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={footerData.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            {footerData.email?.trim() ? (
              <a
                href={`mailto:${footerData.email.trim()}`}
                className="hover:text-sage transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            ) : null}
          </div>

          {/* Hashtag */}
          <p className="text-sm opacity-75 mb-6">{footerData.hashtag}</p>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-2 text-sm opacity-60">
            <span>{footerData.endLine}</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  )
}
