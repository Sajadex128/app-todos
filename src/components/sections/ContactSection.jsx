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
            eyebrow="Contact"
            title="Tell Us About Your Project"
            intro="Share a few details and we will come back with questions, a rough estimate and a suggested next step. There is no obligation."
          />
          <ContactDetails className="mt-8" />

          {usingPlaceholderEmail ? (
            <p className="mt-6 rounded-lg border border-line bg-cardbg p-4 text-sm text-muted">
              <strong className="font-semibold text-ink">
                Studio details are placeholders.
              </strong>{" "}
              Update them in{" "}
              <code className="text-ink">src/config/site.js</code> before launch
              — phone, address and opening hours stay hidden until you fill them
              in.
            </p>
          ) : null}
        </div>

        <div className="card p-6 sm:p-8">
          <QuoteForm idPrefix="contact" heading="Request a free quote" />
        </div>
      </div>
    </section>
  );
}
