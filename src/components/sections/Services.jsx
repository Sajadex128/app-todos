import { services } from "../../data/services";
import { useQuote } from "../quote/quoteContext";
import AnniversaryBadge from "./AnniversaryBadge";
import Button from "../ui/Button";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/**
 * Three photographic service cards on warm ivory, with the anniversary seal
 * layered over the lower-left corner (lower-right in the mirrored RTL layout).
 */
export default function Services() {
  const { openQuote } = useQuote();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-ivory pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <div className="wrap relative">
        <SectionHeading
          id="services-heading"
          title="خدمات ما"
          align="center"
          className="[&>h2]:text-[1.6rem] sm:[&>h2]:text-[1.9rem]"
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-7">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={index * 90} className="h-full">
              <article className="card group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-line">
                  <Photo
                    id={service.image.id}
                    alt={service.image.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-[1.3rem]">{service.title}</h3>
                  <p className="mt-2.5 flex-1 text-[0.93rem]">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => openQuote(service.quoteService)}
                    >
                      شروع کنید
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Small screens: the seal sits below the cards so nothing is covered. */}
        <AnniversaryBadge className="mx-auto mt-10 lg:absolute lg:bottom-[-2.75rem] lg:end-0 lg:z-30 lg:mt-0 lg:me-4" />
      </div>
    </section>
  );
}
