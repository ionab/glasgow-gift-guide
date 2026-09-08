import type { GatsbySSR } from "gatsby"

import "leaflet/dist/leaflet.css"
import "./src/styles/broadsheet.css"
import "./src/styles/global.css"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: "en-GB" })
}
