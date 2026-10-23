import { useQuote } from "./quoteContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import QuoteForm from "./QuoteForm";

/** Dialog wrapper around the shared quote form. */
export default function QuoteModal() {
  const { isOpen, service, closeQuote } = useQuote();

  return (
    <Modal
      open={isOpen}
      onClose={closeQuote}
      labelledBy="quote-modal-title"
      panelClassName="max-w-2xl"
    >
      <div className="card overflow-hidden">
        <div className="flex items-start justify-between gap-4 bg-espresso px-5 py-4 text-cream sm:px-6">
          <div>
            <p className="eyebrow text-amber">درخواست قیمت</p>
            <p
              id="quote-modal-title"
              className="mt-1 font-serif text-lg text-cream"
            >
              درباره‌ی پروژه‌تان بگویید
            </p>
          </div>
          <Button
            variant="light"
            size="sm"
            onClick={closeQuote}
            aria-label="بستن فرم درخواست قیمت"
            className="shrink-0"
          >
            <Icon name="close" size={18} />
          </Button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-6">
          <QuoteForm
            idPrefix="quote-modal"
            preselectedService={service}
            heading="جزئیات پروژه‌ی شما"
          />
        </div>
      </div>
    </Modal>
  );
}
