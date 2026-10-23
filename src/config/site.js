/**
 * Editable business configuration.
 *
 * Everything the business owner is most likely to change lives here:
 * contact details, navigation, the anniversary seal, and the quote-form options.
 *
 * ⚠️ The contact details below are clearly-marked PLACEHOLDERS. Replace them
 * with the real studio details before launch (see README → "Before you launch").
 * Never publish a placeholder address as if it were a real one.
 */
export const site = {
  name: "WoodCrafters",
  tagline: "Custom woodwork solutions crafted to perfection for your home and space.",

  contact: {
    /** Placeholder address — replace with the studio's real inbox. */
    email: "hello@woodcrafters.example",
    /** Leave empty to hide the row (never invent a phone number). */
    phone: "",
    /** Leave empty to hide the row. */
    address: "",
    /** Leave empty to hide the row. */
    hours: "",
  },

  /** Subject line used for quote-request emails. */
  quoteSubject: "Quote request from the WoodCrafters website",

  /**
   * Sample brand content. Update the number and labels and the seal follows.
   * (Shown as a brand mark, not as a claim about the business's history.)
   */
  anniversary: {
    number: "20",
    unit: "Years",
    caption: "of craftsmanship",
  },

  navigation: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  /** Quote-form service options. Keep in sync with `src/data/services.js`. */
  quoteServices: [
    "Bespoke Furniture",
    "Tailored Interiors",
    "Unique Furniture Projects",
    "Home Renovation",
    "Repairs & Restoration",
    "Custom Cabinetry",
    "Other",
  ],

  /** Indicative ranges only — adjust to the studio's real pricing bands. */
  quoteBudgets: [
    "Not sure yet",
    "Under 2,000",
    "2,000 – 5,000",
    "5,000 – 12,000",
    "12,000 – 25,000",
    "Above 25,000",
  ],

  quoteContactMethods: ["Email", "Phone", "Either is fine"],

  quoteTimeframes: [
    "As soon as possible",
    "Within 1–3 months",
    "Within 3–6 months",
    "Flexible / still exploring",
  ],
};
