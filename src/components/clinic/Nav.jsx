import { Link } from "react-router-dom";
import CtaButton from "../CtaButton";
import { CONTACT_EMAIL } from "../../constants";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-charcoal/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Dropoff<span className="text-gold">Audit</span>
        </Link>
        <div className="hidden flex-1 justify-center md:flex">
          <a
            href={CONTACT_EMAIL}
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Contact
          </a>
        </div>
        <CtaButton
          href="#protocol"
          variant="gold"
          className="!px-4 !py-2.5 !text-xs sm:!text-sm"
        >
          Get The Audit
        </CtaButton>
      </nav>
    </header>
  );
}
