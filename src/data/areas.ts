import type { Area } from "@/types/shop"

/**
 * Placeholder area list, ported from the Glasgow Gift Guide design handoff.
 * Replace with real listings data once it exists.
 */
export const AREAS: Area[] = [
  { slug: "city-centre", name: "City Centre", region: "Glasgow", centre: [55.8625, -4.2575], zoom: 15 },
  { slug: "dennistoun", name: "Dennistoun", region: "Glasgow", centre: [55.8613, -4.2136], zoom: 15 },
  { slug: "finnieston-yorkhill", name: "Finnieston & Yorkhill", region: "Glasgow", centre: [55.8641, -4.283], zoom: 15 },
  { slug: "shawlands", name: "Shawlands", region: "Glasgow", centre: [55.8262, -4.2865], zoom: 15 },
  { slug: "west-end", name: "West End — Byres Road", region: "Glasgow", centre: [55.876, -4.293], zoom: 15 },
  { slug: "merchant-city", name: "Merchant City", region: "Glasgow", centre: [55.8578, -4.244], zoom: 16 },
  { slug: "strathbungo-govanhill", name: "Strathbungo & Govanhill", region: "Glasgow", centre: [55.833, -4.268], zoom: 15 },
  { slug: "partick", name: "Partick", region: "Glasgow", centre: [55.87, -4.308], zoom: 15 },
  { slug: "trongate-saltmarket", name: "Trongate & Saltmarket", region: "Glasgow", centre: [55.8556, -4.244], zoom: 16 },
  { slug: "battlefield-mount-florida", name: "Battlefield & Mount Florida", region: "Glasgow", centre: [55.826, -4.2635], zoom: 15 },
  { slug: "kirkintilloch-milngavie", name: "Kirkintilloch & Milngavie", region: "Glasgow", centre: [55.9395, -4.26], zoom: 13 },
  { slug: "rutherglen-cambuslang", name: "Rutherglen & Cambuslang", region: "Lanarkshire & the Clyde Valley", centre: [55.8283, -4.2145], zoom: 15 },
  { slug: "hamilton", name: "Hamilton", region: "Lanarkshire & the Clyde Valley", centre: [55.777, -4.039], zoom: 15 },
  { slug: "east-kilbride", name: "East Kilbride", region: "Lanarkshire & the Clyde Valley", centre: [55.7645, -4.177], zoom: 15 },
  { slug: "motherwell-wishaw", name: "Motherwell & Wishaw", region: "Lanarkshire & the Clyde Valley", centre: [55.79, -3.993], zoom: 14 },
  { slug: "airdrie-coatbridge", name: "Airdrie & Coatbridge", region: "Lanarkshire & the Clyde Valley", centre: [55.862, -3.977], zoom: 14 },
  { slug: "lanark-clyde-valley", name: "Lanark & the Clyde Valley", region: "Lanarkshire & the Clyde Valley", centre: [55.6745, -3.777], zoom: 14 },
  { slug: "strathaven-biggar", name: "Strathaven & Biggar", region: "Lanarkshire & the Clyde Valley", centre: [55.678, -4.068], zoom: 13 },
  { slug: "clarkston", name: "Clarkston", region: "East Renfrewshire", centre: [55.7975, -4.288], zoom: 15 },
]

export const AREAS_BY_SLUG: Record<string, Area> = Object.fromEntries(
  AREAS.map((area) => [area.slug, area])
)
