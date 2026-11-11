import CartDrawer from "@/components/pear/CartDrawer";
import CtaFooter from "@/components/pear/CtaFooter";
import Header from "@/components/pear/Header";
import ProductHero from "@/components/pear/ProductHero";
import {
  ClosingCta,
  CompareSection,
  FamiliesSection,
  FaqSection,
  PromiseSection,
  ReviewsSection,
  SpecsSection,
  StepsSection,
  StorySection,
} from "@/components/pear/Sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#23271C]">
      <Header />
      <CartDrawer />
      <main>
        <ProductHero />
        <StorySection />
        <StepsSection />
        <PromiseSection />
        <SpecsSection />
        <CompareSection />
        <ReviewsSection />
        <FamiliesSection />
        <FaqSection />
        <ClosingCta />
      </main>
      <CtaFooter />
    </div>
  );
}
