import { Hero } from "@/components/sections/hero"
import { EventDetails } from "@/components/sections/event-details"
import { Itinerary } from "@/components/sections/itinerary"
import { PhotoGallery } from "@/components/sections/photo-gallery"
import { GiftRegistry } from "@/components/sections/gift-registry"
import { Logistics } from "@/components/sections/logistics"
import { SpotifyPlaylist } from "@/components/sections/spotify-playlist"
import { RsvpForm } from "@/components/sections/rsvp-form"
import { Footer } from "@/components/sections/footer"

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <EventDetails />
      <Itinerary />
      <PhotoGallery />
      <GiftRegistry />
      <Logistics />
      <SpotifyPlaylist />
      <RsvpForm />
      <Footer />
    </main>
  )
}
