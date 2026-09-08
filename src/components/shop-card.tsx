import * as React from "react"
import type { Shop } from "@/types/shop"
import { AREAS_BY_SLUG } from "@/data/areas"

export function ShopCard({ shop }: { shop: Shop }) {
  const area = AREAS_BY_SLUG[shop.areaSlug]
  return (
    <article className="card">
      <span className="card-kicker">
        {shop.categories[0]} · {area?.name ?? shop.areaSlug}
      </span>
      <h3 className="card-title">
        {shop.url ? (
          <a href={shop.url} target="_blank" rel="noreferrer">
            {shop.name}
          </a>
        ) : (
          shop.name
        )}
      </h3>
      <p className="card-body">{shop.note ?? `${shop.street} · ${shop.hours}`}</p>
      <p className="card-meta">
        {shop.street} · {shop.hours}
      </p>
    </article>
  )
}
