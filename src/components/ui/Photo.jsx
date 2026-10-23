/**
 * Responsive photo.
 *
 * Images are served from the configured photo host (Pexels) using plain URLs,
 * so swapping a picture is a one-number change in the relevant data file
 * (`image: { id: 1234, alt: "…" }`).
 *
 * - `srcSet` + `sizes` keep the payload small on phones.
 * - Below-the-fold images load lazily; the hero opts into `priority`.
 * - Containers must set an aspect ratio so the image cannot shift the layout.
 */
const HOST = "https://images.pexels.com/photos";
const WIDTHS = [640, 960, 1400, 1800];

const photoUrl = (id, width) =>
  `${HOST}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=${width}`;

export default function Photo({
  id,
  alt = "",
  sizes = "100vw",
  width = 1200,
  priority = false,
  className = "",
}) {
  if (!id) return null;

  return (
    <img
      src={photoUrl(id, width)}
      srcSet={WIDTHS.map((w) => `${photoUrl(id, w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
