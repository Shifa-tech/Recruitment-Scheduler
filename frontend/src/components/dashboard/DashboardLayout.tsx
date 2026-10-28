
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

type DashboardRole = "Candidate" | "Interviewer" | "Coordinator";

type Props = {
  role: DashboardRole;
  children: ReactNode;
};

const navigation = {
  Candidate: [
    { label: "Overview", href: "/candidate", icon: "⌂" },
    { label: "My Interviews", href: "/candidate/interviews", icon: "◷" },
    { label: "Available Slots", href: "/candidate/slots", icon: "✧" },
    { label: "My Results", href: "/candidate/results", icon: "♜" },
  ],
  Interviewer: [
    { label: "Overview", href: "/interviewer", icon: "⌂" },
    { label: "My Schedule", href: "/interviewer/schedule", icon: "◷" },
    { label: "Availability", href: "/interviewer/availability", icon: "✧" },
    { label: "Evaluations", href: "/interviewer/evaluations", icon: "♜" },
  ],
  Coordinator: [
    { label: "Overview", href: "/coordinator", icon: "⌂" },
    { label: "Recruitment Drives", href: "/coordinator/drives", icon: "◈" },
    { label: "Schedule Engine", href: "/coordinator/scheduling", icon: "✧" },
    { label: "Rooms", href: "/coordinator/rooms", icon: "▦" },
    { label: "Interviews", href: "/coordinator/interviews", icon: "◷" },
  ],
};

export default function DashboardLayout({ role, children }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = navigation[role];

  return (
    <div className="min-h-screen bg-[#F0E5CE] text-[#29241D] md:flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-[#D5AE65]/20 bg-[#171613] text-[#F0E5CE]
          transition-transform duration-300 md:sticky md:top-0
          md:h-screen md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Link href="/" className="flex items-center gap-3 px-6 py-7">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center
            rounded-full border border-[#D5AE65]/70 text-2xl text-[#D5AE65]">
            ✳
          </span>
          <span className="font-serif text-sm leading-5 tracking-[0.12em]">
            THE ANCIENT ONE&apos;S
            <br />
            <span className="text-[#D5AE65]">TRIALS</span>
          </span>
        </Link>

        <div className="mx-5 h-px bg-[#D5AE65]/20" />

        <div className="px-6 pb-4 pt-7">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#938A79]">
            Your sanctuary
          </p>
          <p className="mt-2 text-sm font-medium">{role} Portal</p>
        </div>

        <nav aria-label="Dashboard navigation" className="flex-1 space-y-2 px-4">
          {items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-4 border px-4 py-3
                  text-sm transition ${
                    active
                      ? "border-[#D5AE65]/30 bg-[#D5AE65]/10 text-[#E8CC91]"
                      : "border-transparent text-[#B9B09F] hover:border-[#D5AE65]/20 hover:text-[#F0E5CE]"
                  }`}
              >
                <span className="w-5 text-center text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
                {active && (
                  <span className="ml-auto text-[#D5AE65]">✦</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mx-5 h-px bg-[#D5AE65]/20" />

        <div className="p-5">
          <div className="border border-[#D5AE65]/20 bg-[#211F1A] p-4">
            <p className="font-serif text-base italic text-[#D5AE65]">
              Wisdom. Precision.
            </p>
            <p className="mt-2 text-xs leading-5 text-[#938A79]">
              Every trial is an opportunity to grow.
            </p>
          </div>

          <Link
            href="/"
            className="mt-4 block px-2 py-2 text-xs text-[#B9B09F]
              transition hover:text-[#D5AE65]"
          >
            ← Return to the Order
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[76px] items-center
          justify-between border-b border-[#D5AE65]/25 bg-[#F0E5CE]/95
          px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="border border-[#D5AE65]/40 px-3 py-2
                text-xl md:hidden"
            >
              ☰
            </button>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#8E3B28]">
                The Sanctum / {role}
              </p>
              <p className="mt-1 text-sm font-medium sm:text-base">
                Your Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden text-xs text-[#756651] sm:block">
              Welcome to your sanctuary
            </span>
            <div className="flex h-10 w-10 items-center justify-center
              rounded-full border border-[#9D3F2A]/40 bg-[#E5D3B4]
              font-serif text-lg text-[#9D3F2A]">
              A
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] px-5 py-8
          sm:px-8 sm:py-10 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
