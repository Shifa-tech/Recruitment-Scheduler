
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const stats = [
  { label: "Upcoming Interviews", value: "02", icon: "◷", note: "Prepare for your next trial" },
  { label: "Rounds Completed", value: "01", icon: "✧", note: "Your journey has begun" },
  { label: "Rounds Remaining", value: "02", icon: "♜", note: "Keep moving forward" },
];

const interviews = [
  {
    round: "ROUND 02",
    name: "Technical Interview",
    date: "30 October 2026",
    time: "10:30 AM – 11:15 AM",
    interviewer: "Interview panel assigned",
    status: "Confirmed",
  },
  {
    round: "ROUND 03",
    name: "HR Interview",
    date: "02 November 2026",
    time: "02:00 PM – 02:30 PM",
    interviewer: "Awaiting assignment",
    status: "Pending",
  },
];

const stages = [
  { name: "Coding Round", detail: "Completed", state: "done" },
  { name: "Technical Round", detail: "Upcoming", state: "current" },
  { name: "HR Round", detail: "Not started", state: "next" },
];

export default function CandidateDashboard() {
  return (
    <DashboardLayout role="Candidate">
      {/* Welcome */}
      <section className="relative overflow-hidden border border-[#D5AE65]/30
        bg-[#211F1A] p-6 text-[#F0E5CE] sm:p-9">
        <div className="pointer-events-none absolute -right-12 -top-20
          h-64 w-64 rounded-full border border-[#D5AE65]/15" />
        <div className="pointer-events-none absolute -right-5 -top-12
          h-48 w-48 rounded-full border border-[#D5AE65]/15" />

        <div className="relative max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D5AE65]">
            ✧ Your recruitment journey
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
            Welcome, Apprentice.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#B9B09F]">
            Every great journey is shaped by preparation, patience and
            perseverance. Your next trial awaits. Are you ready?
          </p>

          <Link
            href="/candidate/interviews"
            className="mt-7 inline-flex items-center gap-3 bg-[#D5AE65]
              px-5 py-3 text-sm font-semibold text-[#171613]
              transition hover:bg-[#E8CC91]"
          >
            View My Interviews <span>→</span>
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-5
              transition hover:border-[#9D3F2A]/40"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-[#756651]">{stat.label}</p>
              <span className="text-2xl text-[#9D3F2A]">{stat.icon}</span>
            </div>
            <p className="mt-4 font-serif text-4xl text-[#29241D]">
              {stat.value}
            </p>
            <p className="mt-3 text-xs text-[#8B7D68]">{stat.note}</p>
          </article>
        ))}
      </section>

      {/* Main content grid */}
      <div className="mt-10 grid gap-8 xl:grid-cols-[1.5fr_1fr]">
        {/* Interviews */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
                Your schedule
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                Upcoming Trials
              </h2>
            </div>
            <Link
              href="/candidate/interviews"
              className="text-xs text-[#9D3F2A] hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-4">
            {interviews.map((interview) => (
              <article
                key={interview.round}
                className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-[#9D3F2A]">
                      {interview.round}
                    </p>
                    <h3 className="mt-2 font-serif text-xl">
                      {interview.name}
                    </h3>
                  </div>

                  <span className={`border px-3 py-1 text-xs ${
                    interview.status === "Confirmed"
                      ? "border-[#52734D]/30 bg-[#E7EDDF] text-[#46633F]"
                      : "border-[#B58A42]/30 bg-[#F7EBD0] text-[#896522]"
                  }`}>
                    {interview.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 text-sm text-[#756651] sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-[#9A8A73]">DATE</p>
                    <p className="mt-1">{interview.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9A8A73]">TIME</p>
                    <p className="mt-1">{interview.time}</p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#E6D8BE] pt-4">
                  <p className="text-xs text-[#8B7D68]">
                    {interview.interviewer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Progress and actions */}
        <aside className="space-y-8">
          <section className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
              Your path
            </p>
            <h2 className="mt-2 font-serif text-2xl">Trial Progress</h2>

            <div className="mt-6 h-1.5 overflow-hidden bg-[#E6D8BE]">
              <div className="h-full w-1/3 bg-[#9D3F2A]" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-[#756651]">1 of 3 rounds completed</span>
              <span className="font-medium text-[#9D3F2A]">33%</span>
            </div>

            <div className="mt-7 space-y-6">
              {stages.map((stage, index) => (
                <div key={stage.name} className="flex items-start gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center
                    justify-center rounded-full border text-sm ${
                      stage.state === "done"
                        ? "border-[#52734D] bg-[#E7EDDF] text-[#46633F]"
                        : stage.state === "current"
                        ? "border-[#9D3F2A] bg-[#9D3F2A] text-white"
                        : "border-[#D5C6AB] text-[#9A8A73]"
                    }`}>
                    {stage.state === "done" ? "✓" : index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{stage.name}</p>
                    <p className="mt-1 text-xs text-[#8B7D68]">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
              Quick access
            </p>
            <h2 className="mt-2 font-serif text-2xl">Choose Your Path</h2>

            <div className="mt-5 space-y-3">
              <Link
                href="/candidate/slots"
                className="flex items-center justify-between border
                  border-[#E6D8BE] p-4 text-sm transition
                  hover:border-[#9D3F2A]/50"
              >
                <span>Explore Available Slots</span>
                <span className="text-[#9D3F2A]">→</span>
              </Link>
              <Link
                href="/candidate/results"
                className="flex items-center justify-between border
                  border-[#E6D8BE] p-4 text-sm transition
                  hover:border-[#9D3F2A]/50"
              >
                <span>Review My Results</span>
                <span className="text-[#9D3F2A]">→</span>
              </Link>
            </div>
          </section>
        </aside>
      </div>

      <footer className="mt-12 border-t border-[#D5AE65]/30 pt-5
        text-xs text-[#8B7D68]">
        THE ANCIENT ONE&apos;S TRIALS · Walk the path with wisdom.
      </footer>
    </DashboardLayout>
  );
}
