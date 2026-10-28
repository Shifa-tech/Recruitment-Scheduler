
"use client";

import Link from "next/link";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type InterviewRound = "CODING" | "TECH" | "HR";

type InterviewSlot = {
  id: string;
  round: InterviewRound;
  date: string;
  time: string;
  interviewer: string;
  room: string;
};

const initialSlots: InterviewSlot[] = [
  {
    id: "coding-1",
    round: "CODING",
    date: "30 October 2026",
    time: "09:00 AM – 09:45 AM",
    interviewer: "Interviewer A",
    room: "Room 101",
  },
  {
    id: "coding-2",
    round: "CODING",
    date: "30 October 2026",
    time: "11:00 AM – 11:45 AM",
    interviewer: "Interviewer B",
    room: "Room 102",
  },
  {
    id: "coding-3",
    round: "CODING",
    date: "31 October 2026",
    time: "10:00 AM – 10:45 AM",
    interviewer: "Interviewer C",
    room: "Room 103",
  },
  {
    id: "tech-1",
    round: "TECH",
    date: "02 November 2026",
    time: "10:30 AM – 11:15 AM",
    interviewer: "Interviewer A",
    room: "Room 101",
  },
  {
    id: "tech-2",
    round: "TECH",
    date: "02 November 2026",
    time: "02:00 PM – 02:45 PM",
    interviewer: "Interviewer D",
    room: "Room 104",
  },
  {
    id: "hr-1",
    round: "HR",
    date: "04 November 2026",
    time: "11:00 AM – 11:30 AM",
    interviewer: "Interviewer B",
    room: "Room 102",
  },
  {
    id: "hr-2",
    round: "HR",
    date: "04 November 2026",
    time: "03:00 PM – 03:30 PM",
    interviewer: "Interviewer E",
    room: "Room 105",
  },
];

const roundDetails: {
  id: InterviewRound;
  title: string;
  description: string;
}[] = [
  {
    id: "CODING",
    title: "Coding Round",
    description: "Demonstrate your problem-solving skills.",
  },
  {
    id: "TECH",
    title: "Technical Interview",
    description: "Discuss your technical knowledge and projects.",
  },
  {
    id: "HR",
    title: "HR Interview",
    description: "Discuss your goals and professional journey.",
  },
];

export default function CandidateSlotsPage() {
  const [slots, setSlots] = useState(initialSlots);
  const [selectedSlots, setSelectedSlots] = useState<
    Partial<Record<InterviewRound, string>>
  >({});
  const [message, setMessage] = useState("");

  function chooseSlot(round: InterviewRound, slotId: string) {
    setSelectedSlots((previous) => ({
      ...previous,
      [round]: previous[round] === slotId ? undefined : slotId,
    }));
    setMessage("");
  }

  function confirmSlot(round: InterviewRound) {
    const slotId = selectedSlots[round];
    if (!slotId) return;

    const selected = slots.find((slot) => slot.id === slotId);
    if (!selected) return;

    // Demo only: the booking is not saved to the backend.
    setSlots((previous) =>
      previous.filter((slot) => slot.id !== slotId)
    );

    setSelectedSlots((previous) => {
      const next = { ...previous };
      delete next[round];
      return next;
    });

    setMessage(
      `${roundDetails.find((item) => item.id === round)?.title} slot selected: ${selected.date}, ${selected.time}. This demo selection is not yet saved to the database.`
    );
  }

  return (
    <DashboardLayout role="Candidate">
      <div className="space-y-8">
        <header className="border border-[#D5AE65]/30 bg-[#211F1A] p-6 sm:p-9">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
            The Ancient One&apos;s Trials
          </p>

          <h1 className="mt-4 font-serif text-3xl text-[#F0E5CE] sm:text-5xl">
            Choose Your Interview Slot
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9B09F]">
            Explore the available times for each interview round you are
            eligible to schedule. Choose a time that works for you.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#D5AE65]">
            <span className="border border-[#D5AE65]/25 px-3 py-2">
              {roundDetails.length} interview rounds
            </span>
            <span className="border border-[#D5AE65]/25 px-3 py-2">
              {slots.length} available demo slots
            </span>
          </div>
        </header>

        {message && (
          <div
            role="status"
            className="border border-[#52734D]/40 bg-[#E7EDDF] p-4 text-sm leading-6 text-[#46633F]"
          >
            {message}
            <p className="mt-2">
              <Link
                href="/candidate/interviews"
                className="font-semibold underline"
              >
                View My Interviews
              </Link>
            </p>
          </div>
        )}

        {roundDetails.map((round) => {
          const roundSlots = slots.filter(
            (slot) => slot.round === round.id
          );
          const selectedId = selectedSlots[round.id];

          return (
            <section key={round.id}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#9D3F2A]">
                    {round.id} ROUND
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-[#F0E5CE] sm:text-3xl">
                    {round.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#B9B09F]">
                    {round.description}
                  </p>
                </div>

                <span className="text-xs text-[#B9B09F]">
                  {roundSlots.length} slot
                  {roundSlots.length === 1 ? "" : "s"} available
                </span>
              </div>

              {roundSlots.length === 0 ? (
                <div className="border border-[#D5AE65]/20 bg-[#211F1A] p-6 text-sm leading-6 text-[#B9B09F]">
                  No more demo slots are available for this round.
                  Please check again later.
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  {roundSlots.map((slot) => {
                    const isSelected = selectedId === slot.id;

                    return (
                      <article
                        key={slot.id}
                        className={`rounded-lg border bg-[#FFFAF0] p-5 transition sm:p-6 ${
                          isSelected
                            ? "border-[#9D3F2A] ring-2 ring-[#9D3F2A]/20"
                            : "border-[#D5AE65]/30 hover:border-[#D5AE65]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-[#9D3F2A]">
                              INTERVIEW DATE
                            </p>
                            <h3 className="mt-2 font-serif text-xl text-[#29241D]">
                              {slot.date}
                            </h3>
                          </div>

                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              isSelected
                                ? "bg-[#9D3F2A] text-white"
                                : "bg-[#E7EDDF] text-[#46633F]"
                            }`}
                          >
                            {isSelected ? "Selected" : "Available"}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3 text-sm text-[#756651]">
                          <p>
                            <span className="mr-2">◷</span>
                            {slot.time}
                          </p>
                          <p>
                            <span className="mr-2">♙</span>
                            {slot.interviewer}
                          </p>
                          <p>
                            <span className="mr-2">⌂</span>
                            {slot.room}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => chooseSlot(round.id, slot.id)}
                          className={`mt-6 w-full rounded-md border px-4 py-3 text-sm font-semibold transition ${
                            isSelected
                              ? "border-[#9D3F2A] bg-[#9D3F2A] text-white"
                              : "border-[#D5AE65]/50 bg-white text-[#29241D] hover:border-[#9D3F2A] hover:text-[#9D3F2A]"
                          }`}
                        >
                          {isSelected ? "Selected ✓" : "Choose This Slot"}
                        </button>

                        {isSelected && (
                          <button
                            type="button"
                            onClick={() => confirmSlot(round.id)}
                            className="mt-3 w-full rounded-md bg-[#D5AE65] px-4 py-3 text-sm font-semibold text-[#171613] transition hover:bg-[#E8CC91]"
                          >
                            Confirm Selection →
                          </button>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}

        <footer className="border-t border-[#D5AE65]/25 pt-5 text-xs text-[#938A79]">
          THE ANCIENT ONE&apos;S TRIALS · Choose wisely, prepare well.
        </footer>
      </div>
    </DashboardLayout>
  );
}
