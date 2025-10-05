import { Hero } from "@/components/hero"
import { EventDetails } from "@/components/event-details"
import { Itinerary } from "@/components/itinerary"
import { PhotoGallery } from "@/components/photo-gallery"
import { GiftRegistry } from "@/components/gift-registry"
import { Logistics } from "@/components/logistics"
import { SpotifyPlaylist } from "@/components/spotify-playlist"
import { RsvpForm } from "@/components/rsvp-form"
import { Footer } from "@/components/footer"

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
