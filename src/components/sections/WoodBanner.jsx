import Photo from "../ui/Photo";

/**
 * The dark wood-grain band that carries the page's second headline.
 * The ivory section above meets it on a gentle carved-looking curve.
 */
export default function WoodBanner() {
  return (
    <section
      aria-labelledby="wood-banner-heading"
      className="wood-band relative overflow-hidden"
    >
      <Photo
        id={37024589}
        alt=""
        width={1800}
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />

      <svg
        className="absolute inset-x-0 top-0 h-14 w-full text-ivory sm:h-16"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v34c-260 32-460 44-720 28C460 46 240 26 0 44z"
        />
      </svg>

      <div className="wrap relative py-20 text-center lg:py-24">
        <h2
          id="wood-banner-heading"
          className="mx-auto max-w-3xl font-serif text-[1.9rem] leading-tight text-cream sm:text-[2.3rem] lg:text-[2.7rem]"
        >
          راهکارهای استادانه‌ی چوب‌کاری برای خانه‌ی شما
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[1rem] text-oak/90">
          از تعمیر یک صندلی تا چوب‌کاری کامل یک اتاق، هر پروژه با گفت‌وگویی
          درباره‌ی این‌که می‌خواهید فضا چگونه کار کند آغاز می‌شود.
        </p>
      </div>
    </section>
  );
}
