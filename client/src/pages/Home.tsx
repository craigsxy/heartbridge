import { useRef } from "react";
import { Header } from "@/components/Header";
import { CinematicHero } from "@/components/CinematicHero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TherapistSection } from "@/components/TherapistSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WaitlistForm, WaitlistFormHandle } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const waitlistRef = useRef<WaitlistFormHandle>(null);

  const handleJoinWaitlist = () => {
    waitlistRef.current?.scrollToForm();
  };

  return (
    <div className="overflow-x-hidden w-full min-h-screen">
      <Header onJoinWaitlist={handleJoinWaitlist} />
      <CinematicHero onJoinWaitlist={handleJoinWaitlist} />
      <FeaturesSection />
      <TherapistSection />
      <TestimonialsSection />
      <WaitlistForm ref={waitlistRef} />
      <Footer />
    </div>
  );
}
