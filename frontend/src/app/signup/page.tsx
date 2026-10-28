
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { syncUserWithBackend } from "../lib/syncUser";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full border border-[#D5AE65]/20 bg-[#171613] px-4 py-3 text-sm outline-none placeholder:text-[#777064] focus:border-[#D5AE65]";

  function goToDashboard(role: string) {
    if (role === "COORDINATOR") {
      router.push("/coordinator");
    } else if (role === "INTERVIEWER") {
      router.push("/interviewer");
    } else {
      router.push("/candidate");
    }
  }

  async function finishSignup() {
    const user = await syncUserWithBackend();
    goToDashboard(user.role ?? "CANDIDATE");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: name.trim(),
      });

      await finishSignup();
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setMessage("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      await finishSignup();
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "Google signup failed."
      );
    } finally {
      setLoading(false);
    }
  }

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
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className={`${inputClass} mb-5`}
          />

          <label htmlFor="email" className="mb-2 block text-sm">
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
            className={`${inputClass} mb-5`}
          />

          <label htmlFor="password" className="mb-2 block text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className={`${inputClass} mb-5`}
          />

          <p className="mb-5 text-xs leading-5 text-[#938A79]">
            New accounts begin as candidates. Interviewer and coordinator
            access must be granted by an authorized administrator.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D5AE65] px-5 py-3.5
              text-sm font-semibold text-[#171613] transition
              hover:bg-[#E8CC91] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Creating your account..." : "Create Your Account →"}
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#D5AE65]/20" />
            <span className="text-xs text-[#938A79]">OR</span>
            <div className="h-px flex-1 bg-[#D5AE65]/20" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full border border-[#D5AE65]/40 px-5 py-3.5
              text-sm transition hover:border-[#D5AE65]
              hover:text-[#D5AE65] disabled:opacity-60">
            Continue with Google
          </button>

          {message && (
            <p role="alert" className="mt-4 break-words text-sm leading-6 text-red-300">
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
