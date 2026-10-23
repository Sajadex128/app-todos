import { site } from "../../config/site";

/**
 * Anniversary seal, modelled on the copper badge in the design reference.
 *
 * The number and labels come from `site.anniversary`, so the mark stays a piece
 * of editable brand content rather than a hard-coded claim about the business.
 */
export default function AnniversaryBadge({ className = "" }) {
  const { number, unit, caption } = site.anniversary;

  return (
    <div
      className={`seal h-32 w-32 lg:h-36 lg:w-36 ${className}`}
      role="img"
      aria-label={`${number} ${unit} ${caption}`}
    >
      <span className="seal-ring" aria-hidden="true" />
      <span className="seal-ticks" aria-hidden="true" />
      <span aria-hidden="true" className="relative text-center">
        <span className="block font-serif text-[2.5rem] leading-none text-cream lg:text-[2.75rem]">
          {number}
        </span>
        <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cream/95">
          {unit}
        </span>
        <span className="mt-1 block text-[0.52rem] uppercase tracking-[0.18em] text-cream/75">
          {caption}
        </span>
      </span>
    </div>
  );
}
