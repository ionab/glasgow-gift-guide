import * as React from "react"
import { Nav } from "@/components/nav"

type NavCurrent = React.ComponentProps<typeof Nav>["current"]

interface LayoutProps {
  current: NavCurrent
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
