export interface RegistryItem {
    id: string
    codigo: string
    name: string
    url: string
    description?: string
}

export interface TransferDetails {
    bank: string
    account: string
    clabe: string
    holder: string
}

export interface GiftRegistryData {
    title: string
    intro: string
    note: string
}
