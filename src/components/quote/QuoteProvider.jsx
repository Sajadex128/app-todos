import { useCallback, useMemo, useState } from "react";
import { QuoteContext } from "./quoteContext";
import { defaultQuoteService } from "../../data/services";
import QuoteModal from "./QuoteModal";

/**
 * Owns which service the quote form should offer and whether the dialog is
 * open, so any CTA on the page can start a pre-filled request.
 */
export default function QuoteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState(defaultQuoteService);

  const openQuote = useCallback((nextService) => {
    setService(nextService || defaultQuoteService);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, service, openQuote, closeQuote }),
    [isOpen, service, openQuote, closeQuote],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal />
    </QuoteContext.Provider>
  );
}
