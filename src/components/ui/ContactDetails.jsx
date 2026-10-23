import { site } from "../../config/site";
import Icon from "./Icon";

/**
 * Studio contact rows, shared by the contact section and the footer.
 * Rows whose value is still empty in `src/config/site.js` are simply not
 * rendered — no invented phone numbers, addresses or opening hours.
 */
export default function ContactDetails({ tone = "dark", className = "" }) {
  const isLight = tone === "light";
  const { email, phone, address, hours } = site.contact;

  const rows = [
    email
      ? { icon: "mail", label: "ایمیل", value: email, href: `mailto:${email}` }
      : null,
    phone
      ? {
          icon: "phone",
          label: "تلفن",
          value: phone,
          href: `tel:${phone.replace(/\s+/g, "")}`,
        }
      : null,
    address ? { icon: "pin", label: "کارگاه", value: address } : null,
    hours ? { icon: "clock", label: "ساعات کاری", value: hours } : null,
  ].filter(Boolean);

  return (
    <ul className={`space-y-3.5 ${className}`}>
      {rows.map((row) => (
        <li key={row.label} className="flex items-start gap-3">
          <Icon
            name={row.icon}
            size={18}
            strokeWidth={1.5}
            className={`mt-1 shrink-0 ${isLight ? "text-amber" : "text-burnt"}`}
          />
          <span
            className={`text-[0.95rem] ${isLight ? "text-oak/90" : "text-muted"}`}
          >
            <span className="sr-only">{row.label}: </span>
            {row.href ? (
              <a
                href={row.href}
                className={`transition-colors duration-200 ${
                  isLight ? "hover:text-amber" : "hover:text-burnt"
                }`}
              >
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
