import * as React from "react"
import type { PageProps } from "gatsby"
import { Layout } from "@/components/layout"
import { Seo } from "@/components/seo"
import { RuleThickThin, RuleThin, Dateline, LeadRow, Tag, PhotoSlot } from "@/components/furniture"
import { CATEGORIES, type Category, type Channel } from "@/types/shop"

interface FormState {
  shopName: string
  ownerName: string
  channel: Channel
  onlineUrl: string
  delivery: string
  lastPostingDate: string
  street: string
  postcode: string
  categories: Category[]
  openingNote: string
  listingNote: string
  freeWrapping: boolean
}

const INITIAL_STATE: FormState = {
  shopName: "",
  ownerName: "",
  channel: "shopfront",
  onlineUrl: "",
  delivery: "",
  lastPostingDate: "",
  street: "",
  postcode: "",
  categories: [],
  openingNote: "Usual hours",
  listingNote: "",
  freeWrapping: true,
}

const POSTCODE_PATTERN = /^\s*(g|ml|fk)\d/i

type SubmitState = "idle" | "submitting" | "sent" | "error"

function validate(form: FormState): string[] {
  const errors: string[] = []
  if (!form.shopName.trim()) errors.push("Shop name is required.")
  if (!form.street.trim()) errors.push("Street or studio address is required.")
  if (!form.postcode.trim()) {
    errors.push("Postcode is required.")
  } else if (!POSTCODE_PATTERN.test(form.postcode)) {
    errors.push("Postcode should be in the G, ML or FK postcode areas.")
  }
  if (form.categories.length === 0) errors.push("Pick at least one category.")
  if ((form.channel === "online" || form.channel === "both") && !form.lastPostingDate.trim()) {
    errors.push("Last posting date is required for online orders.")
  }
  return errors
}

