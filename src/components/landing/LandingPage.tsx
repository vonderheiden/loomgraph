import { NavigationProps } from '../../types/landing.types';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { ProblemSection } from './ProblemSection';
import { SolutionSection } from './SolutionSection';
import { BenefitsSection } from './BenefitsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { SocialProofSection } from './SocialProofSection';
import { FAQSection } from './FAQSection';
import { FinalCTASection } from './FinalCTASection';
import { Footer } from './Footer';

/**
 * LandingPage container component that composes all landing page sections.
 * 
 * This component serves as the main entry point for new visitors, presenting
 * a structured narrative flow: problem → solution → benefits → social proof → CTA.
 * 
 * Requirements: 12.1, 14.1, 17.4
 * 
 * @param onNavigate - Callback function to navigate to the generator view
 */
export function LandingPage({ onNavigate }: NavigationProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Fixed header with navigation and CTA */}
      <Header onNavigate={onNavigate} />
      
      {/* Main content area with semantic HTML */}
      <main>
        {/* Hero section - above the fold */}
        <HeroSection onNavigate={onNavigate} />
        
        {/* Problem section - pain points */}
        <ProblemSection />
        
        {/* Solution section - value proposition */}
        <SolutionSection />
        
        {/* Benefits section - feature benefits */}
        <BenefitsSection />
        
        {/* How It Works section - process steps */}
        <HowItWorksSection />
        
        {/* Templates section placeholder - for future template showcase */}
        <section id="templates" aria-label="Templates (coming soon)">
          {/* This section will be populated in a future phase */}
        </section>
        
        {/* Social Proof section - testimonials */}
        <SocialProofSection />
        
        {/* FAQ section - questions and answers */}
        <FAQSection />
        
        {/* Pricing section placeholder - for future pricing information */}
        <section id="pricing" aria-label="Pricing (coming soon)">
          {/* This section will be populated in a future phase */}
        </section>
        
        {/* Final CTA section - bottom conversion */}
        <FinalCTASection onNavigate={onNavigate} />
      </main>
      
      {/* Footer with coming soon and copyright */}
      <Footer />
    </div>
  );
}
