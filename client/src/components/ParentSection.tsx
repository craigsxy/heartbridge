import { useState, forwardRef, useImperativeHandle } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export interface ParentSectionHandle {
  scrollToForm: () => void;
}

/* ─── Placeholder reviews ───────────────────────────────────────────────────
   Replace the text, name, and role below with the actual parent quotes
   once the leader provides them.
   ─────────────────────────────────────────────────────────────────────────── */
const reviews = [
  {
    text: "HeartBridge predicted my son's meltdown before it happened. The daily insights helped us prepare, and the therapist we matched with understood our situation immediately. It changed our family's life.",
    name: "Jennifer M.",
    role: "Mother of 4-year-old",
    rating: 5,
  },
  {
    text: "The sleep prediction feature alone is worth it. We finally understand the connection between our daughter's sleep patterns and her behavior the next day. The BCBA therapist matched us perfectly.",
    name: "David & Lisa K.",
    role: "Parents of 6-year-old",
    rating: 5,
  },
];

const stats = [
  { value: "95%", label: "Therapist Match Satisfaction", sub: "Out of 60 participants" },
  { value: "90%", label: "Prediction Accuracy", sub: "AI behavioral analysis" },
  { value: "2,000+", label: "Parent Interviews", sub: "Research-backed platform" },
  { value: "98.84%", label: "Cost Savings", sub: "vs. traditional therapy" },
];

export const ParentSection = forwardRef<ParentSectionHandle>(function ParentSection(_, ref) {
  const formRef = useState<HTMLFormElement | null>(null);
  const sectionId = "parents";

  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childAge: "",
    concerns: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.waitlist.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Welcome to HeartBridge! We'll be in touch soon.");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  useImperativeHandle(ref, () => ({
    scrollToForm: () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName.trim() || !formData.email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    submitMutation.mutate({
      parentName: formData.parentName,
      email: formData.email,
      phone: formData.phone || undefined,
      childAge: formData.childAge || undefined,
      concerns: formData.concerns || undefined,
      source: "landing_page",
    });
  };

  return (
    <section id={sectionId} className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0068FF]/10 border border-[#0068FF]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0068FF] animate-pulse" />
            <span className="text-sm font-semibold text-[#0068FF] tracking-wide">For Parents</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#2C3D4B] mb-4">
            Trusted by families,
            <br />
            <span className="text-[#0068FF]">backed by research.</span>
          </h2>
          <p className="text-[#6A7780] text-lg max-w-2xl mx-auto leading-relaxed">
            Backed by Penn Medicine, USC Medical, and Wharton. Join families already on the waitlist.
          </p>
        </div>

        {/* Main grid: Left (stats + reviews) | Right (form) */}
        {/* Mobile order: reviews first, then form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Stats + Reviews ── */}
          {/* On mobile this renders second (order-2), on desktop it's first (lg:order-1) */}
          <div className="order-2 lg:order-1 flex flex-col gap-8">

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="p-5 bg-[#FAFAFA] rounded-2xl border border-[#F0F2F7]">
                  <p className="text-2xl font-extrabold text-[#0068FF] tracking-tight mb-1">{s.value}</p>
                  <p className="text-sm font-semibold text-[#2C3D4B] leading-tight mb-1">{s.label}</p>
                  <p className="text-xs text-[#8695A3]">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="flex flex-col gap-4">
              {reviews.map((r, i) => (
                <div key={i} className="bg-[#FAFAFA] rounded-2xl p-6 border border-[#F0F2F7]">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#FFA30E]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#4E6479] text-sm leading-relaxed mb-4 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0068FF] to-[#0051E8] flex items-center justify-center text-white font-bold text-xs">
                      {r.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#2C3D4B]">{r.name}</p>
                      <p className="text-xs text-[#8695A3]">{r.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Waitlist Form ── */}
          {/* On mobile this renders first (order-1), on desktop it's second (lg:order-2) */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-[#F3F8FF] to-white rounded-3xl p-8 border border-[#D4E8FF] shadow-sm sticky top-28">

              {/* Form header */}
              <div className="mb-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0068FF]/10 border border-[#0068FF]/20 mb-4">
                  <svg className="w-3.5 h-3.5 text-[#0068FF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="text-xs font-semibold text-[#0068FF]">Early Access</span>
                </div>
                <h3 className="text-2xl font-bold text-[#2C3D4B] mb-2">Join the waitlist</h3>
                <p className="text-[#6A7780] text-sm leading-relaxed">
                  Be among the first families to get access. We'll notify you as soon as early access opens.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 bg-[#F3F8FF] rounded-2xl border border-[#D4E8FF]">
                  <div className="w-16 h-16 rounded-full bg-[#E5F5FF] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#0068FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-[#2C3D4B] mb-2">You're on the list!</h4>
                  <p className="text-sm text-[#6A7780] max-w-xs mx-auto">
                    We'll send your invitation as soon as early access opens.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4E6479] mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData(p => ({ ...p, parentName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#CDD4DC] bg-white text-[#2C3D4B] text-sm placeholder-[#ACBBC3] focus:outline-none focus:ring-2 focus:ring-[#0068FF]/30 focus:border-[#0068FF] transition-all"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4E6479] mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#CDD4DC] bg-white text-[#2C3D4B] text-sm placeholder-[#ACBBC3] focus:outline-none focus:ring-2 focus:ring-[#0068FF]/30 focus:border-[#0068FF] transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4E6479] mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#CDD4DC] bg-white text-[#2C3D4B] text-sm placeholder-[#ACBBC3] focus:outline-none focus:ring-2 focus:ring-[#0068FF]/30 focus:border-[#0068FF] transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4E6479] mb-1.5">Child's Age</label>
                      <select
                        value={formData.childAge}
                        onChange={(e) => setFormData(p => ({ ...p, childAge: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#CDD4DC] bg-white text-[#2C3D4B] text-sm focus:outline-none focus:ring-2 focus:ring-[#0068FF]/30 focus:border-[#0068FF] transition-all"
                      >
                        <option value="">Select age</option>
                        <option value="under-2">Under 2 years</option>
                        <option value="2-4">2–4 years</option>
                        <option value="4-6">4–6 years</option>
                        <option value="6-8">6–8 years</option>
                        <option value="8+">8+ years</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4E6479] mb-1.5">Primary Concerns (Optional)</label>
                    <textarea
                      value={formData.concerns}
                      onChange={(e) => setFormData(p => ({ ...p, concerns: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#CDD4DC] bg-white text-[#2C3D4B] text-sm placeholder-[#ACBBC3] focus:outline-none focus:ring-2 focus:ring-[#0068FF]/30 focus:border-[#0068FF] transition-all resize-none"
                      placeholder="Tell us about your child's needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full py-4 bg-[#0068FF] text-white font-semibold rounded-xl hover:bg-[#0051E8] transition-all duration-300 shadow-lg shadow-[#0068FF]/30 hover:shadow-xl hover:shadow-[#0068FF]/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {submitMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : "Get Early Access"}
                  </button>
                  <p className="text-center text-xs text-[#8695A3]">
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
