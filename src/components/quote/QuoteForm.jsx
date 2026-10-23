import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "../../config/site";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emptyValues = (service) => ({
  name: "",
  email: "",
  phone: "",
  service: service || site.quoteServices[0],
  description: "",
  budget: "",
  contactMethod: "",
  timeframe: "",
  location: "",
});

function validate(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Please add an email address so we can reply.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address looks incomplete — please check it.";
  }
  if (!values.service) {
    errors.service = "Please choose the service you need.";
  }
  if (!values.description.trim()) {
    errors.description = "Please describe the project in a few words.";
  } else if (values.description.trim().length < 20) {
    errors.description = "A little more detail helps us quote accurately.";
  }
  return errors;
}

/** Human-readable request, used for the email body and the copy button. */
function buildMessage(values) {
  const rows = [
    ["Name", values.name],
    ["Email", values.email],
    values.phone ? ["Phone", values.phone] : null,
    ["Service", values.service],
    values.budget ? ["Budget range", values.budget] : null,
    values.contactMethod ? ["Preferred contact", values.contactMethod] : null,
    values.timeframe ? ["Timeframe", values.timeframe] : null,
    values.location ? ["Project location", values.location] : null,
  ].filter(Boolean);

  return [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project description:",
    values.description,
  ].join("\n");
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
        {required ? (
          <span className="text-burnt" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted/80"> (optional)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p className="mt-1 text-xs text-muted" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Quote request form.
 *
 * Delivery: this site has no form backend connected, so the form does not
 * pretend to send anything. On a valid submit it composes the complete request
 * and hands it to the visitor's own email application — no data is stored or
 * transmitted by the site itself. See README → "Connecting quote delivery".
 */
export default function QuoteForm({
  idPrefix = "quote",
  preselectedService,
  heading = "Request a free quote",
  className = "",
}) {
  const [values, setValues] = useState(() => emptyValues(preselectedService));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [copyState, setCopyState] = useState("idle");
  const fieldRefs = useRef({});

  // A CTA elsewhere on the page can choose the service for us.
  useEffect(() => {
    if (!preselectedService) return;
    setValues((current) => ({ ...current, service: preselectedService }));
  }, [preselectedService]);

  const message = useMemo(() => buildMessage(values), [values]);

  const mailtoHref = useMemo(() => {
    if (!site.contact.email) return "";
    const subject = `${site.quoteSubject} — ${values.service}`;
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
  }, [message, values.service]);

  const setFieldRef = (field) => (node) => {
    fieldRefs.current[field] = node;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setCopyState("idle");

    const invalidFields = Object.keys(nextErrors);
    if (invalidFields.length > 0) {
      // Keep what the visitor typed, move focus to the first problem field and
      // announce the count for screen-reader users.
      fieldRefs.current[invalidFields[0]]?.focus?.();
      return;
    }

    setStatus("ready");
  };

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("unsupported");
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setCopyState("idle");
  };

  const errorCount = Object.keys(errors).length;

  if (status === "ready") {
    return (
      <div className={className}>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-burnt/12 text-burnt">
            <Icon name="check" size={20} />
          </span>
          <div>
            <h3 className="font-serif text-xl text-ink">
              Your request is ready to send
            </h3>
            <p className="mt-2 text-[0.95rem]">
              We have put your details into a complete email. Nothing has been
              sent yet — you stay in control of the final message.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {mailtoHref ? (
            <Button
              as="a"
              href={mailtoHref}
              variant="primary"
              data-autofocus
            >
              <Icon name="mail" size={18} />
              Open in your email app
            </Button>
          ) : null}
          <Button variant="outline" onClick={handleCopy}>
            <Icon name="copy" size={18} />
            {copyState === "copied" ? "Details copied" : "Copy the details"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Edit the request
          </Button>
        </div>

        <p className="mt-3 text-sm text-muted" role="status" aria-live="polite">
          {copyState === "copied"
            ? "The request details are on your clipboard."
            : null}
          {copyState === "failed"
            ? "Your browser blocked the clipboard — you can still select the text of the prepared email."
            : null}
        </p>

        <div className="mt-5 rounded-lg border border-line bg-ivory/70 p-4 text-sm">
          <p className="font-semibold text-ink">Before this goes live</p>
          <p className="mt-1">
            Automatic delivery is not connected yet: this website does not store
            submissions or email the studio by itself. The prepared message is
            addressed to{" "}
            <span className="font-medium text-ink">
              {site.contact.email || "the studio inbox"}
            </span>
            , which is still a placeholder in this build. Replace it in{" "}
            <code className="rounded bg-line/60 px-1 py-0.5 text-[0.8rem] text-ink">
              src/config/site.js
            </code>{" "}
            and connect a form service if you want submissions delivered
            automatically (see README).
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <h3 className="font-serif text-2xl text-ink">{heading}</h3>
      <p className="mt-2 text-[0.95rem]">
        Tell us about the project and we will come back to you with next steps.
        Required fields are marked with{" "}
        <span className="text-burnt" aria-hidden="true">
          *
        </span>
        .
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          id={`${idPrefix}-name`}
          label="Full name"
          required
          error={errors.name}
        >
          <input
            ref={setFieldRef("name")}
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            className="field-input"
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
          />
        </Field>

        <Field
          id={`${idPrefix}-email`}
          label="Email address"
          required
          error={errors.email}
        >
          <input
            ref={setFieldRef("email")}
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className="field-input"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={
              errors.email ? `${idPrefix}-email-error` : undefined
            }
          />
        </Field>

        <Field id={`${idPrefix}-phone`} label="Phone number" error={errors.phone}>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field-input"
            value={values.phone}
            onChange={handleChange}
          />
        </Field>

        <Field
          id={`${idPrefix}-service`}
          label="Service type"
          required
          error={errors.service}
        >
          <select
            ref={setFieldRef("service")}
            id={`${idPrefix}-service`}
            name="service"
            className="field-input"
            value={values.service}
            onChange={handleChange}
            aria-invalid={errors.service ? "true" : undefined}
            aria-describedby={
              errors.service ? `${idPrefix}-service-error` : undefined
            }
          >
            {site.quoteServices.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id={`${idPrefix}-description`}
            label="Project description"
            required
            error={errors.description}
            hint="Room dimensions, how you want to use the piece, and any materials you have in mind."
          >
            <textarea
              ref={setFieldRef("description")}
              id={`${idPrefix}-description`}
              name="description"
              rows={5}
              className="field-input resize-y"
              value={values.description}
              onChange={handleChange}
              aria-invalid={errors.description ? "true" : undefined}
              aria-describedby={
                errors.description
                  ? `${idPrefix}-description-error`
                  : `${idPrefix}-description-hint`
              }
            />
          </Field>
        </div>

        <Field
          id={`${idPrefix}-budget`}
          label="Estimated budget"
          hint="Indicative ranges only — not a quotation."
        >
          <select
            id={`${idPrefix}-budget`}
            name="budget"
            className="field-input"
            value={values.budget}
            onChange={handleChange}
          >
            <option value="">Prefer not to say</option>
            {site.quoteBudgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${idPrefix}-contact-method`} label="Preferred contact method">
          <select
            id={`${idPrefix}-contact-method`}
            name="contactMethod"
            className="field-input"
            value={values.contactMethod}
            onChange={handleChange}
          >
            <option value="">No preference</option>
            {site.quoteContactMethods.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${idPrefix}-timeframe`}
          label="Preferred project timeframe"
        >
          <select
            id={`${idPrefix}-timeframe`}
            name="timeframe"
            className="field-input"
            value={values.timeframe}
            onChange={handleChange}
          >
            <option value="">Not decided yet</option>
            {site.quoteTimeframes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${idPrefix}-location`} label="Project location">
          <input
            id={`${idPrefix}-location`}
            name="location"
            type="text"
            autoComplete="address-level2"
            className="field-input"
            placeholder="Town or area"
            value={values.location}
            onChange={handleChange}
          />
        </Field>
      </div>

      {errorCount > 0 ? (
        <p className="mt-4 text-sm font-medium text-[#8f2a1f]" role="alert">
          {errorCount === 1
            ? "Please check the highlighted field."
            : `Please check the ${errorCount} highlighted fields.`}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={status === "preparing"}
        >
          {status === "preparing" ? "Preparing your request…" : "Send request"}
          <Icon name="arrow-right" size={18} />
        </Button>
        <p className="text-xs text-muted">
          We only use your details to answer this enquiry.
        </p>
      </div>

      <p className="mt-4 rounded-lg border border-line bg-ivory/70 p-3 text-xs text-muted">
        This form prepares an email for you to send from your own email app —
        nothing is transmitted or stored by this website yet. Reference images
        can be attached to that email, or mentioned in your description.
      </p>
    </form>
  );
}
