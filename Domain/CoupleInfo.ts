export interface Couple {
    titleInitSection: string
    GroomName: string
    BrideName: string
    CoupleHistory: string | null
    GroomFamily: Family | null
    BrideFamily: Family | null
}

export interface Family {
    FaherName: string
    MotherName: string
    FamilyHistory: string
}
