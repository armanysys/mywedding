import { Couple } from "@/Domain/CoupleInfo";

export const coupleInfo: Couple = {
    titleInitSection: "Celebra con nosotros",
    GroomName: "Armando",
    BrideName: "Julia",
    PhotoSrcBride: "/001.jpg",
    isVisibleSocialMediaBride: false,
    SocialMediaBride: [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "Facebook", url: "https://facebook.com" }
    ],
    isVisibleSocialMediaGroom: false,
    SocialMediaGroom: [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "Facebook", url: "https://facebook.com" }
    ],
    isVisibleFamilyInfo: false,
    GroomFamily: {
        FaherName: "Carlos Antonio",
        MotherName: "Maria Gonzalez",
        FamilyHistory: "The Antonio family has a rich history of community involvement and entrepreneurship, with roots tracing back to early settlers in the region."
    },
    BrideFamily: {
        FaherName: "Miguel Lopez",
        MotherName: "Ana Martinez",
        FamilyHistory: "The Lopez family is known for their strong traditions and deep commitment to family values, having raised several generations of successful individuals."
    }
}
