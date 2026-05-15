import ClinicCtaButton from "./ClinicCtaButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-medical/30 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Medical Spa Booking Infrastructure
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Stop Losing High-Value Patients to a Broken Booking Widget.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          70% of your website traffic is mobile. If you use an iframe booking
          widget (like Boulevard or Mindbody), Apple Safari is blocking it. We
          rebuild medical spa digital infrastructure to capture lost revenue.
        </p>
        <div className="mt-10">
          <ClinicCtaButton>
            Get The $149 Booking Infrastructure Audit
          </ClinicCtaButton>
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          Clinical Unit Economics review · Patient Acquisition Cost (CAC)
          diagnostics · HIPAA-aware architecture
        </p>
      </div>
    </section>
  );
}
