"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { fetchWithAuth } from "../../lib/api";
import { auth } from "@/app/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

type Interview = {
  id: string;
  round: string;
  startTime: string;
  endTime: string;
  status: string;
  candidate: { name: string; email: string };
  interviewer: { name: string };
  room: { roomNo: string } | null;
};

export default function CoordinatorInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadInterviews() {
    try {
      const res = await fetchWithAuth("/interviews/all");
      if (res.ok) {
        const data = await res.json();
        setInterviews(data);
      }
    } catch (error) {
      console.error("Failed to load interviews", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadInterviews();
      } else {
        setLoading(false);
        setMessage("Please log in to view this page.");
      }
    });

    return () => unsubscribe();
  }, []);

  async function cancelInterview(id: string) {
    if (!window.confirm("Are you sure you want to cancel this interview?")) return;
    
    try {
      const res = await fetchWithAuth(`/interviews/${id}/coordinator-cancel`, {
        method: "PATCH",
      });
      if (res.ok) {
        setMessage("Interview cancelled successfully.");
        loadInterviews(); // Refresh list
      } else {
        setMessage("Failed to cancel interview.");
      }
    } catch (error) {
      setMessage("Error cancelling interview.");
    }
  }

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleString("en-IN", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <DashboardLayout role="Coordinator">
      <div className="min-h-screen bg-[#171613] p-4 text-[#F0E5CE] sm:p-8">
        <div className="mx-auto max-w-7xl space-y-7">
          
          <header className="border-b border-[#D5AE65]/25 pb-6">
            <Link href="/coordinator" className="text-sm text-[#D5AE65] hover:underline">
              ← Command Chamber
            </Link>
            <p className="mt-4 text-[10px] uppercase tracking-[.3em] text-[#D5AE65]">
              Recruitment Operations
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">All Interviews</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#B9B09F]">
              Monitor all scheduled interviews across the platform. Manage cancellations here.
            </p>
          </header>

          {message && (
            <div className="border border-[#D5AE65]/30 bg-[#211F1A] p-4 text-sm text-[#D5AE65]">
              {message}
            </div>
          )}

          <section className="border border-[#D5AE65]/25 bg-[#FFFAF0] text-[#29241D]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-[#E8DCC5]/60 text-[10px] uppercase tracking-wider text-[#756651]">
                  <tr>
                    <th className="px-5 py-4 font-medium">Candidate</th>
                    <th className="px-5 py-4 font-medium">Interviewer</th>
                    <th className="px-5 py-4 font-medium">Round</th>
                    <th className="px-5 py-4 font-medium">Time</th>
                    <th className="px-5 py-4 font-medium">Room</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="p-5 text-center text-[#756651]">Loading...</td></tr>
                  ) : interviews.length === 0 ? (
                    <tr><td colSpan={7} className="p-5 text-center text-[#756651]">No interviews scheduled yet.</td></tr>
                  ) : (
                    interviews.map((x) => (
                      <tr key={x.id} className="border-t border-[#E6D8BE] hover:bg-[#F5ECD9]">
                        <td className="px-5 py-4">
                          <p className="font-medium">{x.candidate.name}</p>
                          <p className="text-xs text-[#756651]">{x.candidate.email}</p>
                        </td>
                        <td className="px-5 py-4">{x.interviewer.name}</td>
                        <td className="px-5 py-4">{x.round}</td>
                        <td className="px-5 py-4 text-[#756651]">{formatTime(x.startTime)}</td>
                        <td className="px-5 py-4">{x.room?.roomNo || 'TBD'}</td>
                        <td className="px-5 py-4">
                          <span className={`whitespace-nowrap border px-2 py-1 text-xs ${
                            x.status === "SCHEDULED" ? "border-green-700/50 text-green-700 bg-green-50" : 
                            x.status === "CANCELLED" ? "border-red-700/50 text-red-700 bg-red-50" : 
                            "border-[#B58A42]/30 text-[#896522] bg-[#F7EBD0]"
                          }`}>
                            {x.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {x.status === "SCHEDULED" && (
                            <button 
                              onClick={() => cancelInterview(x.id)}
                              className="text-xs font-semibold text-[#9D3F2A] hover:underline"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}