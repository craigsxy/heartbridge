import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WaitlistFormHandle {
  scrollToForm: () => void;
}

export const WaitlistForm = forwardRef<WaitlistFormHandle>(function WaitlistForm(_, ref) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".waitlist-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
    <section id="waitlist" ref={sectionRef} className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="waitlist-content max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B7DB8]/10 border border-[#5B7DB8]/20 mb-6">
              <svg className="w-4 h-4 text-[#5B7DB8]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="text-sm font-semibold text-[#5B7DB8] tracking-wide">Early Access</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
              Join the waitlist
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Be among the first families to experience HeartBridge. Get early access to AI-powered autism care, personalized predictions, and expert therapist matching.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16 bg-gradient-to-br from-[#5B7DB8]/5 to-emerald-50 rounded-3xl border border-[#5B7DB8]/10">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">You're on the list!</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Thank you for joining HeartBridge. We'll send you an invitation as soon as early access opens. Together, we'll make autism care better.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B7DB8]/30 focus:border-[#5B7DB8] transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B7DB8]/30 focus:border-[#5B7DB8] transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B7DB8]/30 focus:border-[#5B7DB8] transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Child's Age</label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData(prev => ({ ...prev, childAge: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7DB8]/30 focus:border-[#5B7DB8] transition-all"
                  >
                    <option value="">Select age range</option>
                    <option value="under-2">Under 2 years</option>
                    <option value="2-4">2-4 years</option>
                    <option value="4-6">4-6 years</option>
                    <option value="6-8">6-8 years</option>
                    <option value="8+">8+ years</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Concerns (Optional)</label>
                <textarea
                  value={formData.concerns}
                  onChange={(e) => setFormData(prev => ({ ...prev, concerns: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B7DB8]/30 focus:border-[#5B7DB8] transition-all resize-none"
                  placeholder="Tell us about your child's needs or any specific concerns..."
                />
              </div>
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full py-4 bg-[#1a1a2e] text-white font-semibold rounded-xl hover:bg-[#2a2a3e] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {submitMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Get Early Access"
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                By joining, you agree to receive updates from HeartBridge. We respect your privacy and will never share your information.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});
