# WoodCrafters

A premium custom woodworking website: bespoke furniture, tailored interiors,
renovation joinery and furniture restoration.

Single-page **Vite + React 19** site with **Tailwind CSS 4**. No backend: the
quote request form composes a complete email for the visitor to send (see
[Connecting quote delivery](#connecting-quote-delivery)).

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

The dev server is published on **http://localhost:3000** and reloads as you edit
(source is bind-mounted; `node_modules` is installed from `package-lock.json`
into a named volume on startup).

Without Docker:

```bash
npm ci
npm run dev
```

Useful checks: `npm run lint`, `npm run build`.

## Structure

| Path | What lives there |
| --- | --- |
| `src/config/site.js` | Contact details, navigation, anniversary seal, quote-form options |
| `src/data/*.js` | Services, feature cards, projects, process, benefits, testimonials, FAQs |
| `src/components/sections/` | One file per page section |
| `src/components/layout/` | Header, footer, back-to-top |
| `src/components/quote/` | Quote context, form, dialog |
| `src/components/ui/` | Reusable primitives: Photo, Icon, Button, Modal, Reveal, headings |
| `src/index.css` | Design tokens (palette, type, radii, shadows) + base/component styles |

Images are referenced by photo id (`image: { id: 1234, alt: "…" }`) and rendered
through `src/components/ui/Photo.jsx`, which builds the responsive `srcset`.
Swap a picture by changing the id, and always update the alt text with it.

## Before you launch

Everything below is deliberate sample content or a placeholder, and is labelled
as such in the UI:

1. **Contact details** (`src/config/site.js`) — the email address is a
   `.example` placeholder. Fill in the real inbox, and add phone, address and
   opening hours if you want them shown (empty values hide the row rather than
   inventing one).
2. **Quote delivery** — see below.
3. **Projects** (`src/data/projects.js`) — six sample entries used to
   demonstrate the gallery/filters.
4. **Testimonials** (`src/data/testimonials.js`) — illustrative placeholders.
   Not verified reviews; there are no star ratings.
5. **Anniversary seal** (`site.anniversary`) — brand content, not a claim about
   how long the business has traded. Update or remove it.
6. **Budgets** (`site.quoteBudgets`) — indicative ranges shown as a dropdown
   choice, never presented as official pricing.

## Connecting quote delivery

The form is fully validated and accessible, but this build has **no form
backend**, so nothing is stored or transmitted by the site itself. On a valid
submit it composes the whole request and hands it to the visitor's email
application, and says so plainly.

To deliver submissions automatically, either point the form at a form service
(Formspree/Netlify Forms/Basin and similar) or add a serverless/API endpoint,
and POST the same field values from `QuoteForm.handleSubmit`. Keep validation
and the error/success states as they are, and delete the "nothing is
transmitted" note once delivery really works.

## Accessibility and performance notes

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus rings.
- Dialogs (quote form, project lightbox) trap focus, close on Escape/backdrop
  and restore focus to the control that opened them.
- The FAQ accordion uses real buttons with `aria-expanded`/`aria-controls`.
- Portfolio filters expose `aria-pressed`; the result count is announced.
- `prefers-reduced-motion` disables reveals, hover lifts and smooth scrolling.
- Images are lazy-loaded below the fold, the hero is `fetchpriority="high"`,
  and every image container reserves its aspect ratio to avoid layout shift.
