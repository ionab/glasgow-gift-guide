import * as React from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { AREAS_BY_SLUG } from "@/data/areas"
import { DEFAULT_CENTER, DEFAULT_ZOOM, type FlyTarget } from "@/components/map/constants"
import type { Shop } from "@/types/shop"

function pinIcon(spot: boolean): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<span class="pin${spot ? " spot" : ""}"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

function FlyToController({ target }: { target: FlyTarget }) {
  const map = useMap()
  React.useEffect(() => {
    map.flyTo(target.center, target.zoom, { duration: 0.8 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.nonce])
  return null
}

interface ShopMapProps {
  shops: Shop[]
  flyTarget: FlyTarget
}

export default function ShopMap({ shops, flyTarget }: ShopMapProps) {
  return (
    <MapContainer
      id="map"
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      style={{ height: 520 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <FlyToController target={flyTarget} />
      {shops.map((shop) =>
        shop.coordinates ? (
          <Marker
            key={shop.id}
            position={shop.coordinates}
            icon={pinIcon(Boolean(shop.spot || shop.openLate))}
          >
            <Popup>
              <span className="pop-k">
                {shop.categories[0]} · {AREAS_BY_SLUG[shop.areaSlug]?.name ?? shop.areaSlug}
              </span>
              <div className="pop-t">{shop.name}</div>
              <div className="pop-m">
                {shop.street} · {shop.hours}
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  )
}
