import ClinicCtaButton from "./ClinicCtaButton";

export default function FinalCta() {
  return (
    <>
      <section className="border-t border-zinc-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl md:text-4xl">
            Seal the leaks in your patient acquisition funnel.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-zinc-600">
            Stop subsidizing competitors with high-intent patient traffic your
            Booking Infrastructure cannot convert.
          </p>
          <div className="mt-10 flex justify-center">
            <ClinicCtaButton>Secure Your $149 Audit</ClinicCtaButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white py-8 text-center">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} DropoffAudit. All rights reserved.
        </p>
      </footer>
    </>
  );
}
