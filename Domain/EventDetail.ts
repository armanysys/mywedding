export interface EventBlock {
    icon?: string
    heading: string
    subheading?: string
    value: string
    mapUrl?: string | null
    InstagraUrl?: string | null
}

export interface EventDetails {
    id: string
    title: string
    intro?: string
    dateBlock: EventBlock
    timeBlock: EventBlock
    locationBlock: EventBlock
    moreInfo?: EventBlock[] | null
}
