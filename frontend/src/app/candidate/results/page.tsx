
"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type InterviewResult = {
  id: number;
  round: string;
  date: string;
  score: number;
  maxScore: number;
  outcome: "PASS" | "FAIL" | "PENDING";
  feedback: string;
  interviewer: string;
};

// Sample data for frontend development only.
// These results are not stored in the database.
const initialResults: InterviewResult[] = [
  {
    id: 1,
    round: "Coding Round",
    date: "26 October 2026",
    score: 85,
    maxScore: 100,
    outcome: "PASS",
    feedback:
      "Good problem-solving approach. You explained your logic clearly and handled edge cases well.",
    interviewer: "Interviewer A",
  },
  {
    id: 2,
    round: "Technical Interview",
    date: "27 October 2026",
    score: 72,
    maxScore: 100,
    outcome: "PASS",
    feedback:
      "Good understanding of core concepts. Continue practising system design and explaining trade-offs.",
    interviewer: "Interviewer B",
  },
];

export default function MyResultsPage() {
  const [results] = useState<InterviewResult[]>(initialResults);

  const completedResults = results.filter(
    (result) => result.outcome !== "PENDING"
  );

  const passedResults = completedResults.filter(
    (result) => result.outcome === "PASS"
  ).length;

  return (
    <DashboardLayout role="Candidate">
      <div className="min-h-screen bg-[#171613] px-4 py-8 text-[#F0E5CE] sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Page heading */}
          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
              The Ancient One&apos;s Trials
            </p>

            <h1 className="text-3xl font-semibold sm:text-4xl">
              My Results
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B9B09F]">
              Review your completed interview rounds, scores, outcomes,
              and feedback from your interviewers.
            </p>
          </div>

          {/* Summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5">
              <p className="text-sm text-[#B9B09F]">Rounds Evaluated</p>
              <p className="mt-2 text-3xl font-semibold text-[#D5AE65]">
                {completedResults.length.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5">
              <p className="text-sm text-[#B9B09F]">Rounds Passed</p>
              <p className="mt-2 text-3xl font-semibold text-green-300">
                {passedResults.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5">
              <p className="text-sm text-[#B9B09F]">Rounds Remaining</p>
              <p className="mt-2 text-3xl font-semibold">
                {results.filter((result) => result.outcome === "PENDING").length
                  .toString()
                  .padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Result list */}
          {completedResults.length > 0 ? (
            <div className="space-y-5">
              {completedResults.map((result) => {
                const percentage = Math.round(
                  (result.score / result.maxScore) * 100
                );

                return (
                  <article
                    key={result.id}
                    className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#D5AE65]">
                          {result.date}
                        </p>

                        <h2 className="text-xl font-semibold">
                          {result.round}
                        </h2>

                        <p className="mt-2 text-sm text-[#B9B09F]">
                          Evaluated by {result.interviewer}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
                          result.outcome === "PASS"
                            ? "border-green-700/50 bg-green-950/40 text-green-300"
                            : "border-red-700/50 bg-red-950/40 text-red-300"
                        }`}
                      >
                        {result.outcome === "PASS" ? "✓ Passed" : "✕ Failed"}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="mt-6 rounded-xl border border-[#D5AE65]/10 bg-[#171613] p-4">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <p className="text-sm text-[#B9B09F]">Your Score</p>

                        <p className="text-lg font-semibold text-[#D5AE65]">
                          {result.score}
                          <span className="text-sm text-[#B9B09F]">
                            {" "}/ {result.maxScore}
                          </span>
                        </p>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#3A352B]">
                        <div
                          className="h-full rounded-full bg-[#D5AE65] transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <p className="mt-2 text-right text-xs text-[#B9B09F]">
                        {percentage}%
                      </p>
                    </div>

                    {/* Feedback */}
                    <div className="mt-5">
                      <h3 className="text-sm font-semibold text-[#D5AE65]">
                        Interviewer Feedback
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#B9B09F]">
                        {result.feedback}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D5AE65]/30 bg-[#22201B] px-6 py-14 text-center">
              <div className="mb-4 text-4xl text-[#D5AE65]">✦</div>

              <h2 className="text-xl font-semibold">
                No Results Published Yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#B9B09F]">
                Your results will appear here after your interviewer completes
                the evaluation and the results are published.
              </p>

              <Link
                href="/candidate/interviews"
                className="mt-6 inline-flex rounded-lg bg-[#D5AE65] px-5 py-3 text-sm font-semibold text-[#171613] transition hover:bg-[#E5C47F]"
              >
                View My Interviews
              </Link>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 border-t border-[#D5AE65]/15 pt-6">
            <Link
              href="/candidate"
              className="text-sm text-[#D5AE65] transition hover:text-[#F0E5CE]"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-[#B9B09F]/60">
            Every trial is an opportunity to grow.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
