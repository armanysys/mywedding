import { EventDetailsData } from "../interfaces/EventDetailsData"

export const eventDetailsData: EventDetailsData = {
    id: "details",
    title: "Únete a Nosotros",
    intro:
        "Después de años de amor y risas, estamos listos para dar el siguiente paso. Nos encantaría que nos acompañes en este día tan especial.",
    dateBlock: {
        heading: "Fecha",
        subheading: "Domingo",
        value: "15 de Junio, 2025",
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
        extra: "",
        mapUrl: "https://maps.google.com/?q=Jard%C3%ADn+Bot%C3%A1nico+Ciudad+de+M%C3%A9xico",
    },
}

export default eventDetailsData
