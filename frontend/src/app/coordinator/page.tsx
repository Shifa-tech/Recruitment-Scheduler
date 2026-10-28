
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const stats = [
  { label: "Active Drives", value: "04", icon: "◈", note: "Recruitment in progress" },
  { label: "Total Candidates", value: "128", icon: "♙", note: "Across active drives" },
  { label: "Scheduled Interviews", value: "86", icon: "◷", note: "Slots successfully assigned" },
  { label: "Scheduling Conflicts", value: "03", icon: "⚠", note: "Require your attention" },
];

const drives = [
  { name: "Software Engineer 2026", candidates: 48, scheduled: 36, status: "In Progress" },
  { name: "Frontend Developer 2026", candidates: 32, scheduled: 28, status: "In Progress" },
  { name: "Backend Developer 2026", candidates: 28, scheduled: 14, status: "Needs Scheduling" },
  { name: "Data Engineer 2026", candidates: 20, scheduled: 8, status: "Needs Scheduling" },
];

const conflicts = [
  { title: "Interviewer overlap", detail: "Two interviews assigned to the same interviewer at 11:00 AM.", severity: "High" },
  { title: "Room unavailable", detail: "Room 02 has overlapping bookings at 2:00 PM.", severity: "Medium" },
  { title: "Unassigned candidates", detail: "Several candidates still need interview slots.", severity: "Medium" },
];

export default function CoordinatorDashboard() {
  return (
    <DashboardLayout role="Coordinator">
      {/* Welcome banner */}
      <section className="relative overflow-hidden border border-[#D5AE65]/30
        bg-[#211F1A] p-6 text-[#F0E5CE] sm:p-9">
        <div className="pointer-events-none absolute -right-10 -top-20
          h-64 w-64 rounded-full border border-[#D5AE65]/15" />
        <div className="pointer-events-none absolute -right-2 -top-12
          h-48 w-48 rounded-full border border-[#D5AE65]/15" />

        <div className="relative max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D5AE65]">
            ✧ The command chamber
          </p>

          <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
            Welcome, Keeper of the Order.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9B09F]">
            Oversee recruitment drives, coordinate interview panels and
            bring order to every schedule. Your command center awaits.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/coordinator/scheduling"
              className="bg-[#D5AE65] px-5 py-3 text-sm font-semibold
                text-[#171613] transition hover:bg-[#E8CC91]"
            >
              Generate Schedule →
            </Link>

            <Link
              href="/coordinator/drives"
              className="border border-[#D5AE65]/40 px-5 py-3 text-sm
                transition hover:border-[#D5AE65] hover:text-[#D5AE65]"
            >
              Manage Recruitment Drives
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-5
              transition hover:border-[#9D3F2A]/40"
          >
            <div className="flex items-start justify-between gap-2">
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

      {/* Recruitment drives */}
      <section className="mt-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
              Recruitment operations
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
              Active Recruitment Drives
            </h2>
          </div>

          <Link
            href="/coordinator/drives"
            className="text-xs text-[#9D3F2A] hover:underline"
          >
            View all drives →
          </Link>
        </div>

        <div className="overflow-x-auto border border-[#D5AE65]/25 bg-[#FFFAF0]">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-b border-[#E6D8BE] bg-[#E8DCC5]/50
              text-[10px] uppercase tracking-[0.15em] text-[#756651]">
              <tr>
                <th className="px-5 py-4 font-medium">Drive</th>
                <th className="px-5 py-4 font-medium">Candidates</th>
                <th className="px-5 py-4 font-medium">Scheduled</th>
                <th className="px-5 py-4 font-medium">Progress</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {drives.map((drive) => {
                const progress = Math.round(
                  (drive.scheduled / drive.candidates) * 100
                );

                return (
                  <tr
                    key={drive.name}
                    className="border-b border-[#E6D8BE] last:border-0
                      transition hover:bg-[#F5ECD9]"
                  >
                    <td className="px-5 py-5 font-medium">{drive.name}</td>
                    <td className="px-5 py-5 text-[#756651]">
                      {drive.candidates}
                    </td>
                    <td className="px-5 py-5 text-[#756651]">
                      {drive.scheduled}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-20 overflow-hidden bg-[#E6D8BE]">
                          <div
                            className="h-full bg-[#9D3F2A]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#756651]">
                          {progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <span className={`whitespace-nowrap border px-2.5 py-1
                        text-xs ${
                          drive.status === "In Progress"
                            ? "border-[#52734D]/30 bg-[#E7EDDF] text-[#46633F]"
                            : "border-[#B58A42]/30 bg-[#F7EBD0] text-[#896522]"
                        }`}>
                        {drive.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Scheduling and conflicts */}
      <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_1.2fr]">
        <section className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
            Scheduling engine
          </p>

          <h2 className="mt-2 font-serif text-2xl">
            Restore the Balance
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#756651]">
            Prepare interview slots using candidate requirements,
            interviewer availability, room capacity and round duration.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between border
              border-[#E6D8BE] p-4">
              <span className="text-sm">Candidates awaiting slots</span>
              <span className="font-serif text-xl text-[#9D3F2A]">42</span>
            </div>

            <div className="flex items-center justify-between border
              border-[#E6D8BE] p-4">
              <span className="text-sm">Rooms available</span>
              <span className="font-serif text-xl text-[#29241D]">06</span>
            </div>
          </div>

          <Link
            href="/coordinator/scheduling"
            className="mt-6 block bg-[#211F1A] px-5 py-3.5 text-center
              text-sm text-[#D5AE65] transition hover:bg-[#302B22]"
          >
            Open Scheduling Engine →
          </Link>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9D3F2A]">
              Attention required
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
              Scheduling Conflicts
            </h2>
          </div>

          <div className="space-y-3">
            {conflicts.map((conflict) => (
              <article
                key={conflict.title}
                className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-5"
              >
                <div className="flex items-start gap-4">
                  <span className={`flex h-9 w-9 shrink-0 items-center
                    justify-center border text-lg ${
                      conflict.severity === "High"
                        ? "border-[#9D3F2A]/30 bg-[#F4DFD5] text-[#9D3F2A]"
                        : "border-[#B58A42]/30 bg-[#F7EBD0] text-[#896522]"
                    }`}>
                    !
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center
                      justify-between gap-2">
                      <h3 className="text-sm font-medium">
                        {conflict.title}
                      </h3>
                      <span className="text-[10px] uppercase
                        tracking-[0.12em] text-[#9D3F2A]">
                        {conflict.severity}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#756651]">
                      {conflict.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/coordinator/scheduling"
            className="mt-4 inline-block text-sm text-[#9D3F2A] hover:underline"
          >
            Review scheduling issues →
          </Link>
        </section>
      </div>

      {/* Quick management links */}
      <section className="mt-10 border border-[#D5AE65]/25 bg-[#211F1A]
        p-6 text-[#F0E5CE] sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#D5AE65]">
          The command chamber
        </p>

        <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
          Manage the Order
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Recruitment Drives", href: "/coordinator/drives" },
            { title: "Interview Rooms", href: "/coordinator/rooms" },
            { title: "All Interviews", href: "/coordinator/interviews" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border
                border-[#D5AE65]/25 px-4 py-4 text-sm
                transition hover:border-[#D5AE65]/70 hover:text-[#D5AE65]"
            >
              {item.title}
              <span>→</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-[#D5AE65]/30 pt-5
        text-xs text-[#8B7D68]">
        THE ANCIENT ONE&apos;S TRIALS · Lead with clarity and wisdom.
      </footer>
    </DashboardLayout>
  );
}
