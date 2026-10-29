
"use client";

import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type AssignedInterview = {
  id: number;
  candidate: string;
  registrationNumber: string;
  email: string;
  round: string;
  date: string;
  time: string;
  room: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
};

const assignedInterviews: AssignedInterview[] = [
  {
    id: 1,
    candidate: "Candidate A",
    registrationNumber: "2023CS101",
    email: "candidate.a@example.com",
    round: "Technical Interview",
    date: "30 October 2026",
    time: "10:00 AM – 10:45 AM",
    room: "Room 101",
    status: "UPCOMING",
  },
  {
    id: 2,
    candidate: "Candidate B",
    registrationNumber: "2023CS115",
    email: "candidate.b@example.com",
    round: "Coding Round",
    date: "31 October 2026",
    time: "11:00 AM – 11:45 AM",
    room: "Room 102",
    status: "UPCOMING",
  },
  {
    id: 3,
    candidate: "Candidate C",
    registrationNumber: "2023IT042",
    email: "candidate.c@example.com",
    round: "HR Interview",
    date: "26 October 2026",
    time: "02:00 PM – 02:30 PM",
    room: "Room 103",
    status: "COMPLETED",
  },
];

export default function InterviewerInterviewsPage() {
  return (
    <DashboardLayout role="Interviewer">
      <div className="min-h-screen bg-[#171613] px-4 py-8 text-[#F0E5CE] sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
              The Ancient One&apos;s Trials
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              My Interviews
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B9B09F]">
              Review your assigned candidates, interview rounds, schedules,
              and locations.
            </p>
          </div>

          {/* Summary */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Total Assigned"
              value={assignedInterviews.length}
            />
            <SummaryCard
              label="Upcoming"
              value={
                assignedInterviews.filter((i) => i.status === "UPCOMING")
                  .length
              }
            />
            <SummaryCard
              label="Completed"
              value={
                assignedInterviews.filter((i) => i.status === "COMPLETED")
                  .length
              }
            />
          </div>

          {/* Interview cards */}
          <div className="space-y-5">
            {assignedInterviews.map((interview) => (
              <article
                key={interview.id}
                className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D5AE65]">
                      {interview.round}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                      {interview.candidate}
                    </h2>
                    <p className="mt-1 text-sm text-[#B9B09F]">
                      Registration No: {interview.registrationNumber}
                    </p>
                    <p className="mt-1 text-sm text-[#B9B09F]">
                      {interview.email}
                    </p>
                  </div>

                  <StatusBadge status={interview.status} />
                </div>

                <div className="mt-6 grid gap-4 border-t border-[#D5AE65]/10 pt-5 sm:grid-cols-3">
                  <Detail label="Date" value={interview.date} />
                  <Detail label="Time" value={interview.time} />
                  <Detail label="Room" value={interview.room} />
                </div>

                {interview.status === "COMPLETED" && (
                  <div className="mt-5">
                    <Link
                      href="/interviewer/evaluations"
                      className="inline-flex rounded-lg border border-[#D5AE65]/40 px-4 py-2.5 text-sm font-medium text-[#D5AE65] transition hover:bg-[#30291D]"
                    >
                      Go to Evaluations →
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-8 border-t border-[#D5AE65]/15 pt-6">
            <Link
              href="/interviewer"
              className="text-sm text-[#D5AE65] transition hover:text-[#F0E5CE]"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5">
      <p className="text-sm text-[#B9B09F]">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-[#D5AE65]">
        {value.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[#B9B09F]">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AssignedInterview["status"];
}) {
  const styles = {
    UPCOMING:
      "border-[#D5AE65]/30 bg-[#30291D] text-[#D5AE65]",
    COMPLETED:
      "border-green-700/50 bg-green-950/40 text-green-300",
    CANCELLED:
      "border-red-700/50 bg-red-950/40 text-red-300",
  };

  const labels = {
    UPCOMING: "Upcoming",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };

  return (
    <span
      className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
