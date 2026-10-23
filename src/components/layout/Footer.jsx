import { site } from "../../config/site";
import { services } from "../../data/services";
import { faYear } from "../../utils/format";
import { useQuote } from "../quote/quoteContext";
import Button from "../ui/Button";
import ContactDetails from "../ui/ContactDetails";
import Icon from "../ui/Icon";
import Logo from "../ui/Logo";

export default function Footer() {
  const { openQuote } = useQuote();
  const usingPlaceholderEmail = site.contact.email.endsWith(".example");

  return (
    <footer className="wood-band text-oak/90">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-[0.95rem] text-oak/80">
            {site.tagline}
          </p>
          <Button
            variant="primary"
            size="sm"
            className="mt-5"
            onClick={() => openQuote()}
          >
            درخواست قیمت
            <Icon name="arrow-right" size={16} className="icon-flip" />
          </Button>
        </div>

        <nav aria-label="ناوبری پانویس">
          <h2 className="font-serif text-lg text-cream">دسترسی سریع</h2>
          <ul className="mt-4 space-y-2.5">
            {site.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.95rem] text-oak/85 transition-colors duration-200 hover:text-amber"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-lg text-cream">خدمات</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="text-[0.95rem] text-oak/85 transition-colors duration-200 hover:text-amber"
                >
                  {service.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#process"
                className="text-[0.95rem] text-oak/85 transition-colors duration-200 hover:text-amber"
              >
                مراحل کار ما
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg text-cream">کارگاه</h2>
          <ContactDetails tone="light" className="mt-4" />
          {usingPlaceholderEmail ? (
            <p className="mt-4 rounded-md border border-amber/30 bg-walnut/40 p-3 text-xs text-oak/80">
              اطلاعات تماس کارگاه جایگزین نمونه است. پیش از انتشار، اطلاعات واقعی
              را در <code className="text-cream">src/config/site.js</code> وارد
              کنید.
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-oak/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {faYear()} {site.name}. تمام حقوق محفوظ است.
          </p>
          <p>
            پروژه‌ها، نظرات مشتریان و نشان سالگرد، محتوای نمونه و قابل ویرایش
            هستند.
          </p>
        </div>
      </div>
    </footer>
  );
}
