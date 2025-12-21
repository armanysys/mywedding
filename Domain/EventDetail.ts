export interface EventBlock {
  icon?: string
  heading: string
  subheading?: string
  value: string
  mapUrl?: string
  InstagraUrl?: string
}

export interface EventDetails {
  id: string
  title: string
  subTitle: string
  Information?: EventBlock[] | null
}
