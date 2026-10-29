"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { fetchWithAuth } from "../../lib/api";

type AvailabilitySlot = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  note: string;
};

export default function ManageAvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  // Loading states for DB actions
  const [isAdding, setIsAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // 1. Load real data from DB
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchWithAuth("/availability/me");
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((dbSlot: any) => {
            const start = new Date(dbSlot.startTime);
            const end = new Date(dbSlot.endTime);
            return {
              id: dbSlot.id,
              date: start.toISOString().split("T")[0],
              startTime: start.toTimeString().slice(0, 5),
              endTime: end.toTimeString().slice(0, 5),
              note: "", 
            };
          });
          setSlots(formatted.sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)));
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 2. Add new availability
  const addSlot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (startTime >= endTime) {
      setMessage("End time must be later than start time.");
      return;
    }

    const overlaps = slots.some(
      (slot) => slot.date === date && startTime < slot.endTime && endTime > slot.startTime
    );

    if (overlaps) {
      setMessage("This time overlaps with an existing availability slot.");
      return;
    }

    setIsAdding(true); //  Start loading

    try {
      const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
      const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

      const res = await fetchWithAuth("/availability", {
        method: "POST",
        body: JSON.stringify({ startTime: startDateTime, endTime: endDateTime }),
      });

      if (!res.ok) throw new Error("Failed to save to database");

      const savedSlot = await res.json();
      
      const newSlot: AvailabilitySlot = {
        id: savedSlot.id,
        date,
        startTime,
        endTime,
        note: note.trim(),
      };

      setSlots((prev) => [...prev, newSlot].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)));
      setDate("");
      setStartTime("");
      setEndTime("");
      setNote("");
      setMessage("Availability added successfully.");
    } catch (error: any) {
      setMessage(error.message || "Failed to save availability.");
    } finally {
      setIsAdding(false); // Stop loading
    }
  };

  // 3. Remove availability
  const removeSlot = async (id: string) => {
    setRemovingId(id); // Start loading specific item
    setMessage("");

    try {
      const res = await fetchWithAuth(`/availability/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSlots((prev) => prev.filter((slot) => slot.id !== id));
        setMessage("Availability removed.");
      } else {
        setMessage("Failed to remove from database.");
      }
    } catch (error) {
      setMessage("Error removing slot.");
    } finally {
      setRemovingId(null); // 👈 Stop loading
    }
  };

  const formatDate = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });

  return (
    <DashboardLayout role="Interviewer">
      <div className="min-h-screen bg-[#171613] px-4 py-8 text-[#F0E5CE] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
              The Ancient One&apos;s Trials
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Manage Availability</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#B9B09F]">
              Add the dates and time ranges when you are available to conduct interviews.
            </p>
          </div>

          <section className="mb-8 rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:p-7">
            <h2 className="text-xl font-semibold">Add Availability</h2>
            <form onSubmit={addSlot} className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-[#B9B09F]">Date</span>
                  <input type="date" value={date} min={new Date().toLocaleDateString("en-CA")} onChange={(e) => setDate(e.target.value)} required disabled={isAdding} className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65] disabled:opacity-50" />
                </label>
                <label className="block">
                  <span className="text-sm text-[#B9B09F]">Note (optional)</span>
                  <input type="text" value={note} onChange={(e) => setNote(e.target.value)} maxLength={100} disabled={isAdding} className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65] disabled:opacity-50" />
                </label>
                <label className="block">
                  <span className="text-sm text-[#B9B09F]">Start Time</span>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required disabled={isAdding} className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65] disabled:opacity-50" />
                </label>
                <label className="block">
                  <span className="text-sm text-[#B9B09F]">End Time</span>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required disabled={isAdding} className="mt-2 w-full rounded-lg border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65] disabled:opacity-50" />
                </label>
              </div>

              {message && (
                <p role="status" className={`mt-4 text-sm ${message.includes("success") || message.includes("removed") ? "text-green-300" : "text-red-300"}`}>
                  {message}
                </p>
              )}

              <button type="submit" disabled={isAdding} className="mt-6 flex items-center gap-2 rounded-lg bg-[#D5AE65] px-6 py-3 text-sm font-semibold text-[#171613] transition hover:bg-[#E5C47F] disabled:opacity-60">
                {isAdding ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "+ Add Availability"
                )}
              </button>
            </form>
          </section>

          <section>
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-xl font-semibold">Your Availability</h2>
                <p className="mt-2 text-sm text-[#B9B09F]">{loading ? "Loading..." : `${slots.length} availability entries`}</p>
              </div>
            </div>

            {slots.length > 0 ? (
              <div className="space-y-4">
                {slots.map((slot) => (
                  <article key={slot.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D5AE65]/20 bg-[#22201B] p-5 sm:flex-row sm:items-center sm:p-6">
                    <div>
                      <h3 className="font-semibold">{formatDate(slot.date)}</h3>
                      <p className="mt-2 text-sm text-[#D5AE65]">{slot.startTime} – {slot.endTime}</p>
                      {slot.note && <p className="mt-2 text-sm text-[#B9B09F]">{slot.note}</p>}
                    </div>
                    <button type="button" onClick={() => removeSlot(slot.id)} disabled={removingId === slot.id} className="w-fit rounded-lg border border-red-800/60 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-950/30 disabled:opacity-50">
                      {removingId === slot.id ? "Removing..." : "Remove"}
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="rounded-2xl border border-dashed border-[#D5AE65]/30 bg-[#22201B] px-6 py-12 text-center">
                  <h3 className="text-lg font-semibold">No Availability Added</h3>
                  <p className="mt-2 text-sm text-[#B9B09F]">Add a date and time range above to get started.</p>
                </div>
              )
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}