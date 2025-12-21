import type { EventDetails } from "@/Domain/EventDetail"

/**
 * Event Details section data source
 * Contains all information needed for the event details section including
 * date, time, location, and introductory text
 */
export const eventDetailsData: EventDetails = {
  id: "details",
  title: "Únete a Nosotros",
  intro:
    "Después de años de amor y risas, estamos listos para dar el siguiente paso. Nos encantaría que nos acompañes en este día tan especial.",
  dateBlock: {
    heading: "Fecha",
    subheading: "Domingo",
    value: "19 de Abril, 2026",
  },
  timeBlock: {
    heading: "Hora",
    subheading: "Ceremonia",
    value: "5:00 PM",
  },
  locationBlock: {
    heading: "Lugar",
    subheading: "Jardín Botánico",
    value: "Ciudad de México",
    mapUrl: "https://maps.google.com/?q=Jard%C3%ADn+Bot%C3%A1nico+Ciudad+de+M%C3%A9xico",
  },
}

export default eventDetailsData
