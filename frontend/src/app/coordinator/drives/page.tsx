"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type Drive = { id: number; name: string; role: string; candidates: number; scheduled: number; status: "In Progress" | "Needs Scheduling" | "Completed" };
const initialDrives: Drive[] = [
  { id: 1, name: "Software Engineer 2026", role: "Software Engineering", candidates: 48, scheduled: 36, status: "In Progress" },
  { id: 2, name: "Frontend Developer 2026", role: "Frontend Engineering", candidates: 32, scheduled: 28, status: "In Progress" },
  { id: 3, name: "Backend Developer 2026", role: "Backend Engineering", candidates: 28, scheduled: 14, status: "Needs Scheduling" },
  { id: 4, name: "Data Engineer 2026", role: "Data Engineering", candidates: 20, scheduled: 8, status: "Needs Scheduling" },
];
const inputClass = "w-full border border-[#D5AE65]/30 bg-[#171613] px-3 py-2.5 text-sm text-[#F0E5CE] outline-none focus:border-[#D5AE65]";
const buttonClass = "bg-[#D5AE65] px-4 py-2.5 text-sm font-semibold text-[#171613] transition hover:bg-[#E8CC91]";

export default function CoordinatorDrivesPage() {
  const [drives, setDrives] = useState(initialDrives);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [candidates, setCandidates] = useState("0");
  const [error, setError] = useState("");
  const visible = useMemo(() => drives.filter(d => `${d.name} ${d.role} ${d.status}`.toLowerCase().includes(search.toLowerCase())), [drives, search]);
  function addDrive(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError("");
    if (!name.trim() || !role.trim() || !Number.isInteger(Number(candidates)) || Number(candidates) < 0) { setError("Enter a drive name, role, and a valid candidate count."); return; }
    if (drives.some(d => d.name.toLowerCase() === name.trim().toLowerCase())) { setError("A drive with this name already exists."); return; }
    setDrives(prev => [...prev, { id: Date.now(), name: name.trim(), role: role.trim(), candidates: Number(candidates), scheduled: 0, status: "Needs Scheduling" }]);
    setName(""); setRole(""); setCandidates("0"); setShowForm(false);
  }
  return <DashboardLayout role="Coordinator"><main className="min-h-screen bg-[#171613] p-4 text-[#F0E5CE] sm:p-8"><div className="mx-auto max-w-7xl space-y-7">
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D5AE65]/25 pb-6"><div><Link href="/coordinator" className="text-sm text-[#D5AE65] hover:underline">← Command Chamber</Link><p className="mt-4 text-[10px] uppercase tracking-[.3em] text-[#D5AE65]">Recruitment Operations</p><h1 className="mt-2 font-serif text-3xl sm:text-4xl">Recruitment Drives</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#B9B09F]">Create recruitment drives and track applicant volume and scheduling progress.</p></div><button onClick={() => setShowForm(v => !v)} className={buttonClass}>{showForm ? "Close Form" : "+ Create Drive"}</button></header>
    <section className="grid gap-4 sm:grid-cols-3">{[{ label: "Total Drives", value: drives.length }, { label: "Candidates", value: drives.reduce((n,d)=>n+d.candidates,0) }, { label: "Interviews Scheduled", value: drives.reduce((n,d)=>n+d.scheduled,0) }].map(s=><article key={s.label} className="border border-[#D5AE65]/25 bg-[#FFFAF0] p-5 text-[#29241D]"><p className="text-sm text-[#756651]">{s.label}</p><p className="mt-3 font-serif text-3xl">{s.value}</p></article>)}</section>
    {showForm && <form onSubmit={addDrive} className="grid gap-4 border border-[#D5AE65]/30 bg-[#211F1A] p-5 sm:grid-cols-2"><div><label className="mb-2 block text-sm text-[#B9B09F]">Drive name</label><input className={inputClass} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. QA Engineer 2026" required /></div><div><label className="mb-2 block text-sm text-[#B9B09F]">Role / department</label><input className={inputClass} value={role} onChange={e=>setRole(e.target.value)} placeholder="e.g. Quality Engineering" required /></div><div><label className="mb-2 block text-sm text-[#B9B09F]">Initial candidate count</label><input className={inputClass} type="number" min="0" step="1" value={candidates} onChange={e=>setCandidates(e.target.value)} required /></div>{error && <p className="text-sm text-red-300 sm:col-span-2">{error}</p>}<div className="flex items-end"><button className={buttonClass} type="submit">Save Drive</button></div></form>}
    <section className="border border-[#D5AE65]/25 bg-[#FFFAF0] text-[#29241D]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6D8BE] p-5"><div><h2 className="font-serif text-2xl">All Drives</h2><p className="mt-1 text-sm text-[#756651]">{visible.length} drive(s) shown</p></div><input className="w-full max-w-sm border border-[#D5AE65]/40 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9D3F2A]" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search drives..." aria-label="Search drives" /></div><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-[#E8DCC5]/60 text-[10px] uppercase tracking-wider text-[#756651]"><tr>{["Drive", "Role", "Candidates", "Scheduled", "Progress", "Status"].map(x=><th key={x} className="px-5 py-4 font-medium">{x}</th>)}</tr></thead><tbody>{visible.map(d=>{const progress=d.candidates ? Math.round(d.scheduled/d.candidates*100) : 0; return <tr key={d.id} className="border-t border-[#E6D8BE] hover:bg-[#F5ECD9]"><td className="px-5 py-4 font-medium">{d.name}</td><td className="px-5 py-4 text-[#756651]">{d.role}</td><td className="px-5 py-4">{d.candidates}</td><td className="px-5 py-4">{d.scheduled}</td><td className="px-5 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-20 bg-[#E6D8BE]"><div className="h-full bg-[#9D3F2A]" style={{width:`${Math.min(progress,100)}%`}} /></div><span className="text-xs text-[#756651]">{progress}%</span></div></td><td className="px-5 py-4"><span className="border border-[#B58A42]/30 bg-[#F7EBD0] px-2.5 py-1 text-xs text-[#896522]">{d.status}</span></td></tr>})}{visible.length===0 && <tr><td colSpan={6} className="p-10 text-center text-[#756651]">No drives match your search.</td></tr>}</tbody></table></div></section>
    <p className="border-t border-[#D5AE65]/20 pt-4 text-xs text-[#8B7D68]">Demo mode: drives are stored in local page state and reset on refresh. Backend persistence will be added later.</p>
  </div></main></DashboardLayout>;
}
