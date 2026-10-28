"use client";

import Link from "next/link";
import { useState } from "react";

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    department: "",
    degree: "",
    passingYear: "",
    role: "",
    resume: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Frontend demo only: backend integration comes next.
    setMessage(
      "Your application form is complete! Database submission will be connected next."
    );
  }

  const inputClass =
    "mt-2 w-full rounded-md border border-[#D5AE65]/25 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none transition placeholder:text-[#777064] focus:border-[#D5AE65] focus:ring-1 focus:ring-[#D5AE65]/30";

  const labelClass = "text-sm font-medium text-[#E6D8BE]";

  return (
    <main className="min-h-screen bg-[#171613] px-4 py-8 text-[#F0E5CE] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/candidate"
          className="inline-flex items-center gap-2 text-sm text-[#B9B09F] transition hover:text-[#D5AE65]"
        >
          <span>←</span> Back to Dashboard
        </Link>

        <header className="mb-8 mt-8 border-b border-[#D5AE65]/20 pb-7">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D5AE65]">
            The Ancient One&apos;s Trials
          </p>

          <h1 className="mt-4 font-serif text-3xl sm:text-5xl">
            Candidate Application
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9B09F]">
            Enter your academic details and select the role you wish to
            pursue. Ensure your information matches your official records.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs text-[#D5AE65]">
            <span>✦</span>
            <span>All fields are required</span>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#D5AE65]/25 bg-[#211F1A] p-5 shadow-xl shadow-black/10 sm:p-8"
        >
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9D3F2A]">
              Section I
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Personal Information
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="registrationNumber" className={labelClass}>
                Registration Number
              </label>
              <input
                id="registrationNumber"
                name="registrationNumber"
                required
                value={form.registrationNumber}
                onChange={handleChange}
                placeholder="Enter your registration number"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="department" className={labelClass}>
                Department
              </label>
              <select
                id="department"
                name="department"
                required
                value={form.department}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select department</option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-7 mt-10 border-t border-[#D5AE65]/15 pt-7">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9D3F2A]">
              Section II
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Academic & Role Details
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="degree" className={labelClass}>
                Degree
              </label>
              <select
                id="degree"
                name="degree"
                required
                value={form.degree}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select degree</option>
                <option value="B.Tech">B.Tech</option>
                <option value="B.E.">B.E.</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MCA">MCA</option>
                <option value="M.Sc.">M.Sc.</option>
                <option value="BCA">BCA</option>
                <option value="B.Sc.">B.Sc.</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="passingYear" className={labelClass}>
                Passing Year
              </label>
              <select
                id="passingYear"
                name="passingYear"
                required
                value={form.passingYear}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select passing year</option>
                {Array.from({ length: 8 }, (_, i) => 2026 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="role" className={labelClass}>
                Role Applying For
              </label>
              <select
                id="role"
                name="role"
                required
                value={form.role}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a role</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
              </select>
            </div>
          </div>

          <div className="mb-7 mt-10 border-t border-[#D5AE65]/15 pt-7">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9D3F2A]">
              Section III
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Resume & Documents
            </h2>
          </div>

          <div>
            <label htmlFor="resume" className={labelClass}>
              Resume Link
            </label>
            <input
              id="resume"
              name="resume"
              type="url"
              required
              value={form.resume}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className={inputClass}
            />
            <p className="mt-2 text-xs leading-5 text-[#938A79]">
              Paste a shareable link to your resume. Make sure the interviewer
              or recruitment team has permission to view it.
            </p>
          </div>

          <div className="mt-8 border-t border-[#D5AE65]/15 pt-6">
            <button
              type="submit"
              className="w-full rounded-md bg-[#D5AE65] px-6 py-3.5 text-sm font-semibold text-[#171613] transition hover:bg-[#E8CC91] focus:outline-none focus:ring-2 focus:ring-[#D5AE65] focus:ring-offset-2 focus:ring-offset-[#211F1A]"
            >
              Submit Application <span className="ml-1">→</span>
            </button>

            {message && (
              <p
                role="status"
                className="mt-4 rounded-md border border-[#D5AE65]/25 bg-[#171613] p-4 text-sm leading-6 text-[#D5AE65]"
              >
                {message}
              </p>
            )}
          </div>
        </form>

        <footer className="mt-8 text-center text-xs text-[#938A79]">
          THE ANCIENT ONE&apos;S TRIALS · Walk the path with wisdom.
        </footer>
      </div>
    </main>
  );
}