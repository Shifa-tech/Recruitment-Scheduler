
"use client";

import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const stats = [
  {
    label: "Assigned Interviews",
    value: "08",
    description: "Total interviews assigned",
  },
  {
    label: "Upcoming Interviews",
    value: "03",
    description: "Scheduled for the future",
  },
  {
    label: "Pending Evaluations",
    value: "02",
    description: "Evaluations to complete",
  },
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Candidate A",
    registrationNumber: "2023CS101",
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
    round: "HR Interview",
    date: "2 November 2026",
    time: "02:00 PM – 02:30 PM",
    room: "Room 103",
    status: "UPCOMING",
  },
];

const quickActions = [
  {
    title: "My Interviews",
    description: "View your assigned interview schedule and candidate details.",
    href: "/interviewer/interviews",
    icon: "▦",
  },
  {
    title: "Manage Availability",
    description: "Set the dates and times when you are available.",
    href: "/interviewer/availability",
    icon: "◷",
  },
  {
    title: "Evaluate Candidates",
    description: "Submit scores, feedback, and interview outcomes.",
    href: "/interviewer/evaluations",
    icon: "✦",
  },
];

export default function InterviewerDashboardPage() {
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
              Interviewer Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B9B09F]">
              Review your interview schedule, manage your availability,
              and complete candidate evaluations.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-6"
              >
                <p className="text-sm text-[#B9B09F]">{stat.label}</p>

                <p className="mt-3 text-3xl font-semibold text-[#D5AE65]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-[#B9B09F]/70">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <section className="mb-10">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <p className="mt-2 text-sm text-[#B9B09F]">
                Access your main interviewer tools.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-6 transition hover:-translate-y-1 hover:border-[#D5AE65]/50"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D5AE65]/20 bg-[#30291D] text-2xl text-[#D5AE65]">
                    {action.icon}
                  </div>

                  <h3 className="text-lg font-semibold transition group-hover:text-[#D5AE65]">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#B9B09F]">
                    {action.description}
                  </p>

                  <p className="mt-5 text-sm font-medium text-[#D5AE65]">
                    Open section →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming Interviews */}
          <section>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
                <p className="mt-2 text-sm text-[#B9B09F]">
                  A preview of your assigned schedule.
                </p>
              </div>

              <Link
                href="/interviewer/interviews"
                className="text-sm font-medium text-[#D5AE65] transition hover:text-[#F0E5CE]"
              >
                View all interviews →
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#D5AE65]">
                        {interview.round}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold">
                        {interview.candidate}
                      </h3>

                      <p className="mt-1 text-sm text-[#B9B09F]">
                        Registration No: {interview.registrationNumber}
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-[#D5AE65]/30 bg-[#30291D] px-3 py-1 text-xs text-[#D5AE65]">
                      Upcoming
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 border-t border-[#D5AE65]/10 pt-5 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-[#B9B09F]">Date</p>
                      <p className="mt-1 text-sm">{interview.date}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#B9B09F]">Time</p>
                      <p className="mt-1 text-sm">{interview.time}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#B9B09F]">Location</p>
                      <p className="mt-1 text-sm">{interview.room}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <p className="mt-10 text-center text-xs text-[#B9B09F]/60">
            Prepare with purpose. Evaluate with fairness.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
