import { site } from "../../config/site";
import ContactDetails from "../ui/ContactDetails";
import QuoteForm from "../quote/QuoteForm";
import SectionHeading from "../ui/SectionHeading";

/**
 * Always-visible quote request section. The same form component is used inside
 * the dialog opened from the header, hero and CTAs.
 */
export default function ContactSection() {
  const usingPlaceholderEmail = site.contact.email.endsWith(".example");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-ivory py-20 lg:py-28"
    >
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-heading"
            eyebrow="تماس"
            title="درباره‌ی پروژه‌تان بگویید"
            intro="چند جزئیات را با ما در میان بگذارید تا با پرسش‌هایمان، یک برآورد تقریبی و پیشنهاد قدم بعدی به شما پاسخ دهیم. هیچ الزامی وجود ندارد."
          />
          <ContactDetails className="mt-8" />

          {usingPlaceholderEmail ? (
            <p className="mt-6 rounded-lg border border-line bg-cardbg p-4 text-sm text-muted">
              <strong className="font-semibold text-ink">
                اطلاعات کارگاه جایگزین نمونه است.
              </strong>{" "}
              پیش از انتشار آن‌ها را در{" "}
              <code className="text-ink">src/config/site.js</code> به‌روزرسانی
              کنید — تلفن، آدرس و ساعات کاری تا زمانی که آن‌ها را پر نکنید
              نمایش داده نمی‌شوند.
            </p>
          ) : null}
        </div>

        <div className="card p-6 sm:p-8">
          <QuoteForm idPrefix="contact" heading="درخواست قیمت رایگان" />
        </div>
      </div>
    </section>
  );
}
