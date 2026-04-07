import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Same cinematic blur-reveal as Hero text
      gsap.set(".demo-headline", {
        autoAlpha: 0,
        y: 60,
        scale: 0.88,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".demo-subtitle", {
        autoAlpha: 0,
        y: 40,
        scale: 0.92,
        filter: "blur(14px)",
      });
      gsap.set(".demo-badge", {
        autoAlpha: 0,
        y: 20,
        filter: "blur(8px)",
      });
      gsap.set([".demo-video", ".demo-logos"], {
        autoAlpha: 0,
        y: 50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      });

      tl.to(".demo-badge", {
        autoAlpha: 1, y: 0, filter: "blur(0px)",
        duration: 0.7, ease: "expo.out",
      })
        .to(".demo-headline", {
          autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0,
          duration: 1.4, ease: "expo.out",
        }, "-=0.3")
        .to(".demo-subtitle", {
          autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)",
          duration: 1.1, ease: "expo.out",
        }, "-=0.9")
        .to(".demo-video", {
          autoAlpha: 1, y: 0,
          duration: 1.0, ease: "power3.out",
        }, "-=0.6")
        .to(".demo-logos", {
          autoAlpha: 1, y: 0,
          duration: 0.8, ease: "power3.out",
        }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="credibility" ref={sectionRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="demo-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0068FF]/10 border border-[#0068FF]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0068FF] animate-pulse" />
            <span className="text-sm font-semibold text-[#0068FF] tracking-wide">Product Demo</span>
          </div>
          <h2 className="demo-headline text-3xl md:text-5xl font-bold tracking-tight text-[#2C3D4B] mb-4 will-change-transform">
            See HeartBridge in action
          </h2>
          <p className="demo-subtitle text-[#6A7780] text-lg max-w-2xl mx-auto leading-relaxed will-change-transform">
            Watch how HeartBridge helps families predict behavioral patterns and connect with the right therapist — all in one place.
          </p>
        </div>

        {/* Video */}
        <div className="demo-video w-full mb-16 will-change-transform">
          <video
            src="/demo.mp4"
            controls
            playsInline
            className="w-full rounded-2xl shadow-2xl shadow-[#0068FF]/15"
          />
        </div>

        {/* Credibility / Institution Logos */}
        {/* ─────────────────────────────────────────────────────────────────
            LOGO ASSETS: place institution logo files at
              client/public/logos/upenn.png
              client/public/logos/wharton.png
              client/public/logos/penn-medicine.png
              client/public/logos/usc.png
            Then replace the text placeholders below with <img> tags:
              <img src="/logos/upenn.png" alt="UPenn"
                   className="h-8 w-auto object-contain" />
            ───────────────────────────────────────────────────────────────── */}
        <div className="demo-logos flex flex-col items-center gap-8 will-change-transform">
          <p className="text-[#ACBBC3] text-xs font-semibold uppercase tracking-widest">
            Research &amp; academic affiliations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {[
              { name: "University of Pennsylvania", file: "upenn.png" },
              { name: "Wharton VentureLab", file: "wharton.png" },
              { name: "Penn Medicine", file: "penn-medicine.png" },
              { name: "USC Medical", file: "usc.png" },
            ].map((org) => (
              <div
                key={org.name}
                className="flex items-center justify-center h-10 px-2 opacity-60 hover:opacity-90 transition-opacity duration-200"
                title={org.name}
              >
                <img
                  src={`/logos/${org.file}`}
                  alt={org.name}
                  className="h-26 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#CDD4DC] to-transparent" />
        </div>

      </div>
    </section>
  );
}
