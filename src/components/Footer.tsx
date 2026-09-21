import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Mail, ArrowRight, Check, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#090706] border-t border-[#241f1a] text-[#a8a29e] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Atelier Circle */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#16120f] to-[#100d0b] border border-[#2e261f] shadow-2xl mb-16 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#3d332a] bg-[#1a1511] text-[#d4af37] text-xs uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Aura Vastra Guild</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-display-regal font-normal text-[#fbf8f2] mb-3">
              Enter The Silk Circle
            </h3>
            <p className="text-xs sm:text-sm text-[#a8a29e] font-light leading-relaxed mb-6">
              Receive private previews of limited loom drops, invitation to annual trunk shows, and a complimentary 15% privilege code on your first heirloom saree.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#78716c] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Your aristocratic email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0c0a09] border border-[#332a24] rounded-full py-3.5 pl-11 pr-4 text-xs text-[#f5f2eb] placeholder-[#78716c] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <button
                type="submit"
                className="py-3.5 px-7 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-[#0c0a09] font-bold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Request Invite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-[#22c55e] mt-3 flex items-center justify-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>You are cordially registered. Code ROYAL15 has been credited to your patronage.</span>
              </p>
            )}
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#241f1a] text-xs">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-display-regal tracking-[0.2em] text-[#fbf8f2] uppercase font-semibold">
              Aura Vastra
            </h2>
            <p className="text-[#8c857e] leading-relaxed max-w-sm font-light">
              Purveyors of India’s most revered handwoven silk heirlooms. Dedicated to fair artisan patronage, pure tested silver-gilt zari, and the preservation of slow handloom mastery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] text-[#d4af37] border border-[#332a24] py-1.5 px-3 rounded-full bg-[#14110f]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Silk Mark Certified Institution</span>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f2eb]">
              Imperial Collections
            </h4>
            <ul className="space-y-2 text-[#8c857e]">
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Varanasi Kadwa Katan</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Kanchipuram Korvai Gold</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Chanderi Mukaish Gossamer</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Yeola Paithani Tapestry</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Patan Double Ikat Patola</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f2eb]">
              Atelier Services
            </h4>
            <ul className="space-y-2 text-[#8c857e]">
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Bespoke Bridal Trousseau</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Custom Master Blouse Stitching</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Heirloom Zari Restoration</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Virtual Video Drape Consultation</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Silk Preservation & Storage Kits</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f2eb]">
              Patron Care
            </h4>
            <ul className="space-y-2 text-[#8c857e]">
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Insured Global Air Dispatch</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Certificate of Authenticity</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">White-Glove Courier Inspection</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Returns & Exchanges Charter</li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">concierge@auravastra.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#78716c] gap-4">
          <p>© {new Date().getFullYear()} Aura Vastra Haute Saree Atelier. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Woven with timeless reverence for India’s generational weavers</span>
            <Heart className="w-3 h-3 text-[#b91c1c] fill-[#b91c1c] inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
