import { useEffect, useRef, useState } from "react";
import { site } from "../../config/site";
import { useQuote } from "../quote/quoteContext";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Logo from "../ui/Logo";

const SECTION_IDS = site.navigation.map((item) => item.href.replace("#", ""));

/**
 * Overlay header: transparent over the hero photograph, then walnut once the
 * page scrolls so the links stay readable over light sections.
 */
export default function Header() {
  const { openQuote } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(SECTION_IDS[0]);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Highlights the section currently in view (visual + aria-current). */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Mobile menu: Escape to close, focus returns to the toggle, no page scroll. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-walnut/95 shadow-[0_12px_32px_-20px_rgba(50,23,15,0.9)] backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-3 py-3 lg:py-4">
        <a
          href="#home"
          className="rounded-md"
          onClick={() => setMenuOpen(false)}
        >
          <Logo tone="light" />
        </a>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`text-[0.95rem] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-amber"
                        : "text-cream/85 hover:text-cream"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => openQuote()}
            className="whitespace-nowrap"
          >
            <span className="hidden sm:inline">Request a Quote</span>
            <span className="sm:hidden">Quote</span>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close the menu" : "Open the menu"}
            className="grid h-11 w-11 place-items-center rounded-lg border border-cream/25 text-cream transition-colors duration-200 hover:border-amber hover:text-amber lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-cream/10 bg-walnut/98 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="wrap pb-6 pt-2">
            <ul>
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-cream/10 py-3.5 text-base font-medium text-cream transition-colors duration-200 hover:text-amber"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              block
              className="mt-5"
              onClick={() => {
                setMenuOpen(false);
                openQuote();
              }}
            >
              Request a Quote
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
