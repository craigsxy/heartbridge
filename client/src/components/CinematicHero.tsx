"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  onJoinWaitlist?: () => void;
}

export function CinematicHero({
  onJoinWaitlist,
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Mouse interaction for 3D card effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // GSAP scroll timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: "110vh" });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Intro animation
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll timeline — tight pacing, minimal blank gap between hero and CTA
      // Total timeline units: ~7.5, mapped to 2800px scroll distance
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2800",
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Phase 1 (0→1): Hero fades out + card rises simultaneously
        .to(".hero-text-wrapper", { scale: 1.06, filter: "blur(16px)", autoAlpha: 0, ease: "none", duration: 1 }, 0)
        .to(".bg-grid-theme", { opacity: 0.05, ease: "none", duration: 1 }, 0)
        .to(".main-card", { y: 0, ease: "none", duration: 1 }, 0)
        // Phase 2 (1→1.6): Card snaps to fullscreen
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "none", duration: 0.6 })
        // Phase 3 (1.6→2.6): Phone + badges + text all reveal together
        .fromTo(".mockup-scroll-wrapper",
          { y: 120, autoAlpha: 0, scale: 0.8 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "none", duration: 0.8 }, "-=0.1"
        )
        .fromTo(".phone-widget", { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.04, ease: "none", duration: 0.5 }, "-=0.6")
        .to(".progress-ring", { strokeDashoffset: 60, ease: "none", duration: 0.6 }, "-=0.6")
        .to(".counter-val", { innerHTML: 88, snap: { innerHTML: 1 }, ease: "none", duration: 0.6 }, "<")
        .fromTo(".floating-badge", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, ease: "none", duration: 0.5 }, "-=0.4")
        .fromTo(".card-left-text", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "none", duration: 0.5 }, "-=0.4")
        .fromTo(".card-right-text", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "none", duration: 0.5 }, "<")
        // Phase 4 (2.6→3.4): Phone exits + CTA fades in — NO hold pause
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          autoAlpha: 0, y: -20, ease: "none", duration: 0.5,
        })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .fromTo(".cta-wrapper",
          { autoAlpha: 0, scale: 0.97, filter: "blur(8px)" },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", ease: "none", duration: 0.6 }, "-=0.1"
        )
        // Phase 5 (3.4→4.4): Card shrinks back + exits
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "none",
          duration: 0.7
        }, "+=0.1")
        .to(".main-card", { y: -(window.innerHeight + 150), ease: "none", duration: 0.8 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* Hero Text */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight mb-2 leading-tight">
          Predict the moment,
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-4xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-tight">
          protect the child.
        </h1>
      </div>

      {/* CTA Wrapper */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-silver-matte">
          Join the waitlist.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
          Be among the first families to experience AI-powered autism care. Predictive insights, therapist matching, and 24/7 support.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <button
            onClick={onJoinWaitlist}
            className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-lg font-semibold">Get Early Access</span>
          </button>
          <a
            href="#features"
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="text-lg font-semibold">Learn More</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* The Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Brand Name */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-5xl md:text-[5rem] lg:text-[7rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                Heart<br />Bridge
              </h2>
            </div>

            {/* iPhone Mockup */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">
                {/* iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>

                    {/* HeartBridge App UI */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      {/* Header */}
                      <div className="phone-widget flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Today's Insights</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Predictive Care</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#5B7DB8]/20 text-blue-200 flex items-center justify-center font-bold text-sm border border-[#5B7DB8]/30 shadow-lg shadow-black/50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                      </div>

                      {/* Progress Ring */}
                      <div className="phone-widget relative w-40 h-40 mx-auto flex items-center justify-center mb-6 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full">
                          <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="80" cy="80" r="64" fill="none" stroke="#5B7DB8" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-blue-200/50 uppercase tracking-[0.1em] font-bold mt-0.5">Sleep Score</span>
                        </div>
                      </div>

                      {/* Metric Cards */}
                      <div className="space-y-2.5">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5B7DB8]/20 to-[#5B7DB8]/5 flex items-center justify-center mr-3 border border-[#5B7DB8]/20 shadow-inner">
                            <svg className="w-4 h-4 text-[#7B9DD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-[11px] text-white/80 font-medium mb-0.5">Meltdown Risk</div>
                            <div className="text-[10px] text-green-400/70 font-medium">Low - 12%</div>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mr-3 border border-emerald-400/20 shadow-inner">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-[11px] text-white/80 font-medium mb-0.5">Communication</div>
                            <div className="text-[10px] text-emerald-400/70 font-medium">Positive trend</div>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 flex items-center justify-center mr-3 border border-amber-400/20 shadow-inner">
                            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-[11px] text-white/80 font-medium mb-0.5">Daily Journal</div>
                            <div className="text-[10px] text-amber-400/70 font-medium">3 entries today</div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom bar */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-[#5B7DB8]/20 to-[#5B7DB8]/10 flex items-center justify-center border border-[#5B7DB8]/30 shadow-inner">
                    <svg className="w-4 h-4 text-[#7B9DD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">95% Match Rate</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">BCBA Therapists</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">AI Predictions</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">90% accuracy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Text */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                Care, redefined.
              </h3>
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                <span className="text-white font-semibold">HeartBridge</span> empowers parents of children with autism through predictive behavioral analysis, instant therapist connections, and personalized daily guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
