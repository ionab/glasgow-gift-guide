import * as React from "react"
import { Link, type PageProps } from "gatsby"
import { Layout } from "@/components/layout"
import { Seo } from "@/components/seo"
import {
  Slug,
  RuleThickThin,
  RuleThin,
  Dateline,
  LeadRow,
  AdventNumeral,
  PhotoSlot,
  Tag,
  SegmentedControl,
} from "@/components/furniture"
import { ShopCard } from "@/components/shop-card"
import { SHOPS } from "@/data/shops"
import { CATEGORIES } from "@/types/shop"
import { useDirectoryFilters } from "@/hooks/use-directory-filters"
import {
  filterShops,
  getAdventInfo,
  getAreasWithCounts,
  groupAreasByRegion,
} from "@/utils/filters"

export default function IndexPage({ location }: PageProps) {
  const { filters, update, toggleCategory } = useDirectoryFilters(location.search)

  const filteredShops = React.useMemo(() => filterShops(SHOPS, filters), [filters])
  const areasWithCounts = React.useMemo(() => getAreasWithCounts(filteredShops), [filteredShops])
  const areasByRegion = React.useMemo(() => groupAreasByRegion(areasWithCounts), [areasWithCounts])

  const shopfrontCount = filteredShops.filter((s) => s.channel !== "online").length
  const onlineCount = filteredShops.filter((s) => s.channel !== "shopfront").length
  const featuredShops = filteredShops.filter((s) => s.channel !== "online").slice(0, 6)
  const onlineShops = filteredShops.filter((s) => s.channel !== "shopfront").slice(0, 5)
  const advent = getAdventInfo()
  const shopCountLabel = `${SHOPS.length} independent shop${SHOPS.length === 1 ? "" : "s"}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Glasgow Gift Guide — independent shops directory",
    itemListElement: SHOPS.slice(0, 20).map((shop, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Store",
        name: shop.name,
        address: shop.street,
      },
    })),
  }

  return (
    <Layout current="directory">
      <Seo
        title="Glasgow & Lanarkshire independent shops for Christmas 2026"
        description={`${shopCountLabel} across the Greater Glasgow area, sorted by neighbourhood and category — a directory for Christmas 2026, not a listicle.`}
        pathname="/"
        jsonLd={jsonLd}
      />

      <div className="shell">
        <RuleThickThin />
        <Dateline
          items={[
            "Greater Glasgow area",
            "Christmas 2026",
            `${SHOPS.length} shops listed`,
            advent.label,
            "Late openings, Thursdays",
          ]}
        />
        <RuleThin />

        <section className="hero">
          <div>
            <Slug style={{ marginBottom: 14 }}>Where to start</Slug>
            <h1 className="h-lead hero-h1">{shopCountLabel}, sorted by the street they are on</h1>
            <p className="standfirst">
              Every listing is a shop you can walk into this month: opening hours, what they
              actually stock, and whether they will wrap it while you wait. No chains, no
              affiliate links, nothing paid for.
            </p>
            <div className="btn-row">
              <Link to="/map/" className="btn btn-primary">
                Browse the map
              </Link>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => update({ openLateOnly: !filters.openLateOnly })}
                aria-pressed={filters.openLateOnly}
              >
                Shops open late
              </button>
            </div>
          </div>
          <PhotoSlot
            label="Shop window at dusk — Dennistoun"
            aspectRatio="5/4"
            caption="Duke Street, late November. Photograph placeholder."
          />
        </section>

        <section style={{ paddingTop: 52 }}>
          <Slug style={{ marginBottom: 18 }}>Search the directory</Slug>
          <div className="search-row">
            <input
              className="input search-input"
              type="search"
              placeholder="Shop, street or postcode"
              aria-label="Search shops"
              value={filters.query}
              onChange={(event) => update({ query: event.target.value })}
            />
            <button type="button" className="btn btn-primary">
              Search
            </button>
          </div>
          <div style={{ marginTop: 18, width: "fit-content" }}>
            <SegmentedControl
              ariaLabel="Filter by channel"
              value={filters.channel}
              onChange={(channel) => update({ channel })}
              options={[
                { value: "all", label: `All ${SHOPS.length}` },
                { value: "shopfront", label: `Shopfronts ${SHOPS.filter((s) => s.channel !== "online").length}` },
                { value: "online", label: `Online only ${SHOPS.filter((s) => s.channel !== "shopfront").length}` },
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
        </section>

        <section className="directory-body">
          <div>
            <Slug style={{ marginBottom: 20 }}>Glasgow — by neighbourhood</Slug>
            <div className="area-list">
              {areasByRegion.Glasgow.map((area, index) => (
                <LeadRow
                  key={area.slug}
                  as="button"
                  label={area.name}
                  value={area.count}
                  spot={index === 0 && area.count > 0}
                  onClick={() => update({ area: filters.area === area.slug ? null : area.slug })}
                />
              ))}
            </div>
            {areasByRegion["East Renfrewshire"].length > 0 && (
              <>
                <Slug style={{ margin: "36px 0 20px" }}>East Renfrewshire</Slug>
                <div className="area-list">
                  {areasByRegion["East Renfrewshire"].map((area) => (
                    <LeadRow
                      key={area.slug}
                      as="button"
                      label={area.name}
                      value={area.count}
                      onClick={() => update({ area: filters.area === area.slug ? null : area.slug })}
                    />
                  ))}
                </div>
              </>
            )}
            <Slug style={{ margin: "36px 0 20px" }}>Lanarkshire & the Clyde Valley</Slug>
            <div className="area-list">
              {areasByRegion["Lanarkshire & the Clyde Valley"].map((area) => (
                <LeadRow
                  key={area.slug}
                  as="button"
                  label={area.name}
                  value={area.count}
                  onClick={() => update({ area: filters.area === area.slug ? null : area.slug })}
                />
              ))}
            </div>
            <p className="muted-note">
              Missing your street?{" "}
              <Link to="/list-your-shop/">Add a shop</Link> — listings go live within a day.
              Anywhere in the G, ML and part of the FK postcodes.
            </p>
          </div>

          <div>
            <Slug style={{ marginBottom: 20 }}>
              {filters.area ? "Matching this neighbourhood" : "Open this weekend"}
            </Slug>
            <div className="card-grid">
              {featuredShops.length ? (
                featuredShops.map((shop) => <ShopCard key={shop.id} shop={shop} />)
              ) : (
                <p className="muted-note">No shopfronts match these filters yet.</p>
              )}
            </div>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <button type="button" className="btn btn-secondary">
                See all {shopfrontCount} listings
              </button>
            </div>

            <Slug style={{ margin: "40px 0 8px" }}>
              Online only — made across the region, posted from it
            </Slug>
            <p className="muted-note" style={{ marginBottom: 18, maxWidth: "52ch" }}>
              {onlineCount} makers and sellers with no shopfront, from Govanhill to Strathaven.
              Same region, same money staying in it — just ordered from the sofa. Last posting
              date for second class is 18 December.
            </p>
            <div className="area-list">
              {onlineShops.map((shop, index) => (
                <LeadRow
                  key={shop.id}
                  label={`${shop.name} — ${shop.note ?? shop.street}`}
                  value={shop.lastPostingDate ? `Post by ${shop.lastPostingDate}` : shop.hours}
                  spot={index === 0}
                />
              ))}
            </div>
            <div className="btn-row" style={{ marginTop: 22 }}>
              <button type="button" className="btn btn-ghost">
                All {onlineCount} online-only shops
              </button>
            </div>
          </div>
        </section>

        <section className="advent-quote">
          <div>
            <Slug style={{ marginBottom: 14 }}>The advent count</Slug>
            <AdventNumeral value={advent.day || 24} size={110} />
            <p className="body-j" style={{ margin: "24px 0 0", maxWidth: "44ch" }}>
              One shop a day from the first of December to Christmas Eve, chosen by the people
              who live on that street. {advent.isLive ? "Today's" : "Each day's"} shop is
              highlighted in magenta on the map.
            </p>
          </div>
          <figure style={{ margin: 0 }}>
            <blockquote className="pull-quote">
              &ldquo;December pays for February. Every person who walks past us in the next four
              weeks is next year&rsquo;s rent.&rdquo;
            </blockquote>
            <figcaption className="pull-quote-caption">
              — Placeholder quote, shopkeeper, Govanhill
            </figcaption>
          </figure>
        </section>

        <section className="newsletter-close">
          <RuleThin />
          <div className="newsletter-row">
            <div>
              <h3 className="newsletter-heading">The Christmas list, once a week</h3>
              <p className="muted-note" style={{ marginTop: 14, maxWidth: "46ch" }}>
                Four emails between now and Christmas Eve: who is open late, who has stock left,
                who is wrapping for free.
              </p>
            </div>
            <form
              className="newsletter-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                required
              />
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  )
}
