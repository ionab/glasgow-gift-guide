import type { GatsbyConfig } from "gatsby"

// siteUrl backs canonical tags, Open Graph/Twitter cards, the sitemap and robots.txt.
const siteUrl = "https://glasgow-gift-guide.com"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Cascayde",
    titleTemplate: "%s · Cascayde",
    description:
      "Independent shops across Glasgow, Lanarkshire & the Clyde Valley for Christmas 2026 — browse by neighbourhood, category or map, or list your own shop.",
    siteUrl,
    author: "Cascayde",
  },
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-react-helmet",
    // TODO: re-add gatsby-plugin-manifest (name/short_name/theme_color as
    // below) once brand artwork exists — it requires at least one icon
    // file to generate the favicon set and app manifest from:
    // { resolve: "gatsby-plugin-manifest", options: { name: "Cascayde",
    //   short_name: "Cascayde", start_url: "/", background_color: "#f3f2f2",
    //   theme_color: "#0088b0", display: "minimal-ui", icon: "src/images/icon.png" } }
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404/", "/404.html"],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
}

export default config
