import * as React from "react"
import {
  DEFAULT_FILTERS,
  filtersToSearch,
  parseFiltersFromSearch,
  type DirectoryFilters,
} from "@/utils/filters"

/**
 * Keeps directory/map filter state in sync with the URL query string so a
 * filtered view is shareable and survives a reload, without a full Gatsby
 * navigation on every keystroke or tag click.
 */
export function useDirectoryFilters(initialSearch: string) {
  const [filters, setFilters] = React.useState<DirectoryFilters>(() =>
    initialSearch ? parseFiltersFromSearch(initialSearch) : DEFAULT_FILTERS
  )

  React.useEffect(() => {
    const search = filtersToSearch(filters)
    const url = `${window.location.pathname}${search}`
    window.history.replaceState(null, "", url)
  }, [filters])

  const update = React.useCallback((patch: Partial<DirectoryFilters>) => {
    setFilters((current) => ({ ...current, ...patch }))
  }, [])

  const toggleCategory = React.useCallback((category: DirectoryFilters["categories"][number]) => {
    setFilters((current) => {
      const has = current.categories.includes(category)
      return {
        ...current,
        categories: has
          ? current.categories.filter((c) => c !== category)
          : [...current.categories, category],
      }
    })
  }, [])

  return { filters, setFilters, update, toggleCategory }
}
