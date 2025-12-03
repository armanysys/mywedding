export interface EventBlock {
    icon?: string
    heading: string
    subheading?: string
    value: string
    extra?: string
}

export interface EventDetails {
    id: string
    title: string
    intro?: string
    dateBlock: EventBlock
    timeBlock: EventBlock
    locationBlock: EventBlock & { mapUrl?: string }
}
