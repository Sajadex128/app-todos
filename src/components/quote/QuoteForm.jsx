import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "../../config/site";
import { faNumber } from "../../utils/format";
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
    errors.name = "لطفاً نام خود را وارد کنید.";
  }
  if (!values.email.trim()) {
    errors.email = "برای پاسخ دادن، نشانی ایمیل‌تان را وارد کنید.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "این نشانی ایمیل کامل به نظر نمی‌رسد — لطفاً بررسی کنید.";
  }
  if (!values.service) {
    errors.service = "لطفاً خدمت مورد نیاز خود را انتخاب کنید.";
  }
  if (!values.description.trim()) {
    errors.description = "لطفاً پروژه را در چند کلمه توضیح دهید.";
  } else if (values.description.trim().length < 20) {
    errors.description = "توضیح کمی بیشتر به ما کمک می‌کند دقیق‌تر قیمت بدهیم.";
  }
  return errors;
}

/** Human-readable request, used for the email body and the copy button. */
function buildMessage(values) {
  const rows = [
    ["نام", values.name],
    ["ایمیل", values.email],
    values.phone ? ["تلفن", values.phone] : null,
    ["خدمت", values.service],
    values.budget ? ["محدوده‌ی بودجه", values.budget] : null,
    values.contactMethod ? ["روش تماس ترجیحی", values.contactMethod] : null,
    values.timeframe ? ["بازه‌ی زمانی", values.timeframe] : null,
    values.location ? ["محل پروژه", values.location] : null,
  ].filter(Boolean);

  return [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "توضیح پروژه:",
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
          <span className="font-normal text-muted/80"> (اختیاری)</span>
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
 * transmitted by the site itself. See README → "اتصال ارسال درخواست قیمت".
 */
export default function QuoteForm({
  idPrefix = "quote",
  preselectedService,
  heading = "درخواست قیمت رایگان",
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
              درخواست شما آماده‌ی ارسال است
            </h3>
            <p className="mt-2 text-[0.95rem]">
              اطلاعات شما را در یک ایمیل کامل قرار دادیم. هنوز چیزی ارسال نشده
              است — تصمیم نهایی با خود شماست.
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
              باز کردن در برنامه‌ی ایمیل شما
            </Button>
          ) : null}
          <Button variant="outline" onClick={handleCopy}>
            <Icon name="copy" size={18} />
            {copyState === "copied" ? "جزئیات کپی شد" : "کپی جزئیات"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            ویرایش درخواست
          </Button>
        </div>

        <p className="mt-3 text-sm text-muted" role="status" aria-live="polite">
          {copyState === "copied"
            ? "جزئیات درخواست در حافظه‌ی موقت شما کپی شد."
            : null}
          {copyState === "failed"
            ? "مرورگر شما دسترسی به حافظه‌ی موقت را مسدود کرده — همچنان می‌توانید متن ایمیل آماده‌شده را انتخاب و کپی کنید."
            : null}
        </p>

        <div className="mt-5 rounded-lg border border-line bg-ivory/70 p-4 text-sm">
          <p className="font-semibold text-ink">پیش از انتشار نهایی</p>
          <p className="mt-1">
            ارسال خودکار هنوز متصل نیست: این وب‌سایت پاسخ‌های فرم را ذخیره
            نمی‌کند و خودش ایمیلی به کارگاه نمی‌فرستد. پیام آماده‌شده به{" "}
            <span className="font-medium text-ink">
              {site.contact.email || "ایمیل کارگاه"}
            </span>{" "}
            ارسال می‌شود که در این نسخه همچنان یک نشانی نمونه است. آن را در{" "}
            <code className="rounded bg-line/60 px-1 py-0.5 text-[0.8rem] text-ink">
              src/config/site.js
            </code>{" "}
            جایگزین کنید و برای ارسال خودکار، یک سرویس فرم متصل کنید (به فایل
            README مراجعه کنید).
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <h3 className="font-serif text-2xl text-ink">{heading}</h3>
      <p className="mt-2 text-[0.95rem]">
        درباره‌ی پروژه برای ما بنویسید تا با قدم‌های بعدی به شما پاسخ دهیم.
        فیلدهای الزامی با{" "}
        <span className="text-burnt" aria-hidden="true">
          *
        </span>{" "}
        مشخص شده‌اند.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          id={`${idPrefix}-name`}
          label="نام و نام خانوادگی"
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
          label="نشانی ایمیل"
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

        <Field
          id={`${idPrefix}-phone`}
          label="شماره‌ی تلفن"
          error={errors.phone}
        >
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
          label="نوع خدمت"
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
            label="توضیح پروژه"
            required
            error={errors.description}
            hint="ابعاد فضا، این‌که می‌خواهید از قطعه چطور استفاده کنید و متریالی که در ذهن دارید."
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
          label="بودجه‌ی برآوردی"
          hint="فقط محدوده‌های تقریبی — به‌معنای قیمت قطعی نیست."
        >
          <select
            id={`${idPrefix}-budget`}
            name="budget"
            className="field-input"
            value={values.budget}
            onChange={handleChange}
          >
            <option value="">ترجیح می‌دهم نگویم</option>
            {site.quoteBudgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${idPrefix}-contact-method`} label="روش تماس ترجیحی">
          <select
            id={`${idPrefix}-contact-method`}
            name="contactMethod"
            className="field-input"
            value={values.contactMethod}
            onChange={handleChange}
          >
            <option value="">تفاوتی ندارد</option>
            {site.quoteContactMethods.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${idPrefix}-timeframe`}
          label="بازه‌ی زمانی مورد نظر برای پروژه"
        >
          <select
            id={`${idPrefix}-timeframe`}
            name="timeframe"
            className="field-input"
            value={values.timeframe}
            onChange={handleChange}
          >
            <option value="">هنوز تصمیم نگرفته‌ام</option>
            {site.quoteTimeframes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${idPrefix}-location`} label="محل پروژه">
          <input
            id={`${idPrefix}-location`}
            name="location"
            type="text"
            autoComplete="address-level2"
            className="field-input"
            placeholder="شهر یا منطقه"
            value={values.location}
            onChange={handleChange}
          />
        </Field>
      </div>

      {errorCount > 0 ? (
        <p className="mt-4 text-sm font-medium text-[#8f2a1f]" role="alert">
          {errorCount === 1
            ? "لطفاً فیلد مشخص‌شده را بررسی کنید."
            : `لطفاً ${faNumber(errorCount)} فیلد مشخص‌شده را بررسی کنید.`}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={status === "preparing"}
        >
          {status === "preparing" ? "در حال آماده‌سازی درخواست…" : "ارسال درخواست"}
          <Icon name="arrow-right" size={18} className="icon-flip" />
        </Button>
        <p className="text-xs text-muted">
          از اطلاعات شما فقط برای پاسخ دادن به همین درخواست استفاده می‌کنیم.
        </p>
      </div>

      <p className="mt-4 rounded-lg border border-line bg-ivory/70 p-3 text-xs text-muted">
        این فرم یک ایمیل آماده می‌کند تا خودتان از برنامه‌ی ایمیل‌تان ارسال
        کنید — هنوز هیچ اطلاعاتی توسط این وب‌سایت ارسال یا ذخیره نمی‌شود.
        تصاویر نمونه را می‌توانید به همان ایمیل پیوست کنید یا در توضیحات به آن‌ها
        اشاره کنید.
      </p>
    </form>
  );
}
