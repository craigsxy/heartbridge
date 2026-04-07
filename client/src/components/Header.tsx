import { useState, useEffect } from "react";

interface HeaderProps {
  onJoinWaitlist?: () => void;
}

export function Header({ onJoinWaitlist }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
        scrolled
          ? "w-[95%] max-w-5xl bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 rounded-2xl border border-[#CDD4DC]/50"
          : "w-[95%] max-w-5xl bg-white/70 backdrop-blur-md rounded-2xl border border-[#CDD4DC]/30"
      }`}
    >
      <div className="flex items-center justify-between pl-0 pr-5 h-14 overflow-visible">
        {/* Logo */}
        <a href="#" className="flex items-center group overflow-visible">
          <img
            src="/favicon.png"
            alt="HeartBridge"
            className="h-48 w-auto object-contain group-hover:opacity-90 transition-opacity"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Credibility", href: "#credibility" },
            { label: "Features", href: "#features" },
            { label: "Parents", href: "#parents" },
          ].map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="px-4 py-2 text-sm font-medium text-[#6A7780] hover:text-[#2C3D4B] rounded-lg hover:bg-[#F3F8FF] transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onJoinWaitlist}
            className="px-5 py-2.5 bg-[#0068FF] text-white text-sm font-semibold rounded-xl hover:bg-[#0051E8] transition-all duration-200 shadow-md shadow-[#0068FF]/30 hover:shadow-lg hover:shadow-[#0068FF]/40 hover:-translate-y-0.5"
          >
            Join Waitlist
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#F3F8FF] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-5 h-5 text-[#4E6479]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F0F2F7] px-5 py-4 space-y-2">
          {[
            { label: "Credibility", href: "#credibility" },
            { label: "Features", href: "#features" },
            { label: "Parents", href: "#parents" },
          ].map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#6A7780] hover:text-[#2C3D4B] rounded-lg hover:bg-[#F3F8FF] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { onJoinWaitlist?.(); setMobileMenuOpen(false); }}
            className="w-full mt-2 px-5 py-2.5 bg-[#0068FF] text-white text-sm font-semibold rounded-xl hover:bg-[#0051E8]"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </header>
  );
}
