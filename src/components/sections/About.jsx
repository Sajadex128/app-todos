import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const valuePoints = [
  "Thoughtful, made-to-measure design.",
  "Quality materials and careful finishing.",
  "Clear communication from start to finish.",
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ivory py-20 lg:py-28"
    >
      <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <SectionHeading
            id="about-heading"
            eyebrow="About Us"
            title="Crafted With Care. Built to Last."
            intro="At WoodCrafters, we believe great woodwork combines thoughtful design, skilled hands, and an uncompromising attention to detail. From custom furniture to carefully restored pieces, we create practical, lasting solutions that feel personal to every home."
          />

          <ul className="mt-8 space-y-3.5">
            {valuePoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-burnt/12 text-burnt">
                  <Icon name="check" size={15} strokeWidth={2} />
                </span>
                <span className="text-[0.98rem] text-ink/85">{point}</span>
              </li>
            ))}
          </ul>

          <Button as="a" href="#process" variant="dark" className="mt-8">
            Meet Our Approach
            <Icon name="arrow-right" size={18} />
          </Button>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <Photo
            id={7484154}
            alt="Two makers examining a piece of timber together in the workshop"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-card object-cover shadow-card lg:aspect-[5/6]"
          />
        </Reveal>
      </div>
    </section>
  );
}
