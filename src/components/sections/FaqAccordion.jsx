import { useState } from "react";
import { faqs } from "../../data/faqs";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

/**
 * Accessible accordion: every question is a real button with `aria-expanded`
 * and `aria-controls`, so it works with keyboard and screen readers without
 * extra scripting.
 */
export default function FaqAccordion() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-cardbg py-20 lg:py-28"
    >
      <div className="wrap grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          id="faq-heading"
          eyebrow="Good to Know"
          title="Frequently Asked Questions"
          intro="Still unsure about something? Ask us directly in the quote form — we would rather answer early than guess."
        />

        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <li key={faq.id}>
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-serif text-[1.08rem] leading-snug text-ink">
                      {faq.question}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-burnt transition-transform duration-300 ${
                        isOpen ? "rotate-180 border-terracotta" : "border-line"
                      }`}
                    >
                      <Icon name="chevron-down" size={16} strokeWidth={1.8} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${faq.id}`}
                  hidden={!isOpen}
                  className="pb-5 pr-10 text-[0.95rem]"
                >
                  {faq.answer}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
