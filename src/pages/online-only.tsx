import * as React from "react"
import { Link, type PageProps } from "gatsby"
import { Layout } from "@/components/layout"
import { Seo } from "@/components/seo"
import { RuleThickThin, RuleThin, Dateline } from "@/components/furniture"
import { SHOPS, ONLINE_ONLY_COUNT } from "@/data/shops"

export default function OnlineOnlyPage(_props: PageProps) {
  const onlineShops = SHOPS.filter((shop) => shop.channel !== "shopfront")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Glasgow Gift Guide — online-only independent shops",
    itemListElement: onlineShops.map((shop, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "OnlineStore", name: shop.name, url: shop.url },
    })),
  }

  return (
    <Layout current="online-only">
      <Seo
        title="Online-only shops"
        description="Independent makers and sellers across Glasgow, Lanarkshire and the Clyde Valley with no shopfront — same region, ordered from the sofa."
        pathname="/online-only/"
        jsonLd={jsonLd}
      />

      <div className="shell">
        <RuleThickThin />
        <Dateline
          items={[
            "Made across the region, posted from it",
            `${ONLINE_ONLY_COUNT} online-only shops`,
            "No shopfront, no pin on the map",
          ]}
        />
        <RuleThin />

        <div style={{ padding: "44px 0 0", maxWidth: "70ch" }}>
          <h1 className="h-lead" style={{ fontSize: 46, lineHeight: "50px" }}>
            Same region, ordered from the sofa
          </h1>
          <p className="body-j" style={{ margin: "24px 0 0" }}>
            These makers and sellers don&rsquo;t have a shopfront, so they don&rsquo;t get a pin
            on the <Link to="/map/">map</Link> — they&rsquo;re listed here instead, by what they
            make and, where it&rsquo;s published, the last date to post in time for Christmas.
          </p>
        </div>

        <div className="card-grid" style={{ paddingTop: 40 }}>
          {onlineShops.map((shop) => (
            <article className="card" key={shop.id}>
              <span className="card-kicker">
                {shop.categories.filter((c) => c !== "Online only").join(" · ") || "Online only"}
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
              <p className="card-body">{shop.note ?? shop.street}</p>
              <p className="card-meta">
                {shop.lastPostingDate ? `Post by ${shop.lastPostingDate}` : shop.hours}
              </p>
            </article>
          ))}
        </div>

        <p className="muted-note" style={{ marginTop: 32 }}>
          Run an online-only shop in the region? <Link to="/list-your-shop/">Add it</Link> —
          listings go live within a day.
        </p>
      </div>
    </Layout>
  )
}
