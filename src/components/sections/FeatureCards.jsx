import { features } from "../../data/features";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";

/** Warm card treatments — gradients stay subtle, no cold or neon tones. */
const TONES = {
  burnt: "bg-[linear-gradient(152deg,#c46b37,#a94f25)]",
  terracotta: "bg-[linear-gradient(152deg,#d99862,#c46b37)]",
  espresso: "bg-[linear-gradient(152deg,#452319,#32170f)]",
};

/**
 * The four feature cards that overlap the bottom of the hero.
 * Laid out in normal flow with a negative top margin rather than absolute
 * positioning, so the row can never collide with the hero content.
 */
export default function FeatureCards() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative z-20 -mt-14 sm:-mt-16 lg:-mt-20"
    >
      <div className="wrap">
        <h2 id="features-heading" className="sr-only">
          What we can do for your home
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, index) => (
            <Reveal
              as="li"
              key={feature.id}
              delay={index * 70}
              className="group h-full"
            >
              <div
                className={`flex h-full flex-col rounded-card p-6 text-cream shadow-card transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lift ${
                  TONES[feature.tone] ?? TONES.burnt
                }`}
              >
                <Icon
                  name={feature.icon}
                  size={50}
                  strokeWidth={1.2}
                  className="text-cream/90"
                />
                <h3 className="mt-5 font-serif text-[1.15rem] text-cream">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-cream/85">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
