import { useQuote } from "../quote/quoteContext";
import Button from "../ui/Button";
import Photo from "../ui/Photo";

export default function FinalCta() {
  const { openQuote } = useQuote();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="wood-band relative overflow-hidden"
    >
      <Photo
        id={11098241}
        alt=""
        width={1800}
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />

      <div className="wrap relative py-20 text-center lg:py-24">
        <h2
          id="final-cta-heading"
          className="mx-auto max-w-2xl font-serif text-[2rem] leading-tight text-cream sm:text-[2.4rem] lg:text-[2.8rem]"
        >
          Have a Project in Mind?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[1.02rem] text-oak/90">
          Let&rsquo;s turn your ideas into beautifully crafted woodwork.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={() => openQuote()}>
            Request a Free Quote
          </Button>
          <Button as="a" href="#contact" variant="light">
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
