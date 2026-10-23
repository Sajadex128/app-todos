import { site } from "../../config/site";
import { useQuote } from "../quote/quoteContext";
import Button from "../ui/Button";
import ScrollVideo from "./ScrollVideo";

/**
 * Hero — the workshop film fills the opening screen (it takes the place of the
 * still photograph) and carries the three-line editorial headline from the
 * design reference on top of it. As the film starts travelling into the shop,
 * the copy dissolves and leaves the film to play out for the rest of the
 * scroll; scrolling back up brings the headline back.
 */
export default function Hero() {
  const { openQuote } = useQuote();

  return (
    <section id="home" className="relative isolate bg-walnut">
      <ScrollVideo>
        <div className="scrim-hero absolute inset-0" aria-hidden="true" />

        <div className="wrap relative flex h-full flex-col justify-center pb-20 pt-24 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
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
      </ScrollVideo>
    </section>
  );
}
