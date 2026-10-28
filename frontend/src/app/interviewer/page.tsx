
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const stats = [
  {
    label: "Today's Interviews",
    value: "03",
    icon: "◷",
    note: "Your schedule for today",
  },
  {
    label: "Pending Evaluations",
    value: "02",
    icon: "✧",
    note: "Awaiting your judgement",
  },
  {
    label: "Completed Interviews",
    value: "12",
    icon: "♜",
    note: "Across all assigned rounds",
  },
];

const schedule = [
  {
    id: "INT-001",
    candidate: "Candidate A",
    round: "Coding Round",
    date: "28 October 2026",
    time: "10:00 AM – 11:00 AM",
    room: "Sanctum · Room 01",
    status: "Upcoming",
  },
  {
    id: "INT-002",
    candidate: "Candidate B",
    round: "Technical Round",
    date: "28 October 2026",
    time: "11:30 AM – 12:15 PM",
    room: "Sanctum · Room 02",
    status: "Upcoming",
  },
  {
    id: "INT-003",
    candidate: "Candidate C",
    round: "Technical Round",
    date: "28 October 2026",
    time: "02:00 PM – 02:45 PM",
    room: "Sanctum · Room 01",
    status: "Upcoming",
  },
];

const pendingEvaluations = [
  {
    candidate: "Candidate D",
    round: "Coding Round",
    date: "27 October 2026",
    id: "EVAL-001",
  },
  {
    candidate: "Candidate E",
    round: "Technical Round",
    date: "27 October 2026",
    id: "EVAL-002",
  },
];

export default function InterviewerDashboard() {
  return (
    <DashboardLayout role="Interviewer">
      {/* Welcome banner */}
      <section className="relative overflow-hidden border border-[#D5AE65]/30
        bg-[#211F1A] p-6 text-[#F0E5CE] sm:p-9">
        <div className="pointer-events-none absolute -right-10 -top-20
          h-64 w-64 rounded-full border border-[#D5AE65]/15" />
        <div className="pointer-events-none absolute -right-2 -top-12
          h-48 w-48 rounded-full border border-[#D5AE65]/15" />

        <div className="relative max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D5AE65]">
            ✧ The observer's chamber
          </p>

          <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
            Welcome, Keeper of Knowledge.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#B9B09F]">
            Every interview reveals potential. Review your assignments,
            manage your availability and deliver thoughtful, consistent
            evaluations to guide each candidate's journey.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/interviewer/schedule"
              className="bg-[#D5AE65] px-5 py-3 text-sm font-semibold
                text-[#171613] transition hover:bg-[#E8CC91]"
            >
              View My Schedule →
            </Link>

            <Link
              href="/interviewer/availability"
              className="border border-[#D5AE65]/40 px-5 py-3 text-sm
                transition hover:border-[#D5AE65] hover:text-[#D5AE65]"
            >
              Manage Availability
            </Link>
          </div>
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

      {/* Today's schedule */}
      <section className="mt-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
              The day's proceedings
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
              Today&apos;s Interviews
            </h2>
          </div>

          <Link
            href="/interviewer/schedule"
            className="text-xs text-[#9D3F2A] hover:underline"
          >
            Full schedule →
          </Link>
        </div>

        <div className="space-y-4">
          {schedule.map((interview) => (
            <article
              key={interview.id}
              className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-5
                transition hover:border-[#9D3F2A]/40 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center
                sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center
                    justify-center border border-[#D5AE65]/40
                    bg-[#F0E5CE] font-serif text-xl text-[#9D3F2A]">
                    ◷
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-[#9D3F2A]">
                      {interview.id}
                    </p>

                    <h3 className="mt-1 font-serif text-xl">
                      {interview.round}
                    </h3>

                    <p className="mt-1 text-sm text-[#756651]">
                      {interview.candidate}
                    </p>
                  </div>
                </div>

                <span className="w-fit border border-[#52734D]/30
                  bg-[#E7EDDF] px-3 py-1 text-xs text-[#46633F]">
                  {interview.status}
                </span>
              </div>

              <div className="mt-5 grid gap-4 border-t border-[#E6D8BE]
                pt-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-[10px] tracking-[0.15em] text-[#9A8A73]">
                    DATE
                  </p>
                  <p className="mt-1 text-[#514536]">{interview.date}</p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.15em] text-[#9A8A73]">
                    TIME
                  </p>
                  <p className="mt-1 text-[#514536]">{interview.time}</p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.15em] text-[#9A8A73]">
                    LOCATION
                  </p>
                  <p className="mt-1 text-[#514536]">{interview.room}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Evaluations and availability */}
      <div className="mt-10 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
              Awaiting your judgement
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
              Pending Evaluations
            </h2>
          </div>

          <div className="border border-[#D5AE65]/25 bg-[#FFFAF0]">
            {pendingEvaluations.map((evaluation, index) => (
              <div
                key={evaluation.id}
                className={`flex flex-wrap items-center justify-between
                  gap-4 p-5 ${
                    index !== pendingEvaluations.length - 1
                      ? "border-b border-[#E6D8BE]"
                      : ""
                  }`}
              >
                <div>
                  <h3 className="text-sm font-medium">
                    {evaluation.candidate}
                  </h3>
                  <p className="mt-1 text-sm text-[#756651]">
                    {evaluation.round}
                  </p>
                  <p className="mt-2 text-xs text-[#9A8A73]">
                    Interviewed on {evaluation.date}
                  </p>
                </div>

                <Link
                  href="/interviewer/evaluations"
                  className="border border-[#9D3F2A]/40 px-4 py-2
                    text-xs text-[#9D3F2A] transition
                    hover:bg-[#9D3F2A] hover:text-white"
                >
                  Evaluate →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
              Your availability
            </p>

            <h2 className="mt-2 font-serif text-2xl">
              Set Your Boundaries
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#756651]">
              Keep your available hours up to date so the scheduling engine
              can assign interviews without conflicts.
            </p>

            <div className="mt-5 flex items-center gap-3 border
              border-[#E6D8BE] p-4">
              <span className="text-2xl text-[#9D3F2A]">✧</span>
              <div>
                <p className="text-sm font-medium">Availability settings</p>
                <p className="mt-1 text-xs text-[#8B7D68]">
                  Manage your preferred interview windows
                </p>
              </div>
            </div>

            <Link
              href="/interviewer/availability"
              className="mt-5 block bg-[#211F1A] px-5 py-3 text-center
                text-sm text-[#D5AE65] transition hover:bg-[#302B22]"
            >
              Update Availability →
            </Link>
          </section>

          <section className="border border-[#D5AE65]/25 bg-[#211F1A]
            p-6 text-[#F0E5CE]">
            <span className="text-2xl text-[#D5AE65]">✧</span>
            <h2 className="mt-3 font-serif text-xl">
              The Art of Evaluation
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#B9B09F]">
              Assess candidates against the same criteria, provide
              constructive feedback and record your decisions promptly.
            </p>
            <Link
              href="/interviewer/evaluations"
              className="mt-5 inline-block text-sm text-[#D5AE65]
                hover:underline"
            >
              Review evaluations →
            </Link>
          </section>
        </aside>
      </div>

      <footer className="mt-12 border-t border-[#D5AE65]/30 pt-5
        text-xs text-[#8B7D68]">
        THE ANCIENT ONE&apos;S TRIALS · Judge with wisdom and fairness.
      </footer>
    </DashboardLayout>
  );
}
