import { testimonials } from "../../data/testimonials";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-ivory py-20 lg:py-28"
    >
      <div className="wrap">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Clients"
          title="What Our Clients Say"
          intro="Illustrative placeholders that show how client feedback will read — swap them for genuine quotes before launch."
          align="center"
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="li"
              key={testimonial.id}
              delay={index * 80}
              className="h-full"
            >
              <figure className="card flex h-full flex-col p-7">
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl leading-[0.6] text-terracotta"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1">
                  <p className="text-[1rem] leading-relaxed text-ink/85">
                    {testimonial.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <span className="block font-semibold text-ink">
                    {testimonial.name}
                  </span>
                  <span className="block text-[0.88rem] text-muted">
                    {testimonial.project}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted">
          Sample testimonial content — not verified customer reviews.
        </p>
      </div>
    </section>
  );
}
