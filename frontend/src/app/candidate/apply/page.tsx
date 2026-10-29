"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../../lib/api";

// The hardcoded technical skills for the candidate to select
const AVAILABLE_SKILLS = [
  "DSA", 
  "Web Development", 
  "React", 
  "Next.js", 
  "Node.js", 
  "Python", 
  "Java", 
  "C++", 
  "SQL", 
  "System Design"
];

export default function ApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    department: "",
    degree: "",
    passingYear: "",
    skills: [] as string[], // Array for skills
    resume: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  }

  function toggleSkill(skill: string) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (form.skills.length === 0) {
      setMessage("Please select at least one skill.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Send skills array to the backend
      const res = await fetchWithAuth("/interviews/apply", {
        method: "POST",
        body: JSON.stringify({ 
          skills: form.skills, 
          round: "TECH" // Defaulting to TECH for this form
        }),
      });

      if (!res.ok) throw new Error("Failed to submit application.");

      setSubmitted(true);
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-md border border-[#D5AE65]/25 bg-[#171613] px-4 py-3 text-sm text-[#F0E5CE] outline-none transition placeholder:text-[#777064] focus:border-[#D5AE65] focus:ring-1 focus:ring-[#D5AE65]/30";

  const labelClass = "text-sm font-medium text-[#E6D8BE]";

  // The "Thank You" screen
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#171613] flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-[#D5AE65]/30 bg-[#211F1A] p-8 text-center shadow-2xl">
          <div className="text-5xl text-[#D5AE65] mb-6">✦</div>
          <h1 className="text-3xl font-serif text-[#F0E5CE] mb-4">Application Received</h1>
          <p className="text-sm text-[#B9B09F] leading-7 mb-8">
            Thank you for filling out the form. Our scheduling engine is currently finding the perfect interviewer and room for you.
          </p>
          <Link 
            href="/candidate/slots" 
            className="inline-block w-full bg-[#D5AE65] text-[#171613] px-6 py-3.5 font-semibold hover:bg-[#E8CC91] transition"
          >
            Check Your Available Slots →
          </Link>
        </div>
      </main>
    );
  }

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
          <h1 className="mt-4 font-serif text-3xl sm:text-5xl">Candidate Application</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9B09F]">
            Enter your academic details and select the skills you possess. 
            Ensure your information matches your official records.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#D5AE65]/25 bg-[#211F1A] p-5 shadow-xl shadow-black/10 sm:p-8"
        >
          {/* Section I: Personal */}
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9D3F2A]">Section I</p>
            <h2 className="mt-2 font-serif text-2xl">Personal Information</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Enter your full name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="registrationNumber" className={labelClass}>Registration Number</label>
              <input id="registrationNumber" name="registrationNumber" required value={form.registrationNumber} onChange={handleChange} placeholder="Enter your registration number" className={inputClass} />
            </div>
            <div>
              <label htmlFor="department" className={labelClass}>Department</label>
              <select id="department" name="department" required value={form.department} onChange={handleChange} className={inputClass}>
                <option value="">Select department</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Section II: Academic & Skills */}
          <div className="mb-7 mt-10 border-t border-[#D5AE65]/15 pt-7">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9D3F2A]">Section II</p>
            <h2 className="mt-2 font-serif text-2xl">Academic & Skill Details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="degree" className={labelClass}>Degree</label>
              <select id="degree" name="degree" required value={form.degree} onChange={handleChange} className={inputClass}>
                <option value="">Select degree</option>
                <option value="B.Tech">B.Tech</option>
                <option value="B.E.">B.E.</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MCA">MCA</option>
                <option value="B.Sc.">B.Sc.</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="passingYear" className={labelClass}>Passing Year</label>
              <select id="passingYear" name="passingYear" required value={form.passingYear} onChange={handleChange} className={inputClass}>
                <option value="">Select passing year</option>
                {Array.from({ length: 8 }, (_, i) => 2026 + i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {/* The NEW Skills Section */}
            <div className="sm:col-span-2 mt-4">
              <label className={labelClass}>Select Your Skills (Choose all that apply)</label>
              <div className="mt-3 flex flex-wrap gap-3">
                {AVAILABLE_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 text-sm border transition ${
                      form.skills.includes(skill)
                        ? "border-[#D5AE65] bg-[#D5AE65]/20 text-[#D5AE65]"
                        : "border-[#D5AE65]/20 text-[#B9B09F] hover:border-[#D5AE65]/50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {form.skills.length === 0 && (
                <p className="mt-2 text-xs text-[#9D3F2A]">Please select at least one skill to help us match you.</p>
              )}
            </div>
          </div>

          {/* Section III: Resume */}
          <div className="mb-7 mt-10 border-t border-[#D5AE65]/15 pt-7">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9D3F2A]">Section III</p>
            <h2 className="mt-2 font-serif text-2xl">Resume & Documents</h2>
          </div>

          <div>
            <label htmlFor="resume" className={labelClass}>Resume Link</label>
            <input id="resume" name="resume" type="url" required value={form.resume} onChange={handleChange} placeholder="https://drive.google.com/..." className={inputClass} />
            <p className="mt-2 text-xs leading-5 text-[#938A79]">
              Paste a shareable link to your resume. Make sure the interviewer has permission to view it.
            </p>
          </div>

          <div className="mt-8 border-t border-[#D5AE65]/15 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#D5AE65] px-6 py-3.5 text-sm font-semibold text-[#171613] transition hover:bg-[#E8CC91] focus:outline-none disabled:opacity-50"
            >
              {loading ? "Submitting Application..." : "Submit Application →"}
            </button>

            {message && (
              <p role="status" className="mt-4 rounded-md border border-[#9D3F2A]/40 bg-[#171613] p-4 text-sm text-red-300">
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}