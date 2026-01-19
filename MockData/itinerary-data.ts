import 'server-only'

import type { ItineraryProps } from "@/Domain/ItineraryProps"

/**
 * Itinerary section data source
 * Contains all schedule information for the wedding day including
 * ceremony, reception, and celebration timeline
 */
export const itineraryData: ItineraryProps = {
  Title: "Itinerario del Día",
  Description: "Un día lleno de amor, alegría y celebración",
  ScheduleItem: [
    {
      time: "5:00 PM",
      title: "Ceremonia",
      description: "Intercambio de votos en el jardín principal",
      icon: "Church",
    },
    {
      time: "6:00 PM",
      title: "Cóctel de Bienvenida",
      description: "Bebidas y canapés en la terraza",
      icon: "Utensils",
    },
    {
      time: "7:00 PM",
      title: "Recepción",
      description: "Cena de tres tiempos con menú internacional",
      icon: "Utensils",
    },
    {
      time: "9:00 PM",
      title: "Primer Baile",
      description: "Apertura de pista con los novios",
      icon: "Music",
    },
    {
      time: "9:30 PM",
      title: "Fiesta",
      description: "Baile, música en vivo y DJ",
      icon: "Music",
    },
    {
      time: "11:00 PM",
      title: "Pastel",
      description: "Corte del pastel y brindis",
      icon: "Cake",
    },
  ],
}

export default itineraryData
