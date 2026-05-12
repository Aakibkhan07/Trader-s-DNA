import { Navigation, Hero, AlgoShowcase, AIAnalysisShowcase, TraderPersonality, DNABreakdown, EmotionalIntelligence, DisciplineTracker, RiskManagement, AIMentor, PerformanceGenome, Testimonials, FAQ, CTA, Footer } from '@/components/landing'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navigation />
      <Hero />
      <AlgoShowcase />
      <AIAnalysisShowcase />
      <TraderPersonality />
      <DNABreakdown />
      <EmotionalIntelligence />
      <DisciplineTracker />
      <RiskManagement />
      <AIMentor />
      <PerformanceGenome />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}