import {
  Navbar,
  HeroSection,
  StackSection,
  WorkSection,
  ExperienceSection,
  TeamSection,
  ContactSection,
  Footer,
} from '@/components/home_widgets'

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <StackSection />
      {/* <WorkSection /> */}
      <ExperienceSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
