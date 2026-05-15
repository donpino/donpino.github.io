import Nav from "../components/clinic/Nav";
import Hero from "../components/clinic/Hero";
import Problem from "../components/clinic/Problem";
import MathSection from "../components/clinic/MathSection";
import Deliverable from "../components/clinic/Deliverable";
import FinalCta from "../components/clinic/FinalCta";

export default function ClinicAudit() {
  return (
    <div className="min-h-screen bg-charcoal font-sans text-white antialiased">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <MathSection />
        <Deliverable />
        <FinalCta />
      </main>
    </div>
  );
}
