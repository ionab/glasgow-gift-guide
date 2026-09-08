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
  socialLinks: string
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
  socialLinks: "",
}

const POSTCODE_PATTERN = /^\s*(g|ml|fk)\d/i
const FORM_NAME = "list-your-shop"
const OPENING_OPTIONS = ["Usual hours", "Late Thursdays", "Late every night", "Sundays too"]

// TypeScript's form typings don't know Netlify's non-"data-" attributes.
const netlifyFormAttrs = {
  "data-netlify": "true",
  "netlify-honeypot": "bot-field",
} as React.FormHTMLAttributes<HTMLFormElement>

type SubmitState = "idle" | "submitting" | "sent" | "error"

function encodeFormData(fields: Record<string, string | string[]>): string {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(fields)) {
    for (const v of Array.isArray(value) ? value : [value]) params.append(key, v)
  }
  return params.toString()
}

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
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": FORM_NAME,
          shopName: form.shopName,
          ownerName: form.ownerName,
          channel: form.channel,
          onlineUrl: form.onlineUrl,
          delivery: form.delivery,
          lastPostingDate: form.lastPostingDate,
          street: form.street,
          postcode: form.postcode,
          categories: form.categories,
          openingNote: form.openingNote,
          listingNote: form.listingNote,
          freeWrapping: form.freeWrapping ? "yes" : "no",
          socialLinks: form.socialLinks,
        }),
      })
      if (!response.ok) throw new Error(`Netlify Forms responded ${response.status}`)
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

      {/*
        Netlify's build bot only detects forms present in the static HTML
        output, but the real form below hides its "online only" fields
        behind client-side state — so at build time (channel: "shopfront")
        those field names never render. This always-present hidden twin
        carries every possible field so Netlify registers the full schema.
      */}
      <form name={FORM_NAME} hidden {...netlifyFormAttrs}>
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input name="bot-field" />
        <input type="text" name="shopName" />
        <input type="text" name="ownerName" />
        {(["shopfront", "online", "both"] as Channel[]).map((value) => (
          <input key={value} type="radio" name="channel" value={value} />
        ))}
        <input type="text" name="onlineUrl" />
        <input type="text" name="delivery" />
        <input type="text" name="lastPostingDate" />
        <input type="text" name="street" />
        <input type="text" name="postcode" />
        {CATEGORIES.map((category) => (
          <input key={category} type="checkbox" name="categories" value={category} />
        ))}
        {OPENING_OPTIONS.map((opt) => (
          <input key={opt} type="radio" name="openingNote" value={opt} />
        ))}
        <input type="text" name="listingNote" />
        <input type="radio" name="freeWrapping" value="yes" />
        <input type="radio" name="freeWrapping" value="no" />
        <textarea name="socialLinks" />
      </form>

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

          <form
            className="submit-form"
            name={FORM_NAME}
            method="POST"
            onSubmit={handleSubmit}
            noValidate
            {...netlifyFormAttrs}
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <p hidden>
              <label>
                Don&rsquo;t fill this out: <input name="bot-field" />
              </label>
            </p>
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

            <div className="field">
              <label htmlFor="cy-social">Social media</label>
              <textarea
                className="input"
                id="cy-social"
                value={form.socialLinks}
                onChange={(e) => setForm({ ...form, socialLinks: e.target.value })}
                placeholder="Instagram, Facebook, TikTok — one link or handle per line"
                rows={3}
              />
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
                {OPENING_OPTIONS.map((opt) => (
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
