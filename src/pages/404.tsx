import * as React from "react"
import { Link, type PageProps } from "gatsby"
import { Layout } from "@/components/layout"
import { Seo } from "@/components/seo"

export default function NotFoundPage(_props: PageProps) {
  return (
    <Layout current="directory">
      <Seo title="Page not found" pathname="/404/" noIndex />
      <div className="shell" style={{ padding: "80px 56px" }}>
        <h1 className="h-lead" style={{ fontSize: 46 }}>
          Page not found
        </h1>
        <p className="body-j" style={{ marginTop: 20, maxWidth: "44ch" }}>
          That page moved or never existed. Try the <Link to="/">directory</Link> or the{" "}
          <Link to="/map/">map</Link>.
        </p>
      </div>
    </Layout>
  )
}
