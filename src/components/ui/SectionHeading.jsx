/**
 * Section heading: eyebrow, serif title, optional intro.
 * `id` is applied to the title so the section can be labelled by it.
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : ""} ${className}`}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "light" ? "text-amber" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className={`mt-3 text-[1.75rem] leading-tight sm:text-4xl lg:text-[2.6rem] ${
          tone === "light" ? "text-cream" : ""
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`lede mt-4 ${centered ? "mx-auto" : ""} ${
            tone === "light" ? "text-oak" : ""
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
