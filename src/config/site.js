/**
 * Editable business configuration.
 *
 * Everything the business owner is most likely to change lives here:
 * contact details, navigation, the anniversary seal, and the quote-form options.
 *
 * ⚠️ The contact details below are clearly-marked PLACEHOLDERS. Replace them
 * with the real studio details before launch (see README → "پیش از انتشار").
 * Never publish a placeholder address as if it were a real one.
 */
export const site = {
  name: "وودکرفترز",
  tagline:
    "راهکارهای چوبی سفارشی، با دقتی استادانه برای خانه و فضای شما.",

  contact: {
    /** Placeholder address — replace with the studio's real inbox. */
    email: "hello@woodcrafters.example",
    /** Leave empty to hide the row (never invent a phone number). */
    phone: "",
    /** Leave empty to hide the row. */
    address: "",
    /** Leave empty to hide the row. */
    hours: "",
  },

  /** Subject line used for quote-request emails. */
  quoteSubject: "درخواست قیمت از وب‌سایت وودکرفترز",

  /**
   * Sample brand content. Update the number and labels and the seal follows.
   * (Shown as a brand mark, not as a claim about the business's history.)
   */
  anniversary: {
    number: "۲۰",
    unit: "سال",
    caption: "تجربه و مهارت",
  },

  navigation: [
    { label: "خانه", href: "#home" },
    { label: "خدمات", href: "#services" },
    { label: "پروژه‌ها", href: "#projects" },
    { label: "درباره ما", href: "#about" },
    { label: "تماس", href: "#contact" },
  ],

  /** Quote-form service options. Keep in sync with `src/data/services.js`. */
  quoteServices: [
    "مبلمان سفارشی",
    "دکوراسیون داخلی سفارشی",
    "پروژه‌های مبلمان خاص",
    "بازسازی خانه",
    "تعمیر و مرمت",
    "کابینت سفارشی",
    "موارد دیگر",
  ],

  /** Indicative ranges only — adjust to the studio's real pricing bands. */
  quoteBudgets: [
    "هنوز مشخص نیست",
    "زیر ۲٬۰۰۰",
    "۲٬۰۰۰ تا ۵٬۰۰۰",
    "۵٬۰۰۰ تا ۱۲٬۰۰۰",
    "۱۲٬۰۰۰ تا ۲۵٬۰۰۰",
    "بالای ۲۵٬۰۰۰",
  ],

  quoteContactMethods: ["ایمیل", "تلفن", "هر کدام فرقی ندارد"],

  quoteTimeframes: [
    "در اولین فرصت",
    "تا ۱ تا ۳ ماه آینده",
    "تا ۳ تا ۶ ماه آینده",
    "انعطاف‌پذیر / در حال بررسی",
  ],
};
