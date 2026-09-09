import * as React from "react"
import { Link, type PageProps } from "gatsby"
import { Layout } from "@/components/layout"
import { Seo } from "@/components/seo"
import { Slug, RuleThickThin, RuleThin, Dateline, LeadRow, Tag } from "@/components/furniture"
import { ClientOnlyMap } from "@/components/map/client-only-map"
import { DEFAULT_CENTER, DEFAULT_ZOOM, type FlyTarget } from "@/components/map/constants"
import { SHOPS, SHOPFRONT_COUNT, ONLINE_ONLY_COUNT } from "@/data/shops"
import { CATEGORIES } from "@/types/shop"
import { useDirectoryFilters } from "@/hooks/use-directory-filters"
import { filterShops, getAreasWithCounts } from "@/utils/filters"

const PINNABLE_CATEGORIES = CATEGORIES.filter((category) => category !== "Online only")

export default function MapPage({ location }: PageProps) {
  const { filters, update, toggleCategory } = useDirectoryFilters(location.search)
  const [flyTarget, setFlyTarget] = React.useState<FlyTarget>({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    nonce: 0,
  })

  // The map only ever shows pinnable (shopfront) shops — online-only shops
  // have no coordinates and live on their own page instead, see /online-only/.
  const shopfrontShops = React.useMemo(() => SHOPS.filter((shop) => shop.channel !== "online"), [])
  const filteredShops = React.useMemo(() => filterShops(shopfrontShops, filters), [shopfrontShops, filters])
  const areasWithCounts = React.useMemo(() => getAreasWithCounts(filteredShops), [filteredShops])

  function flyToArea(center: FlyTarget["center"], zoom: number) {
    setFlyTarget((current) => ({ center, zoom, nonce: current.nonce + 1 }))
  }

  return (
    <Layout current="map">
      <Seo
        title="Map — browse shops by neighbourhood"
        description="A live map of independent shops across the Greater Glasgow area — pick a neighbourhood or town and see who's there."
        pathname="/map/"
      />

      <div className="shell">
        <RuleThickThin />
        <Dateline
          items={[
            "Greater Glasgow area",
            "Christmas 2026",
            `${SHOPFRONT_COUNT} shopfronts on the map`,
            <Link key="online-only" to="/online-only/">
              {ONLINE_ONLY_COUNT} online only, on their own page
            </Link>,
          ]}
        />
        <RuleThin />

        <div className="map-split">
          <div>
            <h1 className="map-h1">Walk it, don&rsquo;t scroll it</h1>
            <p className="standfirst" style={{ fontSize: 15.5, lineHeight: "27px" }}>
              Pick a neighbourhood or town and the map goes there — the city, the burghs and the
              Clyde Valley. Magenta pins are today&rsquo;s advent shop and the ones open latest.
            </p>
            <div className="tag-row" style={{ marginTop: 22 }}>
              <Tag selected={filters.categories.length === 0} onClick={() => update({ categories: [] })}>
                All {SHOPFRONT_COUNT}
              </Tag>
              {PINNABLE_CATEGORIES.map((category) => (
                <Tag
                  key={category}
                  selected={filters.categories.includes(category)}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Tag>
              ))}
            </div>

            <Slug style={{ margin: "30px 0 16px" }}>Neighbourhoods & towns</Slug>
            <div className="area-list">
              {areasWithCounts.map((area) => (
                <LeadRow
                  key={area.slug}
                  as="button"
                  label={area.name}
                  value={area.count}
                  onClick={() => flyToArea(area.centre, area.zoom)}
                />
              ))}
            </div>

            <p className="muted-note" style={{ marginTop: 24 }}>
              Looking for a maker with no shopfront? See the{" "}
              <Link to="/online-only/">online-only shops</Link>. Missing your street?{" "}
              <Link to="/list-your-shop/">Add a shop</Link>.
            </p>
          </div>

          <div>
            <ClientOnlyMap shops={filteredShops} flyTarget={flyTarget} />
            <div className="map-caption-row">
              <p className="muted-note" style={{ margin: 0 }}>
                Pins are placeholder locations on real streets. Click one for the listing.
              </p>
              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => flyToArea(DEFAULT_CENTER, DEFAULT_ZOOM)}
                >
                  Whole region
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  aria-pressed={filters.openLateOnly}
                  onClick={() => update({ openLateOnly: !filters.openLateOnly })}
                >
                  Open late only
                </button>
              </div>
            </div>
            <p className="muted-note" style={{ marginTop: 8 }}>
              Online-only shops don&rsquo;t have a pin — see them on{" "}
              <Link to="/online-only/">their own page</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
