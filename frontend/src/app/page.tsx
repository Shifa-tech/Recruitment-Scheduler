
import Link from "next/link";

const features = [
  {
    number: "I",
    title: "The First Trial",
    subtitle: "Enter the Order",
    description:
      "Candidates, interviewers and coordinators enter a shared recruitment sanctuary.",
  },
  {
    number: "II",
    title: "The Mystic Alignment",
    subtitle: "Find Your Time",
    description:
      "An intelligent scheduling engine aligns availability, skills and interview rooms.",
  },
  {
    number: "III",
    title: "The Final Judgement",
    subtitle: "Reveal Your Potential",
    description:
      "Structured evaluations and multiple interview rounds bring clarity to every decision.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#171613] text-[#F0E5CE]">
      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center
        justify-between border-b border-[#D5AE65]/20 px-6 py-5 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center
            rounded-full border border-[#D5AE65] text-xl text-[#D5AE65]">
            ✳
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">
            The Ancient One&apos;s Trials
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-[#C4BBA8] md:flex">
          <a href="#trials" className="transition hover:text-[#D5AE65]">
            The Trials
          </a>
          <a href="#about" className="transition hover:text-[#D5AE65]">
            Our Purpose
          </a>
        </div>

        <Link
          href="/login"
          className="border border-[#D5AE65]/60 px-5 py-2.5 text-xs
            uppercase tracking-[0.15em] transition hover:bg-[#D5AE65]
            hover:text-[#171613]"
        >
          Enter Sanctum ↗
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative isolate flex min-h-[680px] items-center">
        {/* Atmospheric background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgba(157,63,42,0.24),transparent_48%),radial-gradient(ellipse_at_20%_90%,rgba(213,174,101,0.10),transparent_45%)]" />

        <div className="absolute right-[-100px] top-24 -z-10 h-[420px]
          w-[420px] rounded-full border border-[#D5AE65]/10
          md:right-[8%] md:h-[520px] md:w-[520px]">
          <div className="absolute inset-8 rounded-full border border-[#D5AE65]/15" />
          <div className="absolute inset-16 rounded-full border border-[#D5AE65]/20" />
          <div className="absolute inset-28 rounded-full border border-[#D5AE65]/10" />
          <div className="absolute inset-0 animate-[spin_90s_linear_infinite]
            rounded-full border border-dashed border-[#D5AE65]/20" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-24
          md:grid-cols-[1.2fr_0.8fr] md:items-center lg:px-12">
          <div>
            <p className="mb-7 flex items-center gap-3 text-xs uppercase
              tracking-[0.32em] text-[#D5AE65]">
              <span className="h-px w-10 bg-[#D5AE65]" />
              A new order of recruitment
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-medium
              leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Every Trial
              <br />
              Reveals a
              <br />
              <span className="italic text-[#D5AE65]">True Potential.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#C4BBA8]
              sm:text-lg">
              Where skill meets opportunity and chaos meets order.
              Discover a smarter way to orchestrate recruitment through
              intelligent scheduling, balanced interview panels and
              meaningful evaluations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#trials"
                className="border border-[#F0E5CE]/25 px-7 py-4 text-sm
                  transition hover:border-[#D5AE65] hover:text-[#D5AE65]"
              >
                Discover the Order
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3
              text-xs uppercase tracking-[0.15em] text-[#938A79]">
              <span>✧ Intelligent Scheduling</span>
              <span>✧ Fair Evaluations</span>
            </div>
          </div>

          {/* Decorative emblem */}
          <div className="relative hidden min-h-[440px] items-center
            justify-center md:flex">
            <div className="absolute h-72 w-72 rotate-45 border
              border-[#D5AE65]/25" />
            <div className="absolute h-72 w-72 -rotate-45 border
              border-[#D5AE65]/25" />

            <div className="relative flex h-64 w-64 items-center
              justify-center rounded-full border border-[#D5AE65]/60
              bg-[#171613]/60 shadow-[0_0_90px_rgba(213,174,101,0.08)]">
              <div className="absolute inset-4 rounded-full border
                border-dashed border-[#D5AE65]/35" />
              <div className="absolute inset-9 rounded-full border
                border-[#D5AE65]/30" />
              <div className="text-center">
                <div className="text-6xl text-[#D5AE65]">✳</div>
                <p className="mt-4 text-xs uppercase tracking-[0.3em]">
                  Order of
                </p>
                <p className="mt-2 font-serif text-2xl italic">
                  Excellence
                </p>
              </div>
            </div>

            <span className="absolute left-2 top-16 text-xs tracking-[0.3em]
              text-[#D5AE65]/60">
              WISDOM
            </span>
            <span className="absolute bottom-12 right-0 text-xs
              tracking-[0.3em] text-[#D5AE65]/60">
              PRECISION
            </span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 lg:px-12">
        <div className="h-px flex-1 bg-[#D5AE65]/25" />
        <span className="text-lg text-[#D5AE65]">✧</span>
        <div className="h-px flex-1 bg-[#D5AE65]/25" />
      </div>

      {/* Trials */}
      <section id="trials" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
            The path to excellence
          </p>
          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
            Three Trials. One Order.
          </h2>
          <p className="mt-5 leading-7 text-[#B9B09F]">
            Every successful recruitment journey requires structure,
            precision and the right judgement.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group border border-[#D5AE65]/20 bg-[#211F1A]
                p-7 transition duration-300 hover:-translate-y-1
                hover:border-[#D5AE65]/70"
            >
              <span className="font-serif text-4xl italic text-[#D5AE65]">
                {feature.number}
              </span>
              <div className="my-7 h-px bg-[#D5AE65]/20
                transition group-hover:bg-[#D5AE65]/60" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#D5AE65]">
                {feature.subtitle}
              </p>
              <h3 className="mt-3 font-serif text-2xl">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#B9B09F]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Purpose */}
      <section id="about" className="border-t border-[#D5AE65]/15
        bg-[#211F1A] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-3xl text-[#D5AE65]">✧</span>
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
            Order in Every Decision.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#B9B09F]">
            Bring candidates, interviewers and coordinators into one
            intelligent recruitment system. Resolve schedule conflicts,
            coordinate interview panels and make every round count.
          </p>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col justify-between gap-3 px-6 py-6
        text-xs text-[#938A79] sm:flex-row lg:px-12">
        <span>THE ANCIENT ONE&apos;S TRIALS</span>
        <span>Wisdom · Precision · Opportunity</span>
        <span>Built for a better recruitment journey.</span>
      </footer>
    </main>
  );
}
