import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Predictive Behavioral Analysis",
    description: "AI-powered daily predictions for sleep quality, meltdown risk, and communication patterns. Get personalized insights with 90% accuracy to prepare for your child's day.",
    metric: "90%",
    metricLabel: "Prediction Accuracy",
    color: "#5B7DB8",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Real-time Recording & Reports",
    description: "Record and upload videos of your child's behavior for instant AI analysis. Get detailed behavior reports that help track activity transitions and emotional patterns.",
    metric: "Real-time",
    metricLabel: "Video Analysis",
    color: "#4A9B8E",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Instant Therapist Connection",
    description: "Connect with certified BCBA therapists instantly. Our matching algorithm considers your child's specific needs, therapist specialties, and availability for the best fit.",
    metric: "95%",
    metricLabel: "Match Success Rate",
    color: "#7B5EA7",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "24/7 Parent Support Community",
    description: "Join a supportive community of parents navigating autism care. Share experiences, get advice, and access AI-generated calming morning routines and sensory guides.",
    metric: "24/7",
    metricLabel: "Always Available",
    color: "#D4756B",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "AI Chatbot & Resource Hub",
    description: "Get instant answers from our AI chatbot trained on autism care best practices. Access curated resources, parent workshops, and clinical conversations all in one place.",
    metric: "Instant",
    metricLabel: "AI Responses",
    color: "#C4883A",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for hover gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
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

  return (
    <section id="features" ref={sectionRef} className="relative py-24 md:py-32 bg-dots-pattern">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B7DB8]/10 border border-[#5B7DB8]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5B7DB8] animate-pulse" />
            <span className="text-sm font-semibold text-[#5B7DB8] tracking-wide">Core Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
            Everything your family needs,
            <br />
            <span className="text-[#5B7DB8]">in one place.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            HeartBridge combines AI-powered predictions, real-time analysis, and expert therapist connections to provide comprehensive autism care support.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                index >= 3 ? "lg:col-span-1 md:col-span-1" : ""
              }`}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{feature.description}</p>

              {/* Metric */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <span className="text-2xl font-extrabold tracking-tight" style={{ color: feature.color }}>
                  {feature.metric}
                </span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {feature.metricLabel}
                </span>
              </div>

              {/* Hover gradient */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.color}08, transparent 60%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
