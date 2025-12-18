import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatea una fecha ISO a español.
// Opciones de estilo:
// - "conDe" (por defecto): "19 de Abril, 2026"
// - "del": "19 Abril del 2026"
export function formatDateSpanish(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso

  const day = d.getDate()
  const month = d.toLocaleString("es-ES", { month: "long" })
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1)
  const year = d.getFullYear()

  return `${day} de ${monthCap}, ${year}`
}