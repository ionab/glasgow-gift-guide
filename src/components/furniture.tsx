import * as React from "react"

/** Small "furniture" components shared by every screen — see the Broadsheet
 * design system tokens in src/styles/broadsheet.css for the rules behind them. */

export function Slug({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span className="slug" style={style}>
      {children}
    </span>
  )
}

export function RuleThickThin() {
  return <hr className="rule2" />
}

export function RuleThin() {
  return <hr className="rule1" />
}

export function Dateline({ items }: { items: React.ReactNode[] }) {
  return (
    <p className="date">
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </p>
  )
}

interface LeadRowProps {
  label: React.ReactNode
  value: React.ReactNode
  spot?: boolean
  as?: "p" | "button"
  onClick?: () => void
}

export function LeadRow({ label, value, spot = false, as = "p", onClick }: LeadRowProps) {
  const content = (
    <>
      <span>{label}</span>
      <span className="dots" />
      <span className="n" style={spot ? { color: "var(--color-accent-700)" } : undefined}>
        {value}
      </span>
    </>
  )
  if (as === "button") {
    return (
      <button type="button" className="lead" onClick={onClick}>
        {content}
      </button>
    )
  }
  return <p className="lead">{content}</p>
}

export function AdventNumeral({ value, size }: { value: number | string; size: number }) {
  return (
    <div
      className="cmyk-num"
      style={{
        fontFamily: "var(--font-heading)",
        fontWeight: "var(--font-heading-weight)" as unknown as number,
        fontSize: size,
      }}
    >
      <span className="paper">{value}</span>
      <span className="plate plate-c" aria-hidden="true">
        {value}
      </span>
      <span className="plate plate-m" aria-hidden="true">
        {value}
      </span>
      <span className="plate plate-y" aria-hidden="true">
        {value}
      </span>
    </div>
  )
}

interface PhotoSlotProps {
  label: string
  aspectRatio: string
  caption?: string
}

/**
 * Stand-in for the design system's live CMYK-plate photo treatment
 * (figure.cmyk > .print > image-slot, driven by print-plates.js), which
 * needs a real photograph to separate. Until real photography exists this
 * renders a plain placeholder frame; swap in a real <img> (or reintroduce
 * the plate effect) once photography is available — see the handoff README.
 */
export function PhotoSlot({ label, aspectRatio, caption }: PhotoSlotProps) {
  return (
    <figure className="photo-slot-figure">
      <div className="photo-slot" style={{ aspectRatio }} role="img" aria-label={label}>
        <span>{label}</span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function Tag({
  children,
  selected = false,
  onClick,
}: {
  children: React.ReactNode
  selected?: boolean
  onClick?: () => void
}) {
  const className = `tag ${selected ? "tag-accent" : "tag-outline"}`
  if (!onClick) {
    return <span className={className}>{children}</span>
  }
  return (
    <button
      type="button"
      className={className}
      style={{ border: selected ? "none" : undefined, cursor: "pointer" }}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div className="seg" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => (
        <label className="seg-opt" key={option.value}>
          <input
            type="radio"
            name={ariaLabel}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
