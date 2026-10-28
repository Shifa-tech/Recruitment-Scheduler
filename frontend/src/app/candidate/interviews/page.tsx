
"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type Interview = {
  id: number;
  round: string;
  date: string;
  time: string;
  interviewer: string;
  room: string;
  status: "CONFIRMED";
};

// Demo data: these are confirmed interviews only.
// Replace with backend data when the API is ready.
const initialInterviews: Interview[] = [
  {
    id: 1,
    round: "Technical Interview",
    date: "30 October 2026",
    time: "10:00 AM – 10:45 AM",
    interviewer: "Interviewer A",
    room: "Room 101",
    status: "CONFIRMED",
  },
  {
    id: 2,
    round: "HR Interview",
    date: "2 November 2026",
    time: "2:00 PM – 2:30 PM",
    interviewer: "Interviewer B",
    room: "Room 102",
    status: "CONFIRMED",
  },
];

export default function MyInterviewsPage() {
  const [interviews] = useState<Interview[]>(initialInterviews);

  return (
    <DashboardLayout role="Candidate">
      <div className="min-h-screen bg-[#171613] px-4 py-8 text-[#F0E5CE] sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
              The Ancient One&apos;s Trials
            </p>

            <h1 className="text-3xl font-semibold sm:text-4xl">
              My Interviews
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B9B09F]">
              View your confirmed interview schedule, including the round,
              time, room, and assigned interviewer.
            </p>
          </div>

          {/* Summary */}
          <div className="mb-8 rounded-2xl border border-[#D5AE65]/25 bg-[#22201B] p-5">
            <p className="text-sm text-[#B9B09F]">
              Confirmed Interviews
            </p>
            <p className="mt-2 text-3xl font-semibold text-[#D5AE65]">
              {interviews.length.toString().padStart(2, "0")}
            </p>
          </div>

          {/* Confirmed interviews */}
          {interviews.length > 0 ? (
            <div className="space-y-5">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 transition hover:border-[#D5AE65]/50 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#D5AE65]">
                        Confirmed Interview
                      </p>
                      <h2 className="text-xl font-semibold">
                        {interview.round}
                      </h2>
                    </div>

                    <span className="w-fit rounded-full border border-green-700/50 bg-green-950/40 px-3 py-1 text-xs font-medium text-green-300">
                      ✓ Confirmed
                    </span>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs text-[#B9B09F]">Date</p>
                      <p className="mt-1 text-sm">{interview.date}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#B9B09F]">Time</p>
                      <p className="mt-1 text-sm">{interview.time}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#B9B09F]">Interviewer</p>
                      <p className="mt-1 text-sm">{interview.interviewer}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#B9B09F]">Room</p>
                      <p className="mt-1 text-sm">{interview.room}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="rounded-2xl border border-dashed border-[#D5AE65]/30 bg-[#22201B] px-6 py-14 text-center">
              <div className="mb-4 text-4xl text-[#D5AE65]">✦</div>

              <h2 className="text-xl font-semibold">
                No Confirmed Interviews Yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#B9B09F]">
                Once you confirm an available interview slot, your scheduled
                interview will appear here.
              </p>

              <Link
                href="/candidate/slots"
                className="mt-6 inline-flex rounded-lg bg-[#D5AE65] px-5 py-3 text-sm font-semibold text-[#171613] transition hover:bg-[#E5C47F]"
              >
                View Available Slots
              </Link>
            </div>
          )}

          {/* Bottom link */}
          <div className="mt-8 border-t border-[#D5AE65]/15 pt-6">
            <Link
              href="/candidate/slots"
              className="text-sm text-[#D5AE65] transition hover:text-[#F0E5CE]"
            >
              ← Go to My Slots
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-[#B9B09F]/60">
            Your journey is guided by preparation and patience.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
