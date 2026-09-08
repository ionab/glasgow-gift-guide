import * as React from "react"
import { Nav } from "@/components/nav"

interface LayoutProps {
  current: "map" | "directory" | "list-your-shop"
  children: React.ReactNode
}

export function Layout({ current, children }: LayoutProps) {
  return (
    <>
      <Nav current={current} />
      <main>{children}</main>
    </>
  )
}
