import type { LatLng } from "@/types/shop"

/**
 * Kept out of shop-map.tsx deliberately: that module imports `leaflet`,
 * which touches `window` at module-load time. Any page that imports a real
 * (non-type) binding from shop-map.tsx directly — even just a constant —
 * pulls leaflet into that page's SSR module graph and breaks the build.
 * Pages should only ever reach the map via ClientOnlyMap.
 */
export const DEFAULT_CENTER: LatLng = [55.79, -4.06]
export const DEFAULT_ZOOM = 10

export interface FlyTarget {
  center: LatLng
  zoom: number
  /** Bump this on every click so re-flying to the same view still fires. */
  nonce: number
}
