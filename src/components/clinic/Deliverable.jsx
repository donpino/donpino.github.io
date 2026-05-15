import ClinicCtaButton from "./ClinicCtaButton";

const deliverables = [
  "Mobile Render Testing across iOS Safari & Chrome.",
  "Iframe Vulnerability Check & API Bridge Analysis.",
  "Pricing Transparency & Patient Friction Mapping.",
  "A step-by-step architectural roadmap to replace your iframe with a native, HIPAA-compliant booking flow.",
];

export default function Deliverable() {
  return (
    <section className="border-t border-white/8 bg-charcoal py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          The $149 Revenue Rescue Audit
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          The Diagnostic Protocol
        </h2>
        <p className="mt-4 max-w-2xl text-base text-zinc-400">
          A forensic review of your patient acquisition funnel—built for
          aesthetic clinics running paid traffic into legacy booking widgets.
        </p>

        <ul className="mt-10 space-y-4 border-t border-white/10 pt-10">
          {deliverables.map((item) => (
            <li
              key={item}
              className="flex gap-4 text-sm leading-relaxed text-zinc-300 sm:text-base"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-3xl font-semibold text-white">
            $149{" "}
            <span className="text-base font-normal text-zinc-500">
              one-time diagnostic
            </span>
          </p>
          <ClinicCtaButton>
            Get The $149 Booking Infrastructure Audit
          </ClinicCtaButton>
        </div>
      </div>
    </section>
  );
}
