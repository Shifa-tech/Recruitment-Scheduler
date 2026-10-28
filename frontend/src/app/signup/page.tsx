
"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Signup UI is ready. Account creation will be connected to NestJS next.");
  }

  const inputClass =
    "w-full border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm outline-none placeholder:text-[#777064] focus:border-[#D5AE65]";

  return (
    <main className="relative flex min-h-screen items-center justify-center
      overflow-hidden bg-[#171613] px-5 py-12 text-[#F0E5CE]">

      <div className="pointer-events-none absolute -right-32 -top-32
        h-96 w-96 rounded-full border border-[#D5AE65]/15" />
      <div className="pointer-events-none absolute -bottom-40 -left-32
        h-96 w-96 rounded-full border border-[#9D3F2A]/20" />

      <Link href="/" className="absolute left-6 top-6 text-sm
        text-[#C4BBA8] transition hover:text-[#D5AE65]">
        ← Return to the Order
      </Link>

      <section className="relative w-full max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center
            rounded-full border border-[#D5AE65]/60 text-3xl text-[#D5AE65]">
            ✳
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
            Join the Order
          </p>

          <h1 className="mt-3 font-serif text-4xl">
            Begin Your Journey
          </h1>

          <p className="mt-3 text-sm text-[#B9B09F]">
            Every great journey begins somewhere.
          </p>
        </div>

        <form onSubmit={handleSubmit}
          className="border border-[#D5AE65]/25 bg-[#211F1A] p-7
            shadow-2xl sm:p-9">

          <label htmlFor="name" className="mb-2 block text-sm">
            Full name
          </label>
          <input id="name" type="text" required autoComplete="name"
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className={`${inputClass} mb-5`} />

          <label htmlFor="email" className="mb-2 block text-sm">
            Email address
          </label>
          <input id="email" type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`${inputClass} mb-5`} />

          <label htmlFor="password" className="mb-2 block text-sm">
            Password
          </label>
          <input id="password" type="password" required minLength={8}
            autoComplete="new-password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className={`${inputClass} mb-5`} />

          <label htmlFor="role" className="mb-2 block text-sm">
            Your role
          </label>
          <select id="role" value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`${inputClass} mb-6 text-[#F0E5CE]`}>
            <option value="CANDIDATE">Candidate</option>
            <option value="INTERVIEWER">Interviewer</option>
          </select>

          <p className="mb-5 text-xs leading-5 text-[#938A79]">
            Coordinator access should be assigned by an authorized
            administrator, not through public signup.
          </p>

          <button type="submit"
            className="w-full bg-[#D5AE65] px-5 py-3.5
              text-sm font-semibold text-[#171613] transition
              hover:bg-[#E8CC91]">
            Create Your Account →
          </button>

          {message && (
            <p role="status" className="mt-4 text-sm leading-6 text-[#D5AE65]">
              {message}
            </p>
          )}

          <p className="mt-7 text-center text-sm text-[#B9B09F]">
            Already a member?{" "}
            <Link href="/login"
              className="text-[#D5AE65] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
