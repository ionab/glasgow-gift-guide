import * as React from "react"
import { Link } from "gatsby"

interface NavProps {
  current: "map" | "directory" | "list-your-shop" | "online-only"
}

export function Nav({ current }: NavProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        Glasgow Gift Guide
      </Link>
      <div className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
        <Link to="/map/" aria-current={current === "map" ? "page" : undefined}>
          Map
        </Link>
        <Link to="/" aria-current={current === "directory" ? "page" : undefined}>
          Directory
        </Link>
        <Link
          to="/online-only/"
          aria-current={current === "online-only" ? "page" : undefined}
        >
          Online only
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
