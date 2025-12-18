export interface GiftRegistry {
    id: string
    codigo: string
    name: string
    url: string
    description?: string
}

export interface TransferAccount {
    bank: string
    account: string
    clabe: string
    holder: string
}

export interface GiftDescription {
    title: string
    intro: string
    note: string
    giftRegistry: GiftRegistry[]
    transferAccounts: TransferAccount[]
}
