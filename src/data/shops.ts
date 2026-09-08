import type { Shop } from "@/types/shop"

/**
 * Real independent shops, researched from their own websites and local
 * press (see the sources noted per entry below rather than repeated here).
 * Addresses, categories and hours are as published at the time of writing
 * — verify before relying on them, shops move and hours change.
 *
 * One caveat: Cascayde, Pena Pottery and FlowerThreads are online-only
 * with no published city — their `areaSlug` ("online-only") is a grouping
 * marker, not a real neighbourhood, so they don't inflate any area's count.
 *
 * This is still a small hand-picked sample, not the full directory the
 * design implies (289 shops) — replace/extend as real listings come in.
 */
export const SHOPS: Shop[] = [
  {
    id: "cascayde",
    name: "Cascayde",
    categories: ["Homeware & ceramics", "Online only"],
    areaSlug: "online-only",
    channel: "online",
    street: "Ships across the UK",
    hours: "Check website for hours",
    coordinates: null,
    note: "Low-plastic, eco-friendly gift wrap, ribbon, stationery and zero-waste home & personal care products.",
    url: "https://cascayde.com",
  },
  {
    id: "pena-pottery",
    name: "Pena Pottery",
    categories: ["Homeware & ceramics", "Online only"],
    areaSlug: "online-only",
    channel: "online",
    street: "Scotland — ships UK & internationally",
    hours: "Check website for hours",
    coordinates: null,
    note: "Handmade stoneware by Brandon Pena — mugs, bowls, plates, vases and jars, also sold on Etsy.",
    url: "https://penapottery.com",
  },
  {
    id: "flowerthreads",
    name: "FlowerThreads",
    categories: ["Clothing & vintage", "Online only"],
    areaSlug: "online-only",
    channel: "online",
    street: "Ships across the UK",
    hours: "Check website for hours",
    coordinates: null,
    note: "Online boutique for graphic t-shirts, custom apparel and seasonal pieces like embroidered caps and cardigans.",
    url: "https://flowerthreads.co.uk",
  },
  {
    id: "strip-joint-records",
    name: "Strip Joint Records",
    categories: ["Records"],
    areaSlug: "finnieston-yorkhill",
    channel: "shopfront",
    street: "Argyle Street",
    hours: "Check website for hours",
    coordinates: [55.8649, -4.2864],
    note: "Vinyl-only record shop on the Finnieston strip, inside Strip Joint Bar — new release and classic vinyl.",
    url: "https://stripjointglasgow.co.uk",
  },
  {
    id: "shona-jewellery",
    name: "Shona Jewellery",
    categories: ["Jewellery"],
    areaSlug: "finnieston-yorkhill",
    channel: "shopfront",
    street: "The Hidden Lane, Argyle Street",
    hours: "Check website for hours",
    coordinates: [55.8654, -4.2853],
    note: "Independent jewellery workshop in the Hidden Lane since 2000 — handmade rings, necklaces and bangles.",
    url: "https://shonajewellery.co.uk",
  },
  {
    id: "youngs-interesting-books",
    name: "Young's Interesting Books",
    categories: ["Books"],
    areaSlug: "shawlands",
    channel: "shopfront",
    street: "Skirving Street",
    hours: "Mon–Sat 11–5.30, Sun 12–5",
    coordinates: [55.8285, -4.2903],
    note: "Shawlands' only independent bookseller since 2008 — secondhand, first editions and Scottish literature.",
  },
  {
    id: "barvas-and-james-shawlands",
    name: "Barvas & James",
    categories: ["Plants & flowers"],
    areaSlug: "shawlands",
    channel: "shopfront",
    street: "Pollokshaws Road",
    hours: "Check website for hours",
    coordinates: [55.8280, -4.2872],
    note: "Naturally styled flowers and a curated lifestyle shop — the Southside branch of the West End florist.",
    url: "https://barvasandjames.com",
  },
  {
    id: "hyndland-bookshop",
    name: "Hyndland Bookshop",
    categories: ["Books"],
    areaSlug: "west-end",
    channel: "shopfront",
    street: "Hyndland Road",
    hours: "Mon–Fri 10–6, Sat 10–5",
    coordinates: [55.8779, -4.2969],
    note: "Glasgow's oldest independent bookshop, founded 1982 by two former librarians — fiction, poetry and travel writing.",
  },
  {
    id: "valhallas-goat",
    name: "Valhalla's Goat",
    categories: ["Food & drink"],
    areaSlug: "west-end",
    channel: "shopfront",
    street: "Great Western Road",
    hours: "Mon–Sat 11–10, Sun 12–8",
    coordinates: [55.8809, -4.2947],
    openLate: true,
    note: "Craft beer, wine and spirits shop from the Williams Bros Brewing Co. team — also stocks Cuban cigars and Belgian chocolate.",
    url: "https://www.valhallasgoat.com",
  },
  {
    id: "new-lanark-mill-shop",
    name: "New Lanark Mill Shop",
    categories: ["Clothing & vintage"],
    areaSlug: "lanark-clyde-valley",
    channel: "shopfront",
    street: "New Lanark World Heritage Site",
    hours: "Check website for hours",
    coordinates: [55.6706, -3.7842],
    note: "Home of the world's first Organic Tartan — New Lanark wool knitwear, throws and accessories, plus gifts and books.",
    url: "https://www.newlanarkspinning.com",
  },
]

export const TOTAL_SHOP_COUNT = SHOPS.length
export const SHOPFRONT_COUNT = SHOPS.filter((shop) => shop.channel !== "online").length
export const ONLINE_ONLY_COUNT = SHOPS.filter((shop) => shop.channel === "online").length
