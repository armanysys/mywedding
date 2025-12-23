export interface SocialMedia {
  platform: string
  url: string
}

export interface EventLocation {
  name: string
  time: string
  address: string
  mapUrl: string
  socialMedia: SocialMedia[]
}

export interface WeddingEvent {
  // Información general de la boda
  day: number
  month: number
  year: number
  hour: string

  // Ceremonia religiosa/simbólica
  ceremony: EventLocation

  // Civil
  civil: EventLocation

  // Recepción
  reception: EventLocation
}
