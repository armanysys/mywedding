"use client"

import { ChevronDown } from "lucide-react"
import { Countdown } from "../countdown/countdown"
import heroData from "@/lib/data/hero-data"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/romantic-wedding-photo-.jpg" alt="Julia y Armando" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light">{heroData.subtitle}</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-balance">{heroData.title}</h1>
        <div className="w-16 h-px bg-white/60 mx-auto mb-6" />
        <p className="text-xl md:text-2xl font-light tracking-wide">{heroData.dateLabel}</p>

        {/* Countdown */}
        <Countdown targetDateISO={heroData.targetDateISO} />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
