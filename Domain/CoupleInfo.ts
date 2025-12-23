export interface Couple {
    titleInitSection: string
    GroomName: string
    BrideName: string
    CoupleHistory?: string
    isVisibleFamilyInfo: boolean
    GroomFamily?: Family
    BrideFamily?: Family
}

export interface Family {
    FaherName?: string
    MotherName?: string
    FamilyHistory?: string
}
