import { ui } from "@/components/ui";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { DifferentiatorSection } from "@/components/landing/DifferentiatorSection";
import { GuaranteeSection } from "@/components/landing/GuaranteeSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { OfferSection } from "@/components/landing/OfferSection";
import { ProgressTimelineSection } from "@/components/landing/ProgressTimelineSection";
import { ToolsSection } from "@/components/landing/ToolsSection";

export function LandingPage() {
  return (
    <div className={ui.landingPage}>
      <div className={ui.landingInner}>
        <HeroSection />
        <DifferentiatorSection />
        <OfferSection />
        <ProgressTimelineSection />
        <GuaranteeSection />
        <ToolsSection />
        <CommunitySection />
        <LandingFooter />
      </div>
    </div>
  );
}
