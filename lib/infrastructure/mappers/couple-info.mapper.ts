import type { Couple } from "@/Domain/CoupleInfo"

/**
 * CoupleInfoMapper
 * Transforma datos crudos a Domain Model Couple
 */
export class CoupleInfoMapper {
  toDomain(raw: any): Couple {
    return {
      titleInitSection: raw.titleInitSection || "",
      GroomName: raw.GroomName || "",
      BrideName: raw.BrideName || "",
      PhotoSrcBride: raw.PhotoSrcBride || "",
      isVisibleSocialMediaBride: raw.isVisibleSocialMediaBride ?? false,
      SocialMediaBride: raw.SocialMediaBride || [],
      isVisibleSocialMediaGroom: raw.isVisibleSocialMediaGroom ?? false,
      SocialMediaGroom: raw.SocialMediaGroom || [],
      isVisibleFamilyInfo: raw.isVisibleFamilyInfo ?? false,
      GroomFamily: raw.GroomFamily,
      BrideFamily: raw.BrideFamily,
    }
  }

  toPersistence(domain: Couple): any {
    return {
      titleInitSection: domain.titleInitSection,
      GroomName: domain.GroomName,
      BrideName: domain.BrideName,
      PhotoSrcBride: domain.PhotoSrcBride,
      isVisibleSocialMediaBride: domain.isVisibleSocialMediaBride,
      SocialMediaBride: domain.SocialMediaBride,
      isVisibleSocialMediaGroom: domain.isVisibleSocialMediaGroom,
      SocialMediaGroom: domain.SocialMediaGroom,
      isVisibleFamilyInfo: domain.isVisibleFamilyInfo,
      GroomFamily: domain.GroomFamily,
      BrideFamily: domain.BrideFamily,
    }
  }
}
