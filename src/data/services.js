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
    title: "دکوراسیون داخلی سفارشی",
    quoteService: "دکوراسیون داخلی سفارشی",
    description:
      "با چوب‌کاری سفارشی، کابینت‌های اختصاصی و جزئیات سنجیده‌ی داخلی، فضای خود را دگرگون کنید.",
    image: {
      id: 3847582,
      alt: "دفتر کار خانگی گرم و امروزی با میز و قفسه‌های چوبی سفارشی",
    },
  },
  {
    id: "unique-furniture-projects",
    title: "پروژه‌های مبلمان خاص",
    quoteService: "پروژه‌های مبلمان خاص",
    description:
      "ایده‌های شما را به واقعیت تبدیل می‌کنیم؛ مبلمانی یکتا که فقط برای شما طراحی، ساخته و پرداخت می‌شود.",
    image: {
      id: 5974285,
      alt: "استادکار در حال برش اتصال چوبی روی تخته با قلم در کارگاه",
    },
  },
  {
    id: "expert-repairs-restoration",
    title: "تعمیر و مرمت تخصصی",
    quoteService: "تعمیر و مرمت",
    description:
      "زیبایی و اصالت مبلمان چوبی قدیمی را با تعمیر دقیق و پرداخت استادانه به آن بازگردانید.",
    image: {
      id: 5711903,
      alt: "رنده‌ی دستی و ابزارهای نجاری روی تخته‌چوبی در کارگاه",
    },
  },
];

export const defaultQuoteService = site.quoteServices[0];
