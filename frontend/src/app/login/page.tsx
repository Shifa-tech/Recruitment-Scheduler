
"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Login UI is ready. Authentication will be connected to NestJS next.");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center
      overflow-hidden bg-[#171613] px-5 py-12 text-[#F0E5CE]">

      <div className="pointer-events-none absolute -right-32 -top-32
        h-96 w-96 rounded-full border border-[#D5AE65]/15" />
      <div className="pointer-events-none absolute -right-20 -top-20
        h-72 w-72 rounded-full border border-[#D5AE65]/20" />
      <div className="pointer-events-none absolute -bottom-40 -left-32
        h-96 w-96 rounded-full border border-[#9D3F2A]/20" />

      <Link href="/" className="absolute left-6 top-6 text-sm
        text-[#C4BBA8] transition hover:text-[#D5AE65]">
        ← Return to the Order
      </Link>

      <section className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center
            rounded-full border border-[#D5AE65]/60 text-3xl text-[#D5AE65]">
            ✳
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
            The Ancient One&apos;s Trials
          </p>

          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
            Enter the Sanctum
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#B9B09F]">
            Your journey begins with a single step.
          </p>
        </div>

        <form onSubmit={handleSubmit}
          className="border border-[#D5AE65]/25 bg-[#211F1A] p-7
            shadow-2xl sm:p-9">

          <label htmlFor="email" className="mb-2 block text-sm text-[#E7D9BE]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mb-6 w-full border border-[#D5AE65]/20
              bg-[#171613] px-4 py-3 text-sm outline-none
              placeholder:text-[#777064] focus:border-[#D5AE65]"
          />

          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="password" className="text-sm text-[#E7D9BE]">
              Password
            </label>
            <span className="text-xs text-[#938A79]">
              Secure access
            </span>
          </div>

          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-[#D5AE65]/20
              bg-[#171613] px-4 py-3 text-sm outline-none
              placeholder:text-[#777064] focus:border-[#D5AE65]"
          />

          <button type="submit"
            className="mt-7 w-full bg-[#D5AE65] px-5 py-3.5
              text-sm font-semibold text-[#171613] transition
              hover:bg-[#E8CC91]">
            Enter the Order <span className="ml-2">→</span>
          </button>

          {message && (
            <p role="status" className="mt-4 text-sm leading-6 text-[#D5AE65]">
              {message}
            </p>
          )}

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#D5AE65]/20" />
            <span className="text-xs text-[#938A79]">NEW TO THE ORDER?</span>
            <div className="h-px flex-1 bg-[#D5AE65]/20" />
          </div>

          <Link href="/signup"
            className="block w-full border border-[#D5AE65]/40
              px-5 py-3.5 text-center text-sm transition
              hover:border-[#D5AE65] hover:text-[#D5AE65]">
            Create an account
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-[#777064]">
          Wisdom · Precision · Opportunity
        </p>
      </section>
    </main>
  );
}
