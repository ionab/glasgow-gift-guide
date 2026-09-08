import * as React from "react"
import { Link } from "gatsby"

interface NavProps {
  current: "map" | "directory" | "list-your-shop"
}

export function Nav({ current }: NavProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <nav className="nav">
      <span className="nav-brand">Cascayde</span>
      <div className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
        <Link to="/map/" aria-current={current === "map" ? "page" : undefined}>
          Map
        </Link>
        <Link to="/" aria-current={current === "directory" ? "page" : undefined}>
          Directory
        </Link>
        <Link
          to="/list-your-shop/"
          aria-current={current === "list-your-shop" ? "page" : undefined}
        >
          List your shop
        </Link>
      </div>
      <button type="button" className="btn btn-primary nav-cta">
        Get the Christmas list
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-icon nav-menu-toggle"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        ≡
      </button>
    </nav>
  )
}
