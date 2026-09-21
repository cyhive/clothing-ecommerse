import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Hammer, HeartHandshake, Eye, Award } from 'lucide-react';

export const ArtisanParallaxStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);
  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  const steps = [
    {
      step: '01',
      title: 'Sericulture & Mulberry Filament Reeling',
      subtitle: 'The Organic Foundation of Royal Silk',
      description: 'Only grade-A mulberry cocoons are harvested to spin triple-twist filaments. Unlike mass-manufactured synthetics, pure silk retains natural thermal regulation—keeping you cool during daytime festivities and warm during midnight receptions.',
      icon: Eye,
      hours: '18 Hours',
      stat: '700-Thread Count Density',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '02',
      title: 'The Pure Silver & 24K Gold Zari Drawing',
      subtitle: 'Flattening Metallic Precious Filaments (Tarkashi)',
      description: 'Solid silver ingots are drawn through progressive diamond dies into hair-thin wire (Baadla), then electroplated in pure 24-karat gold baths. The metallic thread is tightly wound around an ultra-fine core silk thread, ensuring heirloom lustre that never blackens with age.',
      icon: Award,
      hours: '24 Hours',
      stat: '98.5% Certified Silver Purity',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '03',
      title: 'Naqsha Architecture & Jacquard Graphing',
      subtitle: 'Transferring Royal Court Paintings into Loom Code',
      description: 'Generational Naqshaband (pattern masters) translate intricate mythological hunting scenes and Persian floral jaals onto perforated cards. Each punch corresponds to a single lift of warp thread on heavy rosewood pit looms.',
      icon: Hammer,
      hours: '32 Hours',
      stat: 'Up to 3,600 Hand-Punched Cards',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '04',
      title: 'The 108-Hour Handloom Rhythm',
      subtitle: 'Two Master Weavers in Meditative Harmony',
      description: 'Operating foot treadles and flying shuttles simultaneously, the master weaver and his apprentice interlock the Korvai borders millimeter by millimeter. A single complex 6-yard saree takes up to 3 weeks of tireless artistic devotion.',
      icon: HeartHandshake,
      hours: '108 - 160 Hours',
      stat: 'Zero Machine Interference',
      image: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section
      id="artisan-story"
      ref={containerRef}
      className="py-28 bg-[#0c0a09] relative overflow-hidden border-b border-[#241f1a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading with Parallax Float */}
        <motion.div style={{ y: headingY }} className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#3d332a] bg-[#16120f] text-[#d4af37] text-xs uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Living Heritage Documentary</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display-regal font-normal text-[#fbf8f2] tracking-tight mb-4">
            From Loom to Heirloom: <br />
            <span className="font-serif-luxury italic text-[#d4af37]">The 108 Hours of Craftsmanship</span>
          </h2>
          <p className="text-[#a8a29e] text-sm sm:text-base font-light leading-relaxed">
            In an era of disposable fashion, we celebrate slow couture. Every fold of an Aura Vastra saree carries the pulse of master weaver families whose bloodlines have guarded India’s textile supremacy for centuries.
          </p>
        </motion.div>

        {/* Vertical Timeline with Connecting Parallax Bar */}
        <div className="relative">
          {/* Central Line on desktop */}
          <div className="hidden lg:block absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[2px] bg-[#26201b]">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-gradient-to-b from-[#d4af37] via-[#e5c158] to-[#b38827] rounded-full"
            />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = item.icon;

              return (
                <div
                  key={item.step}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Text Details Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="w-full lg:w-1/2 p-6 sm:p-8 rounded-3xl bg-[#14110f] border border-[#2b241d] shadow-2xl relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-display-regal font-bold text-[#d4af37]/40">
                        {item.step}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1914] border border-[#382e24] text-[11px] font-mono text-[#d4af37]">
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{item.hours}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#fbf8f2] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#a8a29e] font-light leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="p-3 rounded-xl bg-[#1a1613] border border-[#26201b] flex items-center justify-between text-xs">
                      <span className="text-[#78716c] uppercase tracking-wider text-[10px]">Benchmark</span>
                      <span className="text-[#f5f2eb] font-semibold">{item.stat}</span>
                    </div>
                  </motion.div>

                  {/* Imagery Box */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full lg:w-1/2 aspect-[16/10] rounded-3xl overflow-hidden border border-[#332a24] shadow-2xl relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-black/20" />
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0c0a09]/80 backdrop-blur-md border border-[#2b241d] flex items-center justify-between">
                      <span className="text-[11px] text-[#d6d3d1] font-mono">Master Loom Guild, India</span>
                      <span className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold">100% Handcrafted</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
