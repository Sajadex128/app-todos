import { processSteps } from "../../data/processSteps";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/**
 * Four-step process: a timeline across on desktop, a vertical sequence on
 * smaller screens.
 */
export default function ProcessSteps() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-ivory py-20 lg:py-28"
    >
      <div className="wrap">
        <SectionHeading
          id="process-heading"
          eyebrow="Our Process"
          title="From First Idea to Final Finish"
          intro="Four straightforward stages, so you always know what happens next."
        />

        <div className="relative mt-12">
          <div
            className="absolute left-[3%] right-[3%] top-7 hidden h-px bg-line lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-9 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 80}>
                <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-cardbg text-burnt shadow-card">
                  <Icon name={step.icon} size={26} strokeWidth={1.4} />
                </span>
                <p className="mt-4 font-serif text-[0.95rem] tracking-[0.22em] text-terracotta">
                  {step.step}
                </p>
                <h3 className="mt-1.5 font-serif text-[1.25rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.93rem]">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
