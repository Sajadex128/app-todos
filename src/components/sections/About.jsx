import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const valuePoints = [
  "طراحی سنجیده و کاملاً سفارشی.",
  "متریال باکیفیت و پرداخت دقیق.",
  "گفت‌وگوی شفاف از ابتدا تا پایان کار.",
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
            eyebrow="درباره ما"
            title="با دقت ساخته شده. ماندگار."
            intro="در وودکرفترز باور داریم چوب‌کاری خوب، ترکیبی از طراحی سنجیده، دستان ماهر و توجهی بی‌قیدوشرط به جزئیات است. از مبلمان سفارشی تا قطعاتی که با دقت مرمت می‌شوند، راهکارهایی کاربردی و ماندگار می‌سازیم که برای هر خانه شخصی به نظر می‌رسد."
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
            با روش کار ما آشنا شوید
            <Icon name="arrow-right" size={18} className="icon-flip" />
          </Button>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <Photo
            id={7484154}
            alt="دو استادکار در حال بررسی قطعه‌ای چوب در کارگاه"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-card object-cover shadow-card lg:aspect-[5/6]"
          />
        </Reveal>
      </div>
    </section>
  );
}
