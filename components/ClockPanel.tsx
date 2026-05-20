import { displayDate, displayLargeTime } from "@/features/attendance/date";

export function ClockPanel({ now }: { now: Date }) {
  const time = displayLargeTime(now);

  return (
    <section className="rounded-sm bg-zinc-900/90 px-4 py-4 text-white shadow-lg sm:px-7 sm:py-5">
      <p
        suppressHydrationWarning
        className="text-center text-2xl font-semibold tracking-wide sm:text-4xl lg:text-5xl"
      >
        {displayDate(now)}
      </p>
      <div
        suppressHydrationWarning
        className="mt-3 grid grid-cols-[max-content_max-content_max-content_max-content_max-content] items-baseline justify-center gap-1 text-center text-[#ff9d1c] [font-family:var(--font-clock),Arial,sans-serif] [font-variant-numeric:tabular-nums] sm:gap-2"
      >
        <span className="text-7xl font-normal leading-none sm:text-8xl md:text-9xl lg:text-[9.5rem]">
          {time.hour}
        </span>
        <span className="text-6xl font-normal leading-none sm:text-7xl md:text-8xl lg:text-[8rem]">
          :
        </span>
        <span className="text-7xl font-normal leading-none sm:text-8xl md:text-9xl lg:text-[9.5rem]">
          {time.minute}
        </span>
        <span className="text-4xl font-normal leading-none sm:text-5xl md:text-6xl">
          :
        </span>
        <span className="text-4xl font-normal leading-none sm:text-5xl md:text-6xl">
          {time.second}
        </span>
      </div>
    </section>
  );
}
