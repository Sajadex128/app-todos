/**
 * Persian number/date formatting helpers.
 *
 * The site is presented in Persian, so every number a visitor sees (years,
 * counts, positions) is rendered with Persian-Indic digits.
 */
const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** "3" → "۳", "12" → "۱۲" */
export function faNumber(value) {
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

/** Current Jalali year in Persian digits, e.g. "۱۴۰۵". */
export function faYear(date = new Date()) {
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(date);
}
