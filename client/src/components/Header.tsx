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

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
        scrolled
          ? "w-[95%] max-w-5xl bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 rounded-2xl border border-gray-200/50"
          : "w-[95%] max-w-5xl bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/30"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5B7DB8] to-[#4A6FA5] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">HeartBridge</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Features", href: "#features" },
            { label: "Therapists", href: "#therapists" },
            { label: "Testimonials", href: "#testimonials" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100/80 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onJoinWaitlist}
            className="px-5 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-xl hover:bg-[#2a2a3e] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Join Waitlist
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden border-t border-gray-100 px-5 py-4 space-y-2">
          {[
            { label: "Features", href: "#features" },
            { label: "Therapists", href: "#therapists" },
            { label: "Testimonials", href: "#testimonials" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { onJoinWaitlist?.(); setMobileMenuOpen(false); }}
            className="w-full mt-2 px-5 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-xl"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </header>
  );
}
