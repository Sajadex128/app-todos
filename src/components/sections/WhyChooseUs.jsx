import { benefits } from "../../data/benefits";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-heading"
      className="bg-cardbg py-20 lg:py-24"
    >
      <div className="wrap">
        <SectionHeading
          id="why-heading"
          eyebrow="چرا وودکرفترز"
          title="تفاوت در جزئیات است"
          align="center"
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit.id} delay={index * 70}>
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-burnt/10 text-burnt">
                <Icon name={benefit.icon} size={24} strokeWidth={1.4} />
              </span>
              <h3 className="mt-4 font-serif text-[1.15rem] leading-snug">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[0.92rem]">{benefit.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
