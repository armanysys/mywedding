import type { GiftDescription } from "@/Domain/GiftRegistry"

/**
 * GiftRegistryMapper
 * Transforma datos crudos a Domain Model GiftDescription
 */
export class GiftRegistryMapper {
  toDomain(raw: any): GiftDescription {
    return {
      title: raw.title || "",
      intro: raw.intro || "",
      note: raw.note || "",
      giftRegistry: raw.giftRegistry || [],
      transferAccounts: raw.transferAccounts || [],
    }
  }

  toPersistence(domain: GiftDescription): any {
    return {
      title: domain.title,
      intro: domain.intro,
      note: domain.note,
      giftRegistry: domain.giftRegistry,
      transferAccounts: domain.transferAccounts,
    }
  }
}
