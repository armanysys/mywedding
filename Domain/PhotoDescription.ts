export interface PhotoDescriptio {
    title: string
    hastag: string
    description: string
    photographer?: string
    photoItems: PhotoItem[]
}

export interface PhotoItem {
    id: number
    src: string
    alt: string
    caption?: string
}
