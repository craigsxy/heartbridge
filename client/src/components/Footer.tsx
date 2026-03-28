import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubscribed(true);
      setEmail("");
      toast.success("Subscribed! You'll receive our latest updates.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribeMutation.mutate({ email });
  };

  const handlePlaceholderClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    toast.info(`${label} page coming soon!`);
  };

  return (
    <footer className="relative bg-[#0f1117] text-white pt-20 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5B7DB8]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Newsletter Section */}
        <div className="text-center mb-16 pb-16 border-b border-white/10">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Stay updated on autism care innovations
          </h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
            Get the latest research, tips, and HeartBridge updates delivered to your inbox. No spam, unsubscribe anytime.
          </p>
          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-300 font-medium text-sm">Subscribed successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5B7DB8]/50 focus:border-[#5B7DB8]/50 transition-all"
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="px-6 py-3 bg-[#5B7DB8] text-white text-sm font-semibold rounded-xl hover:bg-[#4A6FA5] transition-all duration-200 shadow-lg shadow-[#5B7DB8]/20 disabled:opacity-60 whitespace-nowrap"
              >
                {subscribeMutation.isPending ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B7DB8] to-[#4A6FA5] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight">HeartBridge</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Predictive support for everyday autism care. AI-powered insights for families.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              {["Predictive Analysis", "Therapist Matching", "Video Recording", "AI Chatbot", "Community"].map((item) => (
                <li key={item}>
                  <a href="#features" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Research", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => handlePlaceholderClick(e, item)}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Accessibility"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => handlePlaceholderClick(e, item)}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} HeartBridge. All rights reserved. Research backed by Penn Medicine, USC Medical & Wharton.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
              { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" },
              { label: "Instagram", path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                onClick={(e) => handlePlaceholderClick(e, social.label)}
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
