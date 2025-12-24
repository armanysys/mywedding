import type { EventDetails } from "@/Domain/EventDetail"

interface RawEventDetails {
  id: string
  title: string
  isCoupleHistoryVisible: boolean
  CoupleHistory?: string
  hashtag: string[]
  countDownDateEvent: string
  isVisibleInformation: boolean
  Information?: any[]
}

export class EventDetailsMapper {
  static toDomain(raw: RawEventDetails): EventDetails {
    return {
      id: raw.id,
      title: raw.title,
      isCoupleHistoryVisible: raw.isCoupleHistoryVisible,
      CoupleHistory: raw.CoupleHistory,
      hashtag: raw.hashtag,
      countDownDateEvent: raw.countDownDateEvent,
      isVisibleInformation: raw.isVisibleInformation,
      Information: raw.Information || [],
    }
  }

  static toPersistence(domain: EventDetails): RawEventDetails {
    return {
      id: domain.id,
      title: domain.title,
      isCoupleHistoryVisible: domain.isCoupleHistoryVisible,
      CoupleHistory: domain.CoupleHistory,
      hashtag: domain.hashtag,
      countDownDateEvent: domain.countDownDateEvent,
      isVisibleInformation: domain.isVisibleInformation,
      Information: domain.Information,
    }
  }
}
