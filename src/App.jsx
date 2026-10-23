import BackToTop from "./components/layout/BackToTop";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import QuoteProvider from "./components/quote/QuoteProvider";
import About from "./components/sections/About";
import ContactSection from "./components/sections/ContactSection";
import FaqAccordion from "./components/sections/FaqAccordion";
import FeatureCards from "./components/sections/FeatureCards";
import FinalCta from "./components/sections/FinalCta";
import Hero from "./components/sections/Hero";
import Portfolio from "./components/sections/Portfolio";
import ProcessSteps from "./components/sections/ProcessSteps";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import WoodBanner from "./components/sections/WoodBanner";

export default function App() {
  return (
    <QuoteProvider>
      <a
        href="#main"
        className="absolute left-4 top-3 z-[60] -translate-y-24 rounded-lg bg-cream px-4 py-2.5 font-semibold text-ink shadow-card transition-transform duration-200 focus:translate-y-0"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <FeatureCards />
        <Services />
        <WoodBanner />
        <About />
        <Portfolio />
        <ProcessSteps />
        <WhyChooseUs />
        <Testimonials />
        <FaqAccordion />
        <FinalCta />
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />
    </QuoteProvider>
  );
}
