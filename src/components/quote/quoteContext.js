import { createContext, useContext } from "react";

/**
 * Shared state for the quote request flow.
 *
 * Lives in a plain module (no JSX) so the provider component file can export
 * only components, which keeps fast-refresh clean.
 */
export const QuoteContext = createContext(null);

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) {
    throw new Error("useQuote must be used inside <QuoteProvider>");
  }
  return value;
}
