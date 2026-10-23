import { site } from "../../config/site";

/**
 * Brand mark: a thin hexagonal emblem carrying a stylised joinery "W", paired
 * with the Persian wordmark. Pure SVG + text, so it stays crisp at any size and
 * needs no image asset.
 */
export default function Logo({ tone = "light", className = "" }) {
  const isLight = tone === "light";
  const markColor = isLight ? "#E7C09A" : "#A94F25";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M20 3.2 33.4 11v18L20 36.8 6.6 29V11z"
          fill="none"
          stroke={markColor}
          strokeWidth="1.5"
        />
        <path
          d="M12.4 14.8 15.4 25.2l4.6-8 4.6 8 3-10.4"
          fill="none"
          stroke={markColor}
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-sans text-[1.22rem] font-semibold ${
          isLight ? "text-cream" : "text-ink"
        }`}
      >
        {site.name}
        <span className="sr-only"> — {site.tagline}</span>
      </span>
    </span>
  );
}
