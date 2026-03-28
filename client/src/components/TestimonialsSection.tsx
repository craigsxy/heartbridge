import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "Jennifer M.",
    role: "Mother of 4-year-old",
    text: "HeartBridge predicted my son's meltdown before it happened. The daily insights helped us prepare and the therapist we matched with understood our situation immediately. It changed our family's life.",
    rating: 5,
  },
  {
    name: "David & Lisa K.",
    role: "Parents of 6-year-old",
    text: "The sleep prediction feature alone is worth it. We finally understand the connection between our daughter's sleep patterns and her behavior the next day. The BCBA therapist matched us perfectly.",
    rating: 5,
  },
  {
    name: "Sarah T.",
    role: "Mother of 3-year-old",
    text: "As a single mom, having 24/7 access to the community and AI chatbot has been a lifeline. The video analysis feature helped our therapist understand behaviors I couldn't describe in words.",
    rating: 5,
  },
  {
    name: "Michael R.",
    role: "Father of 5-year-old twins",
    text: "Managing care for two children on the spectrum seemed impossible until HeartBridge. The predictive analysis helps us plan each day, and the therapist matching saved us months of searching.",
    rating: 5,
  },
];

const stats = [
  { value: "95%", label: "BCBA Therapist Match Satisfaction", description: "Out of 60 participants" },
  { value: "90%", label: "Prediction Accuracy", description: "AI behavioral analysis" },
  { value: "2,000+", label: "Parent Interviews", description: "Research-backed platform" },
  { value: "98.84%", label: "Cost Savings", description: "vs. traditional therapy costs" },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 md:py-32 bg-dots-pattern">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-600 tracking-wide">Trusted by Families</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
            Real families,
            <br />
            <span className="text-[#5B7DB8]">real results.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Backed by research from Penn Medicine, USC Medical, and Wharton, HeartBridge is trusted by families nationwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-3xl md:text-4xl font-extrabold text-[#5B7DB8] tracking-tight mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-400">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B7DB8] to-[#4A6FA5] flex items-center justify-center text-white font-bold text-xs">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
