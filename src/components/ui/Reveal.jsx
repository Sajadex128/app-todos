import { useEffect, useRef, useState } from "react";

/**
 * True when the browser can animate the reveal and the visitor allows it.
 * Evaluated during render (client-only app), never inside an effect.
 */
function canAnimate() {
  if (typeof window === "undefined") return false;
  if (typeof IntersectionObserver === "undefined") return false;
  if (typeof window.matchMedia !== "function") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Fades content up as it enters the viewport.
 *
 * One IntersectionObserver per element, disconnected as soon as the element has
 * been revealed. Visitors who prefer reduced motion, or whose browser lacks
 * IntersectionObserver, start visible and skip the animation entirely — so a
 * reveal can never leave content stuck at opacity 0.
 *
 * `as` is either "div" (default) or "li", so the wrapper can be the direct
 * child of a grid or list without nesting an extra element.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => !canAnimate());

  useEffect(() => {
    if (!canAnimate()) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClassName = `reveal${visible ? " is-visible" : ""}${
    className ? ` ${className}` : ""
  }`;
  const revealStyle = delay ? { transitionDelay: `${delay}ms` } : undefined;

  if (as === "li") {
    return (
      <li ref={ref} className={revealClassName} style={revealStyle}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref} className={revealClassName} style={revealStyle}>
      {children}
    </div>
  );
}
