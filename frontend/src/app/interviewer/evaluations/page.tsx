
"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type CandidateEvaluation = {
  id: number;
  candidate: string;
  registrationNumber: string;
  round: string;
  date: string;
  status: "PENDING" | "SUBMITTED";
  score: number | null;
  outcome: "PASS" | "FAIL" | null;
  feedback: string;
};

const initialEvaluations: CandidateEvaluation[] = [
  {
    id: 1,
    candidate: "Candidate A",
    registrationNumber: "2023CS101",
    round: "Technical Interview",
    date: "30 October 2026",
    status: "PENDING",
    score: null,
    outcome: null,
    feedback: "",
  },
  {
    id: 2,
    candidate: "Candidate B",
    registrationNumber: "2023CS115",
    round: "Coding Round",
    date: "31 October 2026",
    status: "PENDING",
    score: null,
    outcome: null,
    feedback: "",
  },
];

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] =
    useState<CandidateEvaluation[]>(initialEvaluations);
  const [selectedId, setSelectedId] = useState<number>(initialEvaluations[0].id);
  const [message, setMessage] = useState("");

  const selected = evaluations.find((item) => item.id === selectedId);

  const updateSelected = (
    field: "score" | "outcome" | "feedback",
    value: number | "PASS" | "FAIL" | string
  ) => {
    setEvaluations((previous) =>
      previous.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
    setMessage("");
  };

  const submitEvaluation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selected) return;

    if (selected.status === "SUBMITTED") {
      setMessage("This evaluation has already been submitted.");
      return;
    }

    if (selected.score === null || !selected.outcome || !selected.feedback.trim()) {
      setMessage("Please provide a score, outcome, and feedback.");
      return;
    }

    setEvaluations((previous) =>
      previous.map((item) =>
        item.id === selectedId
          ? { ...item, status: "SUBMITTED" }
          : item
      )
    );

    setMessage("Evaluation submitted successfully in this demo.");
  };

  const pendingCount = evaluations.filter(
    (item) => item.status === "PENDING"
  ).length;

  const submittedCount = evaluations.filter(
    (item) => item.status === "SUBMITTED"
  ).length;

  return (
    <DashboardLayout role="Interviewer">
      <div className="min-h-screen bg-[#171613] px-4 py-8 text-[#F0E5CE] sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
              The Ancient One&apos;s Trials
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Evaluate Candidates
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B9B09F]">
              Record your assessment after an interview. Submit a score,
              outcome, and constructive feedback for each candidate.
            </p>
          </div>

          {/* Summary */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <SummaryCard label="Pending Evaluations" value={pendingCount} />
            <SummaryCard label="Submitted Evaluations" value={submittedCount} />
          </div>

          {/* Candidate selection */}
          <section className="mb-6 rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-6">
            <label
              htmlFor="candidate"
              className="text-sm font-medium text-[#B9B09F]"
            >
              Select Candidate
            </label>

            <select
              id="candidate"
              value={selectedId}
              onChange={(event) => {
                setSelectedId(Number(event.target.value));
                setMessage("");
              }}
              className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65]"
            >
              {evaluations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.candidate} — {item.round} ({item.status})
                </option>
              ))}
            </select>
          </section>

          {/* Evaluation form */}
          {selected && (
            <form
              onSubmit={submitEvaluation}
              className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-8"
            >
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D5AE65]">
                    {selected.round}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    {selected.candidate}
                  </h2>
                  <p className="mt-2 text-sm text-[#B9B09F]">
                    Registration No: {selected.registrationNumber}
                  </p>
                  <p className="mt-1 text-sm text-[#B9B09F]">
                    Interview date: {selected.date}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border px-3 py-1 text-xs ${
                    selected.status === "SUBMITTED"
                      ? "border-green-700/50 bg-green-950/40 text-green-300"
                      : "border-[#D5AE65]/30 bg-[#30291D] text-[#D5AE65]"
                  }`}
                >
                  {selected.status === "SUBMITTED" ? "Submitted" : "Pending"}
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-[#B9B09F]">
                    Score (0–100)
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    required
                    disabled={selected.status === "SUBMITTED"}
                    value={selected.score ?? ""}
                    onChange={(event) =>
                      updateSelected(
                        "score",
                        event.target.value === ""
                          ? ""
                          : Number(event.target.value)
                      )
                    }
                    placeholder="Enter score"
                    className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65] disabled:opacity-60"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#B9B09F]">Outcome</span>
                  <select
                    required
                    disabled={selected.status === "SUBMITTED"}
                    value={selected.outcome ?? ""}
                    onChange={(event) =>
                      updateSelected(
                        "outcome",
                        event.target.value as "PASS" | "FAIL"
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65] disabled:opacity-60"
                  >
                    <option value="" disabled>
                      Select outcome
                    </option>
                    <option value="PASS">Pass</option>
                    <option value="FAIL">Fail</option>
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-sm text-[#B9B09F]">
                    Interviewer Feedback
                  </span>
                  <textarea
                    required
                    rows={5}
                    maxLength={2000}
                    disabled={selected.status === "SUBMITTED"}
                    value={selected.feedback}
                    onChange={(event) =>
                      updateSelected("feedback", event.target.value)
                    }
                    placeholder="Describe the candidate's strengths, areas to improve, and interview performance..."
                    className="mt-2 w-full resize-y rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm leading-6 text-[#F0E5CE] outline-none focus:border-[#D5AE65] disabled:opacity-60"
                  />
                  <span className="mt-2 block text-right text-xs text-[#B9B09F]/70">
                    {selected.feedback.length}/2000 characters
                  </span>
                </label>
              </div>

              {message && (
                <p
                  role="status"
                  className={`mt-5 text-sm ${
                    message.includes("successfully")
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={selected.status === "SUBMITTED"}
                  className="rounded-lg bg-[#D5AE65] px-6 py-3 text-sm font-semibold text-[#171613] transition hover:bg-[#E5C47F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Evaluation
                </button>

                <Link
                  href="/interviewer/interviews"
                  className="rounded-lg border border-[#D5AE65]/30 px-6 py-3 text-sm text-[#F0E5CE] transition hover:bg-[#30291D]"
                >
                  Back to My Interviews
                </Link>
              </div>

              <p className="mt-6 text-xs leading-5 text-[#B9B09F]/70">
                Demo mode: submissions are held in page state only. They are
                not saved to the database or published to the candidate.
              </p>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-[#B9B09F]/60">
            Evaluate with fairness. Give feedback that helps candidates grow.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5">
      <p className="text-sm text-[#B9B09F]">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-[#D5AE65]">
        {value.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
