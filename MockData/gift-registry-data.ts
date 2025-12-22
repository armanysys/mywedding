import type { GiftDescription } from "@/Domain/GiftRegistry"

/**
 * Gift Registry section data source
 * Contains all information for gift registry including:
 * - Store registries (Liverpool, Amazon, etc.)
 * - Bank transfer details for multiple accounts
 * - Descriptive text and instructions
 */
export const giftRegistryData: GiftDescription = {
  title: "Mesa de Regalos",
  intro: "Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, estas son nuestras opciones",
  note: "Los regalos físicos pueden ser entregados el día del evento. Habrá un buzón especial para sobres y tarjetas.",
  giftRegistry: [
    {
      id: "001",
      codigo: "No. 51890416",
      name: "Liverpool",
      url: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/51890416",
      description: "Encuentra nuestra lista de regalos en Liverpool",
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
  ],
}

export default giftRegistryData
