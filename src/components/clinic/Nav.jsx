import { Link } from "react-router-dom";
import ClinicCtaButton from "./ClinicCtaButton";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-charcoal/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Dropoff<span className="text-gold">Audit</span>
        </Link>
        <ClinicCtaButton className="!px-4 !py-2.5 !text-xs sm:!text-sm">
          Get The Audit
        </ClinicCtaButton>
      </nav>
    </header>
  );
}
