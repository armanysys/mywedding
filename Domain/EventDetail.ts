export interface EventBlock {
  icon: string
  heading: string
  subheading?: string
  Information: string
  mapUrl?: string
  InstagraUrl?: string
}

export interface EventDetails {
  id: string
  title: string
  isCoupleHistoryVisible: boolean
  CoupleHistory?: string
  hashtag: string[]
  countDownDateEvent: string
  Information?: EventBlock[]
}
