import type { Hero } from "@/Domain/Hero"

/**
 * HeroMapper
 * Transforma datos crudos a Domain Model Hero
 */
export class HeroMapper {
  /**
   * Transforma datos crudos a Domain Model
   */
  toDomain(raw: any): Hero {
    return {
      title: raw.title || "",
      subtitle: raw.subtitle || "",
      dateEvent: raw.dateEvent || "",
      imageSrc: raw.imageSrc || "",
      imageAlt: raw.imageAlt || "",
      detailsId: raw.detailsId || "details",
      hashtag: raw.hashtag || "",
      facebookUrl: raw.facebookUrl || "",
      instagramUrl: raw.instagramUrl || "",
      email: raw.email || null,
      endLine: raw.endLine || "",
    }
  }

  /**
   * Transforma Domain Model a formato para respuesta API
   */
  toPersistence(domain: Hero): any {
    return {
      title: domain.title,
      subtitle: domain.subtitle,
      dateEvent: domain.dateEvent,
      imageSrc: domain.imageSrc,
      imageAlt: domain.imageAlt,
      detailsId: domain.detailsId,
      hashtag: domain.hashtag,
      facebookUrl: domain.facebookUrl,
      instagramUrl: domain.instagramUrl,
      email: domain.email,
      endLine: domain.endLine,
    }
  }
}
