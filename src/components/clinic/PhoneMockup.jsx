export default function PhoneMockup() {
  return (
    <div
      className="relative mx-auto w-[min(100%,280px)]"
      aria-hidden="true"
    >
      <div className="relative rounded-[2.75rem] border-[3px] border-zinc-700 bg-zinc-900 p-2 shadow-2xl shadow-black/50">
        <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-zinc-950" />
        <div className="overflow-hidden rounded-[2.25rem] bg-white">
          <div className="flex h-[420px] flex-col bg-white sm:h-[460px]">
            <div className="border-b border-zinc-100 px-4 py-3">
              <div className="mx-auto h-2 w-16 rounded-full bg-zinc-200" />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
              <div className="h-3 w-3/4 rounded bg-zinc-100" />
              <div className="h-3 w-1/2 rounded bg-zinc-100" />
              <div className="mt-4 flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50">
                <span className="sr-only">Blank booking widget area</span>
              </div>
              <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Booking widget failed to load
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-zinc-600" />
      </div>
      <div className="absolute -right-2 top-16 rounded-lg border border-red-500/30 bg-red-950/90 px-3 py-2 text-xs font-semibold text-red-300 shadow-lg">
        Safari blocked
      </div>
    </div>
  );
}
