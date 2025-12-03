export interface Address {
    line1: string
    line2?: string
    city?: string
    postalCode?: string
}

export interface TransportOption {
    mode: string
    details: string
}

export interface HotelRecommendation {
    name: string
    details: string
    price?: string
}

export interface DressCodeColor {
    name: string
    hex?: string
}

export interface Logistics {
    title: string
    intro: string
    venue: {
        name: string
        address: Address
        mapUrl: string
        parkingInfo?: string
    }
    transport: TransportOption[]
    hotels: HotelRecommendation[]
    dressCode: {
        code: string
        details: string
        colors: DressCodeColor[]
    }
}