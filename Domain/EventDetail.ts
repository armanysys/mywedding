import { SocialMedia } from "./SocialMedia"

export interface EventBlock {
  icon: string
  heading: string
  subheading?: string
  Information: string
  isVisibleMediaUrl?: boolean
  MediaUrl?: SocialMedia[]
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
