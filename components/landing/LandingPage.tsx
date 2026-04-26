import { ui } from "@/components/ui";
import { AppShowcaseSection } from "@/components/landing/AppShowcaseSection";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { CoachGalleryFab } from "@/components/landing/CoachGalleryFab";
import { CyclePhaseGuideSection } from "@/components/landing/CyclePhaseGuideSection";
import { DifferentiatorSection } from "@/components/landing/DifferentiatorSection";
import { GuaranteeSection } from "@/components/landing/GuaranteeSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { WorriesMarqueeSection } from "@/components/landing/WorriesMarqueeSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { OfferSection } from "@/components/landing/OfferSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProgressTimelineSection } from "@/components/landing/ProgressTimelineSection";
import { ToolsSection } from "@/components/landing/ToolsSection";
import { VolumeCoachingPackagesSection } from "@/components/landing/VolumeCoachingPackagesSection";

export function LandingPage() {
  return (
    <div className={ui.landingPage}>
      <div className={ui.landingInner}>
        <HeroSection />
        <WorriesMarqueeSection />
        <DifferentiatorSection />
        <OfferSection />
        <CyclePhaseGuideSection />
        <VolumeCoachingPackagesSection />
        <PricingSection />
        <ProgressTimelineSection />
        <AppShowcaseSection />
        <GuaranteeSection />
        <ToolsSection />
        <CommunitySection />
        <LandingFooter />
      </div>
      <CoachGalleryFab />
    </div>
  );
}
