const cards = [
  {
    stat: "$150 – $200",
    label: "CPA",
    description:
      "The true cost to acquire a booked aesthetic patient.",
  },
  {
    stat: "53%",
    label: "Drop-off",
    description:
      "The abandonment rate when a mobile booking flow takes longer than 3 seconds to load.",
  },
  {
    stat: "$3,000+",
    label: "Monthly Leakage",
    description:
      "The minimum lost revenue from failed mobile bookings.",
  },
];

export default function MathSection() {
  return (
    <section className="bg-white py-16 text-charcoal sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-medical">
          Clinical Unit Economics
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          The Financial Impact
        </h2>
        <p className="mt-4 max-w-2xl text-base text-zinc-600">
          Patient Acquisition Cost (CAC) only works when your Booking
          Infrastructure converts high-intent patient traffic on mobile.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.label}
              className="border border-zinc-200 bg-zinc-50/80 p-6 sm:p-8"
            >
              <p className="text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
                {card.stat}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-medical">
                {card.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
