import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WEAVE_SPOTLIGHTS } from '../data/sarees';
import { ArrowRight, Sparkles, MapPin, Landmark } from 'lucide-react';

interface ParallaxShowcaseProps {
  onSelectWeaveFilter: (weaveType: string) => void;
}

export const ParallaxShowcase: React.FC<ParallaxShowcaseProps> = ({ onSelectWeaveFilter }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-28 bg-[#0e0c0a] border-t border-b border-[#241f1a] overflow-hidden"
    >
      {/* Subtle textured parallax background */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div style={{ y: headingY }} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#3d332a] bg-[#171310] text-[#d4af37] text-xs uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Sacred Geography of Silk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display-regal font-normal text-[#fbf8f2] tracking-tight mb-5">
            The Four Imperial <span className="font-serif-luxury italic text-[#d4af37]">Silk Dynasties</span>
          </h2>
          <p className="text-[#a8a29e] text-sm sm:text-base font-light leading-relaxed">
            Across millennia, regional artisan guilds perfected distinct weaving secrets. Explore the signature silhouettes that defined royal Indian courts and continue to define global couture.
          </p>
        </motion.div>

        {/* 4 Weaves Grid with Parallax Hover Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEAVE_SPOTLIGHTS.map((spotlight, idx) => (
            <motion.div
              key={spotlight.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group relative rounded-2xl overflow-hidden bg-[#16120f] border border-[#2b241d] hover:border-[#d4af37]/60 transition-all duration-500 shadow-xl flex flex-col h-full"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={spotlight.bgImage}
                  alt={spotlight.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16120f] via-[#16120f]/40 to-transparent" />

                {/* Region Tag */}
                <div className="absolute top-3 left-3 bg-[#0c0a09]/80 backdrop-blur-md border border-[#3d332a] py-1 px-2.5 rounded-full flex items-center gap-1.5 text-[11px] text-[#f5f2eb]">
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  <span>{spotlight.origin}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#a8a29e] uppercase tracking-wider mb-1.5">
                    <Landmark className="w-3 h-3 text-[#d4af37]" />
                    <span>{spotlight.century}</span>
                  </div>

                  <h3 className="text-xl font-serif-luxury font-semibold text-[#fbf8f2] group-hover:text-[#d4af37] transition-colors mb-2.5">
                    {spotlight.title}
                  </h3>

                  <p className="text-xs text-[#a8a29e] font-light leading-relaxed mb-4">
                    {spotlight.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {spotlight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] py-0.5 px-2 rounded bg-[#201a15] text-[#d6d3d1] border border-[#332a24]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const filterName = spotlight.id === 'banarasi' ? 'Banarasi'
                      : spotlight.id === 'kanjeevaram' ? 'Kanjeevaram'
                      : spotlight.id === 'chanderi' ? 'Chanderi'
                      : 'Paithani';
                    onSelectWeaveFilter(filterName);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#3d332a] bg-[#1a1511] group-hover:bg-[#d4af37] text-xs uppercase tracking-wider text-[#d6d3d1] group-hover:text-[#0c0a09] font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>View Curated Drapes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
