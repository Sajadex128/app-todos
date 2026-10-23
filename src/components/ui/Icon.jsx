/**
 * Thin-line icon set (24×24, stroke-based, inherits `currentColor`).
 *
 * Drawn as plain SVG paths so the site needs no icon dependency and every mark
 * shares the same optical weight as the copy around it. Decorative by default:
 * pass `title` only when an icon carries meaning on its own.
 */
const paths = {
  armchair: (
    <>
      <path d="M7 10.5V7.5A1.5 1.5 0 0 1 8.5 6h7A1.5 1.5 0 0 1 17 7.5v3" />
      <path d="M5 10.5h14a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 19 16.5H5A1.5 1.5 0 0 1 3.5 15v-3A1.5 1.5 0 0 1 5 10.5Z" />
      <path d="M6.5 16.5V19M17.5 16.5V19" />
    </>
  ),
  house: (
    <>
      <path d="M3.5 10.5 12 3.8l8.5 6.7" />
      <path d="M5.5 10v9.5h13V10" />
      <path d="M10 19.5v-5.2h4v5.2" />
    </>
  ),
  "house-check": (
    <>
      <path d="M3.5 10.8 12 4l8.5 6.8" />
      <path d="M5.5 10.3v9.4h13V10.3" />
      <path d="M9.4 14.4l1.9 1.9 3.6-3.7" />
    </>
  ),
  craft: (
    <>
      <path d="M4 20.2l.9-3.9L14.6 6.6l3 3L7.9 19.3 4 20.2Z" />
      <path d="M13.4 5.4 15 3.8a1.7 1.7 0 0 1 2.4 0l1.4 1.4a1.7 1.7 0 0 1 0 2.4l-1.6 1.6" />
      <path d="M6.6 17.4l1.6 1.6" />
    </>
  ),
  tag: (
    <>
      <path d="M20.3 13.3 13.3 20.3a1.9 1.9 0 0 1-2.7 0L3.5 13.2V3.5h9.7l7.1 7.1a1.9 1.9 0 0 1 0 2.7Z" />
      <circle cx="8.2" cy="8.2" r="1.4" />
    </>
  ),
  ruler: (
    <>
      <path d="M3.8 14.6 14.6 3.8l5.6 5.6-10.8 10.8z" />
      <path d="M7.2 11.2l1.6 1.6M10.2 8.2l1.6 1.6M13.2 5.2l1.6 1.6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19.5c0-7.5 4.9-11.7 14-11.7 0 8-4.6 12-10.4 12A5.6 5.6 0 0 1 5 19.5Z" />
      <path d="M5.4 19.6c1.8-4.2 4.6-6.8 8.4-8.4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.6 12.6 8.6 17.6 10.2 12.6 11.8 11 16.8 9.4 11.8 4.4 10.2 9.4 8.6z" />
      <path d="M17.6 15.4l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8z" />
    </>
  ),
  chat: (
    <path d="M20.5 13.4a2.5 2.5 0 0 1-2.5 2.5H10l-4.6 3.6v-3.6H6.5A2.5 2.5 0 0 1 4 13.4V6.6A2.5 2.5 0 0 1 6.5 4h11.5a2.5 2.5 0 0 1 2.5 2.6Z" />
  ),
  blueprint: (
    <>
      <path d="M4.2 4.2h15.6v15.6H4.2z" />
      <path d="M4.2 9.4h15.6M9.4 9.4v10.4" />
    </>
  ),
  check: <path d="M4.8 12.6 9.6 17.4 19.2 6.8" />,
  "arrow-right": (
    <>
      <path d="M4.5 12h14.2" />
      <path d="M13.2 6.5 18.7 12l-5.5 5.5" />
    </>
  ),
  "arrow-up": (
    <>
      <path d="M12 19.5V5" />
      <path d="M6.3 10.7 12 5l5.7 5.7" />
    </>
  ),
  "chevron-down": <path d="M6 9.5 12 15.5 18 9.5" />,
  close: <path d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8" />,
  menu: <path d="M3.8 7h16.4M3.8 12h16.4M3.8 17h16.4" />,
  mail: (
    <>
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="M4.2 7.2 12 13.2l7.8-6" />
    </>
  ),
  phone: (
    <path d="M4.5 5.2A2.2 2.2 0 0 1 6.7 3h1.6l1.4 3.4-1.9 1.4a12 12 0 0 0 6.4 6.4l1.4-1.9L19 13.7v1.6a2.2 2.2 0 0 1-2.2 2.2A13.4 13.4 0 0 1 4.5 5.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21.2s6.8-6 6.8-10.7a6.8 6.8 0 1 0-13.6 0C5.2 15.2 12 21.2 12 21.2Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.4V12l3.2 2" />
    </>
  ),
  copy: (
    <>
      <path d="M9.6 9.6h9v9h-9z" />
      <path d="M14.4 6.4H6.6a2.2 2.2 0 0 0-2.2 2.2v7.8" />
    </>
  ),
};

export default function Icon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className = "",
  title,
}) {
  const body = paths[name];
  if (!body) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {body}
    </svg>
  );
}
