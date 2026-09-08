export type Category =
  | "Books"
  | "Records"
  | "Homeware & ceramics"
  | "Clothing & vintage"
  | "Food & drink"
  | "Coffee & bakeries"
  | "Art & prints"
  | "Jewellery"
  | "Toys & games"
  | "Plants & flowers"
  | "Whisky"

export type Channel = "shopfront" | "online" | "both"

export type LatLng = [number, number]

export interface Area {
  slug: string
  name: string
  region: "Glasgow" | "Lanarkshire & the Clyde Valley"
  centre: LatLng
  zoom: number
}

export interface Shop {
  id: string
  name: string
  categories: Category[]
  areaSlug: string
  channel: Channel
  street: string
  hours: string
  coordinates: LatLng | null
  /** Marks the day's advent shop, or another shop worth spotlighting with the spot colour. */
  spot?: boolean
  /** Open later than the area's usual December hours. */
  openLate?: boolean
  lastPostingDate?: string
  freeWrapping?: boolean
  note?: string
}

export const CATEGORIES: Category[] = [
  "Books",
  "Records",
  "Homeware & ceramics",
  "Clothing & vintage",
  "Food & drink",
  "Coffee & bakeries",
  "Art & prints",
  "Jewellery",
  "Toys & games",
  "Plants & flowers",
  "Whisky",
]
