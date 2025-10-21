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

export interface LogisticsData {
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

export const logisticsData: LogisticsData = {
    title: "Información Práctica",
    intro: "Todo lo que necesitas saber para disfrutar al máximo",
    venue: {
        name: "Jardín Botánico de la UNAM",
        address: {
            line1: "Av. Universidad 3000, Coyoacán",
            city: "Ciudad de México",
            postalCode: "04510",
        },
        mapUrl: "https://maps.google.com",
        parkingInfo: "Estacionamiento disponible en el lugar, entrada por Av. Universidad",
    },
    transport: [
        { mode: "Metro", details: "Línea 3, estación Universidad" },
        { mode: "Metrobús", details: "Línea 1, estación Dr. Gálvez" },
        { mode: "Uber/Taxi", details: "Disponible en la zona" },
        { mode: "Estacionamiento", details: "Estacionamiento gratuito en el lugar" },
    ],
    hotels: [
        { name: "Hotel Coyoacán", details: "A 5 min del lugar • Tarifa especial: $1,200/noche", price: "$1,200" },
        { name: "City Express Coyoacán", details: "A 10 min del lugar • Tarifa especial: $900/noche", price: "$900" },
    ],
    dressCode: {
        code: "Formal / Etiqueta",
        details: "Hombres: Traje oscuro o smoking. Mujeres: Vestido largo o cocktail elegante",
        colors: [
            { name: "Verde salvia", hex: "#9caf88" },
            { name: "Crema", hex: "#f5efe6" },
            { name: "Dorado", hex: "#d4a574" },
            { name: "Terracota", hex: "#d4a574" },
        ],
    },
}

export default logisticsData
