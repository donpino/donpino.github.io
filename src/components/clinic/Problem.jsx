import PhoneMockup from "./PhoneMockup";

export default function Problem() {
  return (
    <section
      id="problem"
      className="scroll-mt-24 border-t border-white/8 bg-charcoal-light py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-400/90">
            The Bleeding Neck
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            The Safari Cookie Block
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Modern iOS browsers block third-party cookies by default. That can
            break an embedded booking widget on iPhone before it ever loads.
            When it does, a patient who was ready to book sees a blank screen
            and bounces to your competitor.
          </p>
          <ul className="mt-8 space-y-3 border-l border-gold/30 pl-5 text-sm text-zinc-300 sm:text-base">
            <li>High-intent patient traffic can hit a dead iframe</li>
            <li>Booking widgets are vulnerable under ITP constraints</li>
            <li>Every bounce is a patient acquisition cost you already paid for</li>
          </ul>
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
