import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SeoProps {
  title: string
  description?: string
  /** Path only, e.g. "/map/" — joined with siteMetadata.siteUrl for canonical + OG URLs. */
  pathname?: string
  /** JSON-LD structured data object(s) to embed as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noIndex?: boolean
}

interface SiteMetadataQuery {
  site: {
    siteMetadata: {
      title: string
      titleTemplate: string
      description: string
      siteUrl: string
    }
  }
}

export function Seo({ title, description, pathname = "/", jsonLd, noIndex = false }: SeoProps) {
  const { site } = useStaticQuery<SiteMetadataQuery>(graphql`
    query SeoSiteMetadata {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
        }
      }
    }
  `)

  const { siteUrl, description: defaultDescription } = site.siteMetadata
  const metaDescription = description ?? defaultDescription
  const url = `${siteUrl}${pathname}`
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet
      title={title}
      titleTemplate={site.siteMetadata.titleTemplate}
      htmlAttributes={{ lang: "en-GB" }}
    >
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      {jsonLdList.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}
