import { site } from "../config/site";

/**
 * The three headline services.
 * `quoteService` must match one of `site.quoteServices` so the "Get Started"
 * button preselects the right option in the quote form.
 *
 * `image.id` is a photo id from the configured image host (see
 * components/ui/Photo.jsx) — swap the number, keep the alt text accurate.
 */
export const services = [
  {
    id: "tailored-interiors",
    title: "Tailored Interiors",
    quoteService: "Tailored Interiors",
    description:
      "Transform your space with bespoke woodwork, custom cabinetry, and beautifully considered interior details.",
    image: {
      id: 3847582,
      alt: "Warm, contemporary home office with a custom wooden desk and shelving",
    },
  },
  {
    id: "unique-furniture-projects",
    title: "Unique Furniture Projects",
    quoteService: "Unique Furniture Projects",
    description:
      "Bring your ideas to life with one-of-a-kind furniture designed, built, and finished specifically for you.",
    image: {
      id: 5974285,
      alt: "Craftsperson cutting a joint into a wooden board with a chisel at the workbench",
    },
  },
  {
    id: "expert-repairs-restoration",
    title: "Expert Repairs & Restoration",
    quoteService: "Repairs & Restoration",
    description:
      "Restore the beauty and character of treasured wooden furniture with careful repairs and expert finishing.",
    image: {
      id: 5711903,
      alt: "Hand plane and joinery tools resting on a plank in a workshop",
    },
  },
];

export const defaultQuoteService = site.quoteServices[0];
