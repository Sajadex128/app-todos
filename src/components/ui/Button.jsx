const VARIANTS = {
  primary: "btn-primary",
  dark: "btn-dark",
  light: "btn-outline-light",
  outline: "btn-outline-dark",
};

/**
 * Single button primitive so every control shares the same sizing, focus ring
 * and hover behaviour. Render as a link with `as="a"`.
 */
export default function Button({
  as: Tag = "button",
  variant = "primary",
  size,
  block = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    VARIANTS[variant] ?? VARIANTS.primary,
    size === "sm" ? "btn-sm" : "",
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tagProps =
    Tag === "button" && rest.type === undefined ? { type: "button" } : null;

  return (
    <Tag className={classes} {...tagProps} {...rest}>
      {children}
    </Tag>
  );
}
