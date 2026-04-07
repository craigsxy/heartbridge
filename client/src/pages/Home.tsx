import { useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { CinematicHero } from "@/components/CinematicHero";
import { DemoSection } from "@/components/DemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ParentSection, ParentSectionHandle } from "@/components/ParentSection";
import { Footer } from "@/components/Footer";

const SNAP_SECTIONS = ["#credibility", "#features", "#parents"];

// ─── Snap tuning parameters ──────────────────────────────────────────────────
// SNAP_DELAY_MS   : how long (ms) after scroll stops before snap fires
//                   lower = snappier, higher = less aggressive
const SNAP_DELAY_MS = 80;

// SNAP_ZONE_TOP   : how far ABOVE viewport top (as fraction of vh) a section
//                   can be and still snap back up to it  (e.g. 0.35 = 35% vh)
const SNAP_ZONE_TOP = 0.35;

// SNAP_ZONE_BOTTOM: how far BELOW viewport top (as fraction of vh) a section
//                   can be and still snap down to it  (e.g. 0.65 = 65% vh)
const SNAP_ZONE_BOTTOM = 0.65;
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const parentRef = useRef<ParentSectionHandle>(null);

  const handleJoinWaitlist = () => {
    parentRef.current?.scrollToForm();
  };

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    let isSnapping = false;

    const onScroll = () => {
      if (isSnapping) return;

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        // Skip snap while inside the hero pin zone
        if (window.scrollY < window.innerHeight + 800 * 0.9) return;

        for (const sel of SNAP_SECTIONS) {
          const el = document.querySelector(sel);
          if (!el) continue;
          const rect = el.getBoundingClientRect();

          // Snap zone: section top is between -SNAP_ZONE_TOP*vh and +SNAP_ZONE_BOTTOM*vh
          const zoneTop    = -window.innerHeight * SNAP_ZONE_TOP;
          const zoneBottom =  window.innerHeight * SNAP_ZONE_BOTTOM;

          if (rect.top >= zoneTop && rect.top <= zoneBottom) {
            isSnapping = true;
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => { isSnapping = false; }, 900);
            break;
          }
        }
      }, SNAP_DELAY_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <div className="overflow-x-hidden w-full min-h-screen">
      <Header onJoinWaitlist={handleJoinWaitlist} />
      <CinematicHero onJoinWaitlist={handleJoinWaitlist} />
      <DemoSection />
      <FeaturesSection />
      <ParentSection ref={parentRef} />
      <Footer />
    </div>
  );
}
