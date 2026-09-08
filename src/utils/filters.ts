import { AREAS } from "@/data/areas"
import { SHOPS } from "@/data/shops"
import type { Area, Category, Channel, Shop } from "@/types/shop"

export interface DirectoryFilters {
  query: string
  channel: "all" | Channel
  categories: Category[]
  openLateOnly: boolean
  area: string | null
}

export const DEFAULT_FILTERS: DirectoryFilters = {
  query: "",
  channel: "all",
  categories: [],
  openLateOnly: false,
  area: null,
}

export function parseFiltersFromSearch(search: string): DirectoryFilters {
  const params = new URLSearchParams(search)
  const channel = params.get("channel")
  const categories = params.get("categories")
  return {
    query: params.get("q") ?? "",
    channel: channel === "shopfront" || channel === "online" || channel === "both" ? channel : "all",
    categories: categories ? (categories.split(",").filter(Boolean) as Category[]) : [],
    openLateOnly: params.get("openLate") === "1",
    area: params.get("area"),
  }
}

export function filtersToSearch(filters: DirectoryFilters): string {
  const params = new URLSearchParams()
  if (filters.query) params.set("q", filters.query)
  if (filters.channel !== "all") params.set("channel", filters.channel)
  if (filters.categories.length) params.set("categories", filters.categories.join(","))
  if (filters.openLateOnly) params.set("openLate", "1")
  if (filters.area) params.set("area", filters.area)
  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

function matchesChannel(shop: Shop, channel: DirectoryFilters["channel"]): boolean {
  if (channel === "all") return true
  if (channel === "shopfront") return shop.channel === "shopfront" || shop.channel === "both"
  if (channel === "online") return shop.channel === "online" || shop.channel === "both"
  return shop.channel === channel
}

export function filterShops(shops: Shop[], filters: DirectoryFilters): Shop[] {
  const query = filters.query.trim().toLowerCase()
  return shops.filter((shop) => {
    if (!matchesChannel(shop, filters.channel)) return false
    if (filters.area && shop.areaSlug !== filters.area) return false
    if (filters.openLateOnly && !shop.openLate) return false
    if (
      filters.categories.length &&
      !filters.categories.some((category) => shop.categories.includes(category))
    ) {
      return false
    }
    if (!query) return true
    const area = AREAS.find((a) => a.slug === shop.areaSlug)
    const haystack = [shop.name, shop.street, area?.name ?? ""].join(" ").toLowerCase()
    return haystack.includes(query)
  })
}

export interface AreaWithCount extends Area {
  count: number
}

export function getAreasWithCounts(shops: Shop[] = SHOPS): AreaWithCount[] {
  const counts = new Map<string, number>()
  for (const shop of shops) {
    counts.set(shop.areaSlug, (counts.get(shop.areaSlug) ?? 0) + 1)
  }
  return AREAS.map((area) => ({ ...area, count: counts.get(area.slug) ?? 0 })).sort(
    (a, b) => b.count - a.count
  )
}

export function groupAreasByRegion(areas: AreaWithCount[]): Record<Area["region"], AreaWithCount[]> {
  return {
    Glasgow: areas.filter((a) => a.region === "Glasgow"),
    "Lanarkshire & the Clyde Valley": areas.filter(
      (a) => a.region === "Lanarkshire & the Clyde Valley"
    ),
  }
}

export interface AdventInfo {
  day: number
  isLive: boolean
  label: string
}

const ADVENT_YEAR = 2026
const ADVENT_MONTH_INDEX = 11 // December

/** Derives the advent-count day from the current date rather than hard-coding it. */
export function getAdventInfo(now: Date = new Date()): AdventInfo {
  const start = new Date(Date.UTC(ADVENT_YEAR, ADVENT_MONTH_INDEX, 1))
  const end = new Date(Date.UTC(ADVENT_YEAR, ADVENT_MONTH_INDEX, 24))

  if (now < start) {
    return { day: 0, isLive: false, label: "Opens 1 December" }
  }
  if (now > end) {
    return { day: 24, isLive: false, label: "See you next Christmas" }
  }
  const day = now.getUTCDate()
  return { day, isLive: true, label: `Day ${day} of 24` }
}
