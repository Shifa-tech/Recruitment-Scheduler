
"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type AvailabilitySlot = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  note: string;
};

export default function ManageAvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([
    {
      id: 1,
      date: "2026-10-30",
      startTime: "10:00",
      endTime: "12:00",
      note: "Morning availability",
    },
    {
      id: 2,
      date: "2026-11-02",
      startTime: "14:00",
      endTime: "16:00",
      note: "Afternoon availability",
    },
  ]);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const addSlot = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (startTime >= endTime) {
      setMessage("End time must be later than start time.");
      return;
    }

    const overlaps = slots.some(
      (slot) =>
        slot.date === date &&
        startTime < slot.endTime &&
        endTime > slot.startTime
    );

    if (overlaps) {
      setMessage("This time overlaps with an existing availability slot.");
      return;
    }

    const newSlot: AvailabilitySlot = {
      id: Date.now(),
      date,
      startTime,
      endTime,
      note: note.trim(),
    };

    setSlots((previous) =>
      [...previous, newSlot].sort(
        (a, b) =>
          a.date.localeCompare(b.date) ||
          a.startTime.localeCompare(b.startTime)
      )
    );

    setDate("");
    setStartTime("");
    setEndTime("");
    setNote("");
    setMessage("Availability added successfully.");
  };

  const removeSlot = (id: number) => {
    setSlots((previous) => previous.filter((slot) => slot.id !== id));
    setMessage("Availability removed.");
  };

  const formatDate = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

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
              Manage Availability
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B9B09F]">
              Add the dates and time ranges when you are available to conduct
              interviews. Avoid overlapping availability entries.
            </p>
          </div>

          {/* Add availability form */}
          <section className="mb-8 rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-7">
            <h2 className="text-xl font-semibold">Add Availability</h2>
            <p className="mt-2 text-sm text-[#B9B09F]">
              Choose a date and the time range you can offer.
            </p>

            <form onSubmit={addSlot} className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-[#B9B09F]">Date</span>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#B9B09F]">
                    Note (optional)
                  </span>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={100}
                    placeholder="e.g. Morning availability"
                    className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#B9B09F]">Start Time</span>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#B9B09F]">End Time</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65]"
                  />
                </label>
              </div>

              {message && (
                <p
                  role="status"
                  className={`mt-4 text-sm ${
                    message.includes("successfully") ||
                    message.includes("removed")
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 rounded-lg bg-[#D5AE65] px-6 py-3 text-sm font-semibold text-[#171613] transition hover:bg-[#E5C47F]"
              >
                + Add Availability
              </button>
            </form>
          </section>

          {/* Existing slots */}
          <section>
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-xl font-semibold">Your Availability</h2>
                <p className="mt-2 text-sm text-[#B9B09F]">
                  {slots.length} availability {slots.length === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>

            {slots.length > 0 ? (
              <div className="space-y-4">
                {slots.map((slot) => (
                  <article
                    key={slot.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:flex-row sm:items-center sm:p-6"
                  >
                    <div>
                      <h3 className="font-semibold">{formatDate(slot.date)}</h3>
                      <p className="mt-2 text-sm text-[#D5AE65]">
                        {slot.startTime} – {slot.endTime}
                      </p>
                      {slot.note && (
                        <p className="mt-2 text-sm text-[#B9B09F]">
                          {slot.note}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeSlot(slot.id)}
                      className="w-fit rounded-lg border border-red-800/60 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-950/30"
                    >
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#D5AE65]/30 bg-[#22201B] px-6 py-12 text-center">
                <h3 className="text-lg font-semibold">
                  No Availability Added
                </h3>
                <p className="mt-2 text-sm text-[#B9B09F]">
                  Add a date and time range above to get started.
                </p>
              </div>
            )}
          </section>

          <div className="mt-8 border-t border-[#D5AE65]/15 pt-6">
            <Link
              href="/interviewer"
              className="text-sm text-[#D5AE65] transition hover:text-[#F0E5CE]"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-[#B9B09F]/60">
            Good scheduling begins with clear availability.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
