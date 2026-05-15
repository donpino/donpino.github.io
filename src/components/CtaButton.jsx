export default function CtaButton({
  href,
  children,
  className = "",
  variant = "gold",
}) {
  const variants = {
    gold:
      "bg-gold text-charcoal hover:bg-gold-light border border-gold-light/40 shadow-[0_8px_32px_rgba(196,163,90,0.25)]",
    outline:
      "border border-white/25 bg-transparent text-white hover:border-gold/50 hover:text-gold-light",
    medical:
      "bg-medical text-white hover:bg-medical-light border border-medical-light/40",
  };

  return (
    <a
      href={href}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-sm px-6 py-3.5 text-center text-sm font-semibold tracking-wide transition-colors duration-200 sm:px-8 sm:text-base ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
