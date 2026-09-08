import * as React from "react"
import { Link, type PageProps } from "gatsby"
import { Layout } from "@/components/layout"
import { Seo } from "@/components/seo"
import { Slug, RuleThickThin, RuleThin, Dateline, LeadRow, Tag, SegmentedControl } from "@/components/furniture"
import { ClientOnlyMap } from "@/components/map/client-only-map"
import { DEFAULT_CENTER, DEFAULT_ZOOM, type FlyTarget } from "@/components/map/constants"
import { SHOPS, SHOPFRONT_COUNT, ONLINE_ONLY_COUNT } from "@/data/shops"
import { CATEGORIES } from "@/types/shop"
import { useDirectoryFilters } from "@/hooks/use-directory-filters"
import { filterShops, getAreasWithCounts } from "@/utils/filters"

export default function MapPage({ location }: PageProps) {
  const { filters, update, toggleCategory } = useDirectoryFilters(location.search)
  const [flyTarget, setFlyTarget] = React.useState<FlyTarget>({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    nonce: 0,
  })

  const filteredShops = React.useMemo(() => filterShops(SHOPS, filters), [filters])
  const areasWithCounts = React.useMemo(() => getAreasWithCounts(filteredShops), [filteredShops])
  const onlineOnlyShops = React.useMemo(
    () => filteredShops.filter((shop) => shop.channel === "online"),
    [filteredShops]
  )

  function flyToArea(center: FlyTarget["center"], zoom: number) {
    setFlyTarget((current) => ({ center, zoom, nonce: current.nonce + 1 }))
  }

  return (
    <Layout current="map">
      <Seo
        title="Map — browse shops by neighbourhood"
        description="A live map of independent shops across Glasgow, Lanarkshire and the Clyde Valley — pick a neighbourhood or town and see who's there."
        pathname="/map/"
      />

      <div className="shell">
        <RuleThickThin />
        <Dateline
          items={[
            "Glasgow, Lanarkshire & the Clyde Valley",
            "Christmas 2026",
            `${SHOPFRONT_COUNT} shopfronts`,
            `${ONLINE_ONLY_COUNT} online only`,
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
            <div style={{ margin: "22px 0 0", width: "fit-content", maxWidth: "100%" }}>
              <SegmentedControl
                ariaLabel="Filter by channel"
                value={filters.channel}
                onChange={(channel) => update({ channel })}
                options={[
                  { value: "all", label: `All ${SHOPS.length}` },
                  { value: "shopfront", label: "Shopfronts" },
                  { value: "online", label: "Online only" },
                ]}
              />
            </div>
            <div className="tag-row" style={{ marginTop: 20 }}>
              <Tag selected={filters.categories.length === 0} onClick={() => update({ categories: [] })}>
                All {SHOPS.length}
              </Tag>
              {CATEGORIES.map((category) => (
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

            <Slug style={{ margin: "30px 0 8px" }}>Online only, no pin</Slug>
            <p className="muted-note" style={{ marginBottom: 14 }}>
              Makers across the region who post rather than open a door. Listed by the town or
              neighbourhood they work in.
            </p>
            <div className="area-list">
              {onlineOnlyShops.map((shop) => (
                <LeadRow
                  key={shop.id}
                  label={`${shop.name} — ${shop.street}`}
                  value={shop.lastPostingDate ? `Post by ${shop.lastPostingDate}` : shop.hours}
                  spot={shop.spot}
                />
              ))}
            </div>
            <p className="muted-note" style={{ marginTop: 24 }}>
              Missing your street? <Link to="/list-your-shop/">Add a shop</Link>.
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
              Online-only shops have no pin — they are in the list on the left.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
