import { SocialMedia } from "./SocialMedia"

export interface Couple {
    titleInitSection: string
    GroomName: string
    BrideName: string
    PhotoSrcBride: string
    isVisibleSocialMediaBride: boolean
    SocialMediaBride: SocialMedia[]
    isVisibleSocialMediaGroom: boolean
    SocialMediaGroom: SocialMedia[]
    isVisibleFamilyInfo: boolean
    GroomFamily?: Family
    BrideFamily?: Family
}

export interface Family {
    FaherName?: string
    MotherName?: string
    FamilyHistory?: string
}
