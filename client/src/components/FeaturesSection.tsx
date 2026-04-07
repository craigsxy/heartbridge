import { useState } from "react";

const features = [
  {
    id: "predictive",
    label: "Predictive Analysis",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Predictive Behavioral Analysis",
    tagline: "Know what's coming before it arrives.",
    description: "Our AI analyzes daily patterns — sleep quality, sensory triggers, routine changes — to predict behavioral events with 90% accuracy. Parents get a morning briefing each day so they can prepare, not react.",
    metric: { value: "90%", label: "Prediction Accuracy" },
    color: "#0068FF",
    visual: (
      <div className="w-full h-full flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#8695A3] uppercase tracking-widest">Today's Forecast</span>
          <span className="text-xs text-[#0068FF] font-semibold">Live</span>
        </div>
        {[
          { label: "Meltdown Risk", value: "Low – 12%", bar: 12, color: "#0068FF" },
          { label: "Sleep Quality", value: "Good – 84%", bar: 84, color: "#2273FD" },
          { label: "Communication", value: "Positive trend", bar: 72, color: "#70B8FF" },
          { label: "Sensory Load", value: "Moderate – 45%", bar: 45, color: "#FFA30E" },
        ].map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-[#4E6479] font-medium">{item.label}</span>
              <span className="text-[#2C3D4B] font-semibold text-xs">{item.value}</span>
            </div>
            <div className="h-2 bg-[#F0F2F7] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${item.bar}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
        <div className="mt-2 p-3 rounded-xl bg-[#F3F8FF] border border-[#D4E8FF]">
          <p className="text-xs text-[#0068FF] font-semibold mb-0.5">AI Insight</p>
          <p className="text-xs text-[#4E6479]">Liam slept well last night. Low-stimulation morning recommended before school transition.</p>
        </div>
      </div>
    ),
  },
  {
    id: "recording",
    label: "Real-time Recording",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Real-time Video Recording",
    tagline: "Show your therapist exactly what you see.",
    description: "Record and upload short clips of your child's behavior directly in the app. Our AI instantly tags behavioral patterns — transitions, sensory responses, communication moments — so your therapist has full context before every session.",
    metric: { value: "Real-time", label: "AI Video Analysis" },
    color: "#2273FD",
    visual: (
      <div className="w-full h-full flex flex-col gap-4 p-6">
        <div className="relative rounded-2xl overflow-hidden bg-[#0A0F1E] aspect-video flex items-center justify-center">
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F24A33] animate-pulse" />
            <span className="text-white text-[10px] font-bold tracking-wider">REC</span>
          </div>
          <div className="text-center">
            <svg className="w-10 h-10 text-white/20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-white/30 text-xs">Video clip preview</p>
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 rounded text-white text-[10px] font-mono">0:32</div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#8695A3] uppercase tracking-widest">AI Tags Detected</p>
          <div className="flex flex-wrap gap-2">
            {["Transition resistance", "Vocal stimming", "Eye contact – brief"].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-[#2273FD]/10 text-[#2273FD] text-xs font-semibold border border-[#2273FD]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "therapist",
    label: "Therapist Matching",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Instant Therapist Matching",
    tagline: "The right BCBA, matched to your child.",
    description: "Search and filter 200+ certified BCBA therapists by specialty, availability, and your child's specific behavioral profile. Our matching algorithm surfaces the best fit — and you can book a session in under 24 hours.",
    metric: { value: "95%", label: "Match Satisfaction" },
    color: "#70B8FF",
    visual: (
      <div className="w-full h-full flex flex-col gap-3 p-6">
        <p className="text-xs font-bold text-[#8695A3] uppercase tracking-widest mb-1">Top Matches</p>
        {[
          { name: "Dr. Sarah Johnson", specialty: "Communication & Social Skills", rating: 4.9, reviews: 127, available: true },
          { name: "Dr. Michael Chen", specialty: "Meltdown Prevention & ABA", rating: 4.8, reviews: 98, available: true },
          { name: "Coach Maya Rivera", specialty: "Sensory Processing & Behavior", rating: 4.9, reviews: 156, available: false },
        ].map((t) => (
          <div key={t.name} className="bg-white rounded-xl p-4 border border-[#F0F2F7] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0068FF] to-[#0051E8] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {t.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#2C3D4B] truncate">{t.name}</p>
                {t.available && (
                  <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold text-emerald-600 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#8695A3] mt-0.5">{t.specialty}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3 text-[#FFA30E]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[10px] font-semibold text-[#4E6479]">{t.rating}</span>
                <span className="text-[10px] text-[#ACBBC3]">({t.reviews})</span>
              </div>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-1">
          {[{ value: "200+", label: "Therapists" }, { value: "95%", label: "Match Rate" }, { value: "<24h", label: "First Session" }].map(s => (
            <div key={s.label} className="text-center p-2 bg-[#F3F8FF] rounded-xl border border-[#D4E8FF]">
              <p className="text-sm font-extrabold text-[#0068FF]">{s.value}</p>
              <p className="text-[9px] text-[#8695A3] uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "ai",
    label: "AI Chatbot",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "AI Chatbot & Resource Hub",
    tagline: "Expert guidance, available 24/7.",
    description: "Get instant answers from an AI trained on autism care best practices, clinical guidelines, and caregiver resources. Whether it's a meltdown at 2am or questions about IEPs, HeartBridge is always there.",
    metric: { value: "24/7", label: "Always Available" },
    color: "#FFA30E",
    visual: (
      <div className="w-full h-full flex flex-col gap-3 p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0068FF] to-[#0051E8] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span className="text-xs font-bold text-[#2C3D4B]">HeartBridge AI</span>
          <span className="ml-auto text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
          </span>
        </div>
        <div className="space-y-2.5 flex-1">
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-[#0068FF] text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2">
              My son had a meltdown this morning. What should I do?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-[#F3F8FF] text-[#2C3D4B] text-xs rounded-2xl rounded-tl-sm px-3 py-2 border border-[#D4E8FF]">
              I'm sorry to hear that. Based on today's sensory load forecast, here are 3 calming strategies tailored for him...
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-[#0068FF] text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2">
              Can you help me prepare for his IEP meeting?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-[#F3F8FF] text-[#2C3D4B] text-xs rounded-2xl rounded-tl-sm px-3 py-2 border border-[#D4E8FF]">
              Absolutely. I've drafted a summary of his recent behavioral trends to bring to the meeting.
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function FeaturesSection() {
  const [activeId, setActiveId] = useState("predictive");
  const active = features.find(f => f.id === activeId)!;

  return (
    <section id="features" className="relative py-24 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0068FF]/10 border border-[#0068FF]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0068FF] animate-pulse" />
            <span className="text-sm font-semibold text-[#0068FF] tracking-wide">Core Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#2C3D4B] mb-4">
            Everything your family needs,
            <br />
            <span className="text-[#0068FF]">in one place.</span>
          </h2>
          <p className="text-[#6A7780] text-lg max-w-2xl mx-auto leading-relaxed">
            AI-powered predictions, real-time video analysis, expert therapist matching, and 24/7 support — all built for autism families.
          </p>
        </div>

        {/* Desktop: Left tabs + Right panel */}
        <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-6 items-start">

          {/* Left: Feature Tab List */}
          <div className="flex flex-col gap-2 sticky top-28">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`group flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-200 ${
                  activeId === f.id
                    ? "bg-white border border-[#D4E8FF] shadow-md shadow-[#0068FF]/8"
                    : "hover:bg-white hover:border hover:border-[#F0F2F7] border border-transparent"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    activeId === f.id ? "text-white" : "text-[#8695A3] group-hover:text-[#4E6479]"
                  }`}
                  style={{ backgroundColor: activeId === f.id ? f.color : "transparent",
                           ...(activeId !== f.id ? { backgroundColor: `${f.color}15` } : {}) }}
                >
                  {f.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate transition-colors duration-200 ${
                    activeId === f.id ? "text-[#2C3D4B]" : "text-[#6A7780] group-hover:text-[#2C3D4B]"
                  }`}>
                    {f.label}
                  </p>
                  {activeId === f.id && (
                    <p className="text-xs text-[#8695A3] mt-0.5 font-medium">{f.metric.value} {f.metric.label}</p>
                  )}
                </div>
                {activeId === f.id && (
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: f.color }} />
                )}
              </button>
            ))}
          </div>

          {/* Right: Detail Panel */}
          <div className="bg-white rounded-3xl border border-[#F0F2F7] shadow-sm overflow-hidden min-h-[520px] flex flex-col">
            {/* Top: Text content */}
            <div className="p-8 pb-6 border-b border-[#F0F2F7]">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: `${active.color}15`, color: active.color }}
              >
                {active.icon}
                {active.label}
              </div>
              <h3 className="text-2xl font-bold text-[#2C3D4B] mb-2 tracking-tight">{active.title}</h3>
              <p className="text-[#0068FF] font-semibold text-sm mb-3">{active.tagline}</p>
              <p className="text-[#6A7780] text-sm leading-relaxed">{active.description}</p>
            </div>
            {/* Bottom: Visual */}
            <div className="flex-1 bg-[#FAFAFA]">
              {active.visual}
            </div>
          </div>
        </div>

        {/* Mobile: Top tabs + Content below */}
        <div className="md:hidden flex flex-col gap-4">

          {/* Tab grid 2×2 */}
          <div className="grid grid-cols-2 gap-2">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  activeId === f.id
                    ? "bg-white border-[#D4E8FF] text-[#2C3D4B] shadow-sm"
                    : "bg-white/50 border-transparent text-[#8695A3]"
                }`}
              >
                <span style={{ color: activeId === f.id ? f.color : "#8695A3" }}>{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div className="bg-white rounded-3xl border border-[#F0F2F7] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F0F2F7]">
              <h3 className="text-xl font-bold text-[#2C3D4B] mb-1 tracking-tight">{active.title}</h3>
              <p className="text-[#0068FF] font-semibold text-sm mb-3">{active.tagline}</p>
              <p className="text-[#6A7780] text-sm leading-relaxed">{active.description}</p>
            </div>
            <div className="bg-[#FAFAFA]">
              {active.visual}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
