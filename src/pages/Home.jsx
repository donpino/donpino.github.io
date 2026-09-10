import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import { CONTACT_EMAIL, SAAS_STRIPE_URL } from "../constants";

const PROCESS_STEPS = [
  {
    title: "Friction Mapping",
    description:
      "I inspect your acquisition-to-booking flow to isolate every hesitation point that suppresses intent.",
  },
  {
    title: "Conversion Rebuild",
    description:
      "I redesign key interfaces with tighter messaging hierarchy and lower cognitive load to accelerate action.",
  },
  {
    title: "Revenue Scaling",
    description:
      "Once the flow is corrected, your paid traffic converts with greater consistency into qualified opportunities.",
  },
];

const CHECKOUT_ITEMS = [
  "Full Funnel Friction Map",
  "High-Converting UI/UX Wireframes",
  "Direct-Response Copywriting Overhaul",
  "Technical SEO & AI Discoverability Check",
];

function HomeNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-charcoal/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Dropoff<span className="text-gold">Audit</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#process" className="transition hover:text-white">
            Protocol
          </a>
          <Link to="/clinic-audit" className="transition hover:text-white">
            Med Spa Audit
          </Link>
          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
          <a href={CONTACT_EMAIL} className="transition hover:text-white">
            Contact
          </a>
        </div>
        <CtaButton
          href="#pricing"
          variant="gold"
          className="!px-4 !py-2.5 !text-xs sm:!text-sm"
        >
          Get The Audit
        </CtaButton>
      </nav>
    </header>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal font-sans text-white antialiased">
      <HomeNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-charcoal pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            aria-hidden="true"
          >
            <div className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-medical/25 blur-[100px]" />
          </div>
          <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
              Conversion Engineering for Premium Funnels
            </p>
            <h1 className="mx-auto max-w-4xl text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Elite Conversion Optimization For High-Ticket Brands
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              I diagnose funnel friction, rebuild UX, and turn your existing ad
              traffic into bottom-line growth.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaButton href="#pricing">Get The Audit</CtaButton>
            </div>
          </div>
        </section>

        {/* Process */}
        <section
          id="process"
          className="border-t border-white/8 bg-charcoal py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                The DropoffAudit Protocol
              </h2>
              <p className="mt-4 text-base text-zinc-400">
                I do not guess. I engineer conversion in sequence.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {PROCESS_STEPS.map((step) => (
                <article
                  key={step.title}
                  className="border border-white/10 bg-charcoal-light p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-gold/30 bg-charcoal">
                    <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing / Checkout */}
        <section
          id="pricing"
          className="bg-white py-16 text-charcoal scroll-mt-24 sm:py-24"
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-medical">
                Productized Service
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                DropoffAudit Conversion System
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600">
                Full funnel teardown, friction mapping, and high-converting UI
                rebuild designed to turn paid traffic into qualified
                opportunities.
              </p>
            </div>

            <div className="mt-10 border border-zinc-200 bg-zinc-50/80 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                What You Get
              </p>
              <ul className="mt-4 space-y-3">
                {CHECKOUT_ITEMS.map((item, i) => (
                  <li
                    key={item}
                    className={`pb-3 text-charcoal ${
                      i < CHECKOUT_ITEMS.length - 1
                        ? "border-b border-zinc-200"
                        : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-end justify-between border-t border-zinc-200 pt-4">
                <span className="font-medium text-charcoal">Today</span>
                <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  $149{" "}
                  <span className="text-base font-normal text-zinc-500">
                    one-time fee
                  </span>
                </p>
              </div>
            </div>

            <p className="mt-8 text-left text-sm leading-relaxed text-zinc-600">
              Why $149? It's priced to be an easy yes. If it's useful, the
              $5,000 full rebuild is there when you're ready.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <CtaButton href={SAAS_STRIPE_URL}>Get The Audit</CtaButton>
              <Link
                to="/clinic-audit"
                className="text-sm font-medium text-medical underline-offset-4 hover:underline"
              >
                Med Spa? View the Booking Infrastructure Audit →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8 text-center">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} DropoffAudit. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
