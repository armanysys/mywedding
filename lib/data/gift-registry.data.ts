import type { GiftDescription, GiftRegistry, TransferAccount } from "../interfaces/GiftRegistry"

export const giftDescription: GiftDescription = {
  title: "Mesa de Regalos",
  intro: "Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, estas son nuestras opciones",
  note: "Los regalos físicos pueden ser entregados el día del evento. Habrá un buzón especial para sobres y tarjetas.",
  giftRegistry: [
    {
      id: "001",
      codigo: "CODIGO",
      name: "Liverpool",
      url: "https://liverpool.com.mx",
      description: "Encuentra nuestra lista en Liverpool",
    },
    {
      id: "002",
      codigo: "CODIGO",
      name: "Amazon",
      url: "https://amazon.com.mx",
      description: "Encuentra nuestra lista en Amazon",
    },
  ],
  transferAccounts: [
    {
      bank: "BBVA",
      account: "0123456789",
      clabe: "012345678901234567",
      holder: "Julia García",
    },
    {
      bank: "Santander",
      account: "0123456789",
      clabe: "012345678901234567",
      holder: "Julia García",
    },
  ]
}

export default giftDescription
