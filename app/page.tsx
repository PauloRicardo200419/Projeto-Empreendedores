import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { WhatsAppChaos } from './components/landing/WhatsAppChaos';
import { GuestExperience } from './components/landing/GuestExperience';
import { Features } from './components/landing/Features';
import { TimeSimulator } from './components/landing/TimeSimulator';
import { ProductDashboard } from './components/landing/ProductDashboard';
import { LeadForm } from './components/landing/LeadForm';
import { Footer } from './components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WhatsAppChaos />
        <GuestExperience />
        <Features />
        <TimeSimulator />
        <ProductDashboard />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
