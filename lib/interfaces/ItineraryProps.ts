export interface ItineraryProps {
    Title: string
    Description: string,
    ScheduleItem: ScheduleItem[]
}

export interface ScheduleItem {
    time: string
    title: string
    description: string
    icon: string
}
