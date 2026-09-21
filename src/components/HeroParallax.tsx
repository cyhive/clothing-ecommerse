import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, Compass, Award, ShieldCheck, Feather } from 'lucide-react';

interface HeroParallaxProps {
  onExploreVault: () => void;
  onOpenDrapeStudio: () => void;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ onExploreVault, onOpenDrapeStudio }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transform values
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const floatingCardsY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const fabricScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[105vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#0c0a09]"
    >
      {/* Deep Background Parallax Layer with Silk Imagery & Lighting */}
      <motion.div
        style={{ y: bgY, scale: fabricScale }}
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/65 to-[#0c0a09]/85 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] z-10" />
        
        {/* Background Silk Texture Image */}
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
          alt="Royal Silk Backdrop"
          className="w-full h-full object-cover object-center filter brightness-45 contrast-125 saturate-110"
        />
      </motion.div>

      {/* Ambient floating golden specks / particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#b91c1c]/10 blur-[130px]" />
      </div>

      {/* Main Content Parallax Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Typography & Actions */}
          <motion.div
            style={{ y: textY, opacity: opacityText }}
            className="lg:col-span-7 text-center lg:text-left pt-6"
          >
            {/* Royal Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#1c1815]/80 backdrop-blur-sm text-[#d4af37] text-xs uppercase tracking-[0.2em] mb-6 shadow-lg shadow-black/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span>Couture Handlooms & Heirloom Weaves</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-display-regal font-medium tracking-tight text-[#fbf8f2] leading-[1.08] mb-6"
            >
              The Poetry of <br />
              <span className="italic font-serif-luxury font-normal text-[#d4af37] bg-gradient-to-r from-[#edd899] via-[#d4af37] to-[#b38827] bg-clip-text text-transparent">
                Six Imperial Yards
              </span>
            </motion.h1>

            {/* Editorial Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-[#d6d3d1] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 font-sans"
            >
              Immerse yourself in authentic Banarasi Jangla, Kanchipuram Korvai, and gossamer Chanderi silks. Each drape is hand-woven across 100+ hours by master artisan families preserving sacred centuries-old loom heritage.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5"
            >
              <button
                id="hero-explore-vault-btn"
                onClick={onExploreVault}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c29b2b] text-[#0c0a09] font-semibold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore The Vault</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-drape-studio-btn"
                onClick={onOpenDrapeStudio}
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#d4af37]/40 bg-[#1a1613]/80 hover:bg-[#26201a] text-[#f5f2eb] hover:text-[#d4af37] text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 group cursor-pointer backdrop-blur-sm"
              >
                <Compass className="w-4 h-4 text-[#d4af37] group-hover:rotate-45 transition-transform" />
                <span>Virtual Drape Studio</span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-[#292524] grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-medium text-[#f5f2eb]">Silk Mark</h4>
                  <p className="text-[11px] text-[#a8a29e]">100% Pure Silk</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-medium text-[#f5f2eb]">Pure Zari</h4>
                  <p className="text-[11px] text-[#a8a29e]">Tested Silver-Gilt</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Feather className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-medium text-[#f5f2eb]">Direct Looms</h4>
                  <p className="text-[11px] text-[#a8a29e]">Fair Artisan Trade</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Parallax Hero Visual Showcase */}
          <motion.div
            style={{ y: floatingCardsY }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Grand Layered Frame */}
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-2xl p-2.5 bg-gradient-to-b from-[#d4af37]/40 via-[#332a24] to-[#1a1613] shadow-2xl shadow-black/80">
              <div className="w-full h-full rounded-xl overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90"
                  alt="Bridal Varanasi Katan Saree"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-black/20" />

                {/* Floating Bottom Card Over Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#14110f]/90 backdrop-blur-md border border-[#3d332a] shadow-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                      Signature Masterpiece
                    </span>
                    <span className="text-[11px] font-mono text-[#a8a29e]">144 Loom-Hours</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif-luxury text-[#fbf8f2] font-medium leading-snug">
                    Varanasi Rangkat Kadwa Brocade
                  </h3>
                  <p className="text-[11px] text-[#a8a29e] mt-0.5 line-clamp-1">
                    Pure Tested Silver Zari with Imperial Floral Jaal
                  </p>
                </div>
              </div>

              {/* Floating Side Accent Pill */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-[#1e1915] border border-[#d4af37]/40 py-2 px-3.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                <span className="text-[11px] text-[#f5f2eb] tracking-wide font-medium">New Festive Drop</span>
              </motion.div>

              {/* Floating Bottom Left Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-[#1e1915] border border-[#332a24] py-2 px-3 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-2.5"
              >
                <span className="text-xl font-display-regal text-[#d4af37]">4.98★</span>
                <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider leading-tight">
                  Over 1,200+ <br />Royal Brides
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[#a8a29e] pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716c]">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-7 rounded-full border border-[#78716c]/60 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#d4af37]" />
        </motion.div>
      </div>
    </div>
  );
};
