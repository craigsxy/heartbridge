import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    step: "01",
    title: "Search & Discover",
    description: "Browse our network of certified BCBA therapists. Search by name, specialty, or specific symptoms your child experiences.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Filter & Match",
    description: "Apply filters for communication, meltdown management, behavior analysis, and more. Our AI recommends the best matches based on your child's profile.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Review Profiles",
    description: "View detailed therapist profiles including qualifications, specialties, years of experience, patient reviews, and ratings before making your choice.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Book & Connect",
    description: "Schedule video or messaging consultations directly. Choose your preferred date, time, and session duration. Start getting expert guidance immediately.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function TherapistSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".therapist-step",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".therapist-visual",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="therapists" ref={sectionRef} className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2273FD]/10 border border-[#2273FD]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#2273FD] animate-pulse" />
            <span className="text-sm font-semibold text-[#2273FD] tracking-wide">Therapist Matching</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#2C3D4B] mb-5">
            Find the right therapist,
            <br />
            <span className="text-[#0068FF]">in minutes.</span>
          </h2>
          <p className="text-[#6A7780] text-lg max-w-2xl mx-auto leading-relaxed">
            Our intelligent matching system connects your family with certified BCBA therapists who specialize in your child's specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="therapist-step group flex gap-5 p-5 rounded-2xl hover:bg-[#F3F8FF] transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#0068FF]/10 text-[#0068FF] flex items-center justify-center group-hover:bg-[#0068FF] group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-[#0068FF]/50 uppercase tracking-widest">Step {step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3D4B] mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-[#6A7780] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Card */}
          <div className="therapist-visual relative">
            <div className="relative bg-gradient-to-br from-[#0068FF]/5 to-[#2273FD]/5 rounded-3xl p-8 border border-[#D4E8FF]">
              {/* Therapist Cards Preview */}
              <div className="space-y-4">
                {[
                  { name: "Dr. Sarah Johnson", specialty: "Communication & Social Skills", rating: 4.9, reviews: 127, available: true },
                  { name: "Dr. Michael Chen", specialty: "Meltdown Prevention & ABA", rating: 4.8, reviews: 98, available: true },
                  { name: "Coach Maya Rivera", specialty: "Sensory Processing & Behavior", rating: 4.9, reviews: 156, available: false },
                ].map((therapist, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border border-[#F0F2F7] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0068FF] to-[#0051E8] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {therapist.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-[#2C3D4B] text-sm truncate">{therapist.name}</h4>
                          {therapist.available && (
                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Available
                            </span>
                          )}
                        </div>
                        <p className="text-[#8695A3] text-xs mb-2">{therapist.specialty}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[#FFA30E]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs font-semibold text-[#4E6479]">{therapist.rating}</span>
                          </div>
                          <span className="text-xs text-[#8695A3]">{therapist.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { value: "200+", label: "BCBA Therapists" },
                  { value: "95%", label: "Match Rate" },
                  { value: "<24h", label: "First Session" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 bg-white rounded-xl border border-[#D4E8FF]">
                    <div className="text-xl font-extrabold text-[#0068FF] tracking-tight">{stat.value}</div>
                    <div className="text-[10px] font-medium text-[#8695A3] uppercase tracking-wider mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
