import type { EventDetails } from "@/Domain/EventDetail"

/**
 * Event Details section data source
 * Contains all information needed for the event details section including
 * date, time, location, and introductory text
 */
export const eventDetailsData: EventDetails = {
  id: "details",
  title: "Únete a Nosotros",
  subTitle:
    "Después de años de amor y risas, estamos listos para dar el siguiente paso. Nos encantaría que nos acompañes en este día tan especial.",
  Information: [
    {
      icon: "Calendar",
      heading: "Fecha",
      subheading: "Domingo",
      value: "19 de Abril, 2026",
    },
    {
      icon: "Church",
      heading: "Ceremonia",
      subheading: "Parroquia del Sagrado Corazón de Jesús",
      value: "4:00 PM",
      mapUrl: "https://maps.app.goo.gl/PCLQawwioYFfkeEJ6",
    },
    {
      icon: "Wine",
      heading: "Celebración",
      subheading: "Monarca Eventos",
      value: "6:00 PM",
      mapUrl: "https://maps.app.goo.gl/sJQ24JYVdJNT2bYW9",
      InstagraUrl: "https://www.instagram.com/monarcaeventossalonyjardin/",
    },
  ]
}

export default eventDetailsData
