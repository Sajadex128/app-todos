import { site } from "../../config/site";
import { useQuote } from "../quote/quoteContext";
import Button from "../ui/Button";
import Photo from "../ui/Photo";

/**
 * Hero — a darkened workshop photograph with the three-line editorial headline
 * from the design reference (ivory / burnt orange / ivory).
 */
export default function Hero() {
  const { openQuote } = useQuote();

  return (
    <section id="home" className="relative isolate overflow-hidden bg-walnut">
      <Photo
        id={10316634}
        alt=""
        width={1800}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="scrim-hero absolute inset-0" aria-hidden="true" />

      <div className="wrap relative flex min-h-[560px] flex-col justify-center pb-24 pt-28 sm:min-h-[600px] lg:min-h-[640px] lg:pb-28 lg:pt-32">
        <h1 className="max-w-3xl font-serif text-[2.55rem] leading-[1.3] text-cream sm:text-[3.3rem] lg:text-[4rem]">
          <span className="block">چوب‌کاری</span>{" "}
          <span className="block text-terracotta">استادانه</span>{" "}
          <span className="block">برای خانه‌ی شما</span>
        </h1>

        <p className="mt-6 max-w-[430px] text-[1.06rem] leading-relaxed text-cream/85 sm:text-[1.15rem]">
          {site.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => openQuote()}>
            دریافت قیمت رایگان
          </Button>
          <Button as="a" href="#projects" variant="light">
            مشاهده‌ی پروژه‌ها
          </Button>
        </div>
      </div>
    </section>
  );
}
