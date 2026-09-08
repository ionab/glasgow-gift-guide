import * as React from "react"
import type { Shop } from "@/types/shop"
import type { FlyTarget } from "@/components/map/constants"

const LazyShopMap = React.lazy(() => import("@/components/map/shop-map"))

interface ClientOnlyMapProps {
  shops: Shop[]
  flyTarget: FlyTarget
}

/**
 * Leaflet touches `window` on import, which breaks Gatsby's SSR build — so
 * the real map only mounts in the browser, after hydration.
 */
export function ClientOnlyMap({ shops, flyTarget }: ClientOnlyMapProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div id="map" style={{ height: 520 }} />
  }

  return (
    <React.Suspense fallback={<div id="map" style={{ height: 520 }} />}>
      <LazyShopMap shops={shops} flyTarget={flyTarget} />
    </React.Suspense>
  )
}