export default function ListYourShopPage(_props: PageProps) {
  const [form, setForm] = React.useState<FormState>(INITIAL_STATE)
  const [submitState, setSubmitState] = React.useState<SubmitState>("idle")
  const [errors, setErrors] = React.useState<string[]>([])

  function toggleCategory(category: Category) {
    setForm((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((c) => c !== category)
        : [...current.categories, category],
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (validationErrors.length) return

    setSubmitState("submitting")
    try {
      // TODO: wire up the real listings endpoint once it exists.
      await new Promise((resolve) => setTimeout(resolve, 600))
      setSubmitState("sent")
    } catch {
      setSubmitState("error")
    }
  }

  const isOnline = form.channel === "online" || form.channel === "both"

  if (submitState === "sent") {
    return (
      <Layout current="list-your-shop">
        <Seo
          title="List your shop"
          description="Add your independent shop to the Cascayde directory before December — free, and always will be."
          pathname="/list-your-shop/"
        />
        <div className="shell">
          <RuleThickThin />
          <RuleThin />
          <div style={{ padding: "44px 0", maxWidth: "48ch" }}>
            <h1 className="h-lead" style={{ fontSize: 40, lineHeight: "44px" }}>
              Thanks — we&rsquo;ll be in touch
            </h1>
            <p className="body-j" style={{ marginTop: 20 }}>
              We&rsquo;ll email {form.ownerName || "you"} once to confirm the address for{" "}
              {form.shopName}, then list it within a working day.
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout current="list-your-shop">
      <Seo
        title="List your shop"
        description="Add your independent shop to the Cascayde directory before December — free, and always will be."
        pathname="/list-your-shop/"
      />

      <div className="shell">
        <RuleThickThin />
        <Dateline
          items={[
            "For retailers — G, ML and FK postcodes",
            "Free, and always will be",
            "Live within one working day",
            "Deadline for December: 28 Nov",
          ]}
        />
        <RuleThin />

        <div className="submit-split">
          <div>
            <h1 className="h-lead" style={{ fontSize: 46, lineHeight: "50px" }}>
              Put your shop on the map before December
            </h1>
            <p className="body-j" style={{ margin: "28px 0 0", maxWidth: "40ch" }}>
              No account, no fee. We check the address against the street, take one photograph if
              you have one, and list you under every category you actually stock. If you are a
              chain of more than four branches, this is not for you.
            </p>
            <div className="area-list" style={{ marginTop: 32, maxWidth: "36ch" }}>
              <LeadRow label="Shops listed this week" value="17" spot />
              <LeadRow label="Average time to go live" value="6h" />
              <LeadRow label="Cost, ever" value="£0" />
            </div>
          </div>

          <form className="submit-form" onSubmit={handleSubmit} noValidate>
            {errors.length > 0 && (
              <ul className="form-errors" role="alert">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            {submitState === "error" && (
              <p className="form-errors" role="alert">
                Something went wrong sending that — please try again.
              </p>
            )}

            <div className="form-row-2">
              <div className="field">
                <label htmlFor="cy-shop">Shop name</label>
                <input
                  className="input"
                  id="cy-shop"
                  value={form.shopName}
                  onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                  placeholder="e.g. Category & Co"
                />
              </div>
              <div className="field">
                <label htmlFor="cy-owner">Who&rsquo;s asking</label>
                <input
                  className="input"
                  id="cy-owner"
                  value={form.ownerName}
                  onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="field">
              <label>Where do people buy from you?</label>
              <div className="seg" style={{ marginTop: 10 }} role="radiogroup" aria-label="Sales channel">
                {(["shopfront", "online", "both"] as Channel[]).map((value) => (
                  <label className="seg-opt" key={value}>
                    <input
                      type="radio"
                      name="channel"
                      checked={form.channel === value}
                      onChange={() => setForm({ ...form, channel: value })}
                    />
                    {value === "shopfront" ? "A shopfront" : value === "online" ? "Online only" : "Both"}
                  </label>
                ))}
              </div>
              <p className="muted-note" style={{ marginTop: 10 }}>
                Online-only shops are listed by town or neighbourhood too — we use the studio or
                dispatch address, and it is never shown publicly.
              </p>
            </div>

            {isOnline && (
              <div className="form-grid-online">
                <div>
                  <span className="slug" style={{ marginBottom: 8 }}>
                    If you are online only
                  </span>
                  <p className="muted-note" style={{ margin: 0, maxWidth: "52ch" }}>
                    Four more fields, so a shopper knows how the parcel reaches them.
                  </p>
                </div>
                <div className="form-row-3">
                  <div className="field">
                    <label htmlFor="cy-url">Where they order</label>
                    <input
                      className="input"
                      id="cy-url"
                      value={form.onlineUrl}
                      onChange={(e) => setForm({ ...form, onlineUrl: e.target.value })}
                      placeholder="yourshop.co.uk or an Instagram handle"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cy-ship">Delivery</label>
                    <input
                      className="input"
                      id="cy-ship"
                      value={form.delivery}
                      onChange={(e) => setForm({ ...form, delivery: e.target.value })}
                      placeholder="e.g. Royal Mail, £3.95 — free over £40"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cy-post-by">Last posting date</label>
                    <input
                      className="input"
                      id="cy-post-by"
                      value={form.lastPostingDate}
                      onChange={(e) => setForm({ ...form, lastPostingDate: e.target.value })}
                      placeholder="18 Dec"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-row-2-1">
              <div className="field">
                <label htmlFor="cy-street">Street or studio address</label>
                <input
                  className="input"
                  id="cy-street"
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  placeholder="Number and street"
                />
              </div>
              <div className="field">
                <label htmlFor="cy-post">Postcode</label>
                <input
                  className="input"
                  id="cy-post"
                  value={form.postcode}
                  onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                  placeholder="G31 1XX or ML3 6BX"
                />
              </div>
            </div>

            <div className="field">
              <label>What do you stock? Pick all that apply</label>
              <div className="tag-row" style={{ marginTop: 10 }}>
                {CATEGORIES.map((category) => (
                  <Tag
                    key={category}
                    selected={form.categories.includes(category)}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="field">
              <label>December opening</label>
              <div className="seg" style={{ marginTop: 10 }} role="radiogroup" aria-label="December opening">
                {["Usual hours", "Late Thursdays", "Late every night", "Sundays too"].map((opt) => (
                  <label className="seg-opt" key={opt}>
                    <input
                      type="radio"
                      name="opening"
                      checked={form.openingNote === opt}
                      onChange={() => setForm({ ...form, openingNote: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row-2-1" style={{ alignItems: "start" }}>
              <div className="field">
                <label htmlFor="cy-note">One line for the listing</label>
                <input
                  className="input"
                  id="cy-note"
                  value={form.listingNote}
                  onChange={(e) => setForm({ ...form, listingNote: e.target.value })}
                  placeholder="What someone will find on the shelves"
                />
              </div>
              <div className="field">
                <label>Free wrapping?</label>
                <div className="radio-row">
                  <label className="radio">
                    <input
                      type="radio"
                      name="wrap"
                      checked={form.freeWrapping}
                      onChange={() => setForm({ ...form, freeWrapping: true })}
                    />
                    <span className="dot" />
                    Yes
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="wrap"
                      checked={!form.freeWrapping}
                      onChange={() => setForm({ ...form, freeWrapping: false })}
                    />
                    <span className="dot" />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <label>A photograph, if you have one</label>
              <PhotoSlot
                label="Drop a shopfront photograph — landscape, at least 1200px wide"
                aspectRatio="16/7"
              />
            </div>

            <div className="btn-row" style={{ alignItems: "center" }}>
              <button type="submit" className="btn btn-primary" disabled={submitState === "submitting"}>
                {submitState === "submitting" ? "Sending…" : "Send it in"}
              </button>
              <button type="button" className="btn btn-ghost">
                Save and finish later
              </button>
              <span className="muted-note">We&rsquo;ll email once, to confirm the address.</span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
