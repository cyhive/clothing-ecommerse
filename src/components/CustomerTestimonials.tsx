import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/sarees';
import { Star, Quote, Sparkles, MapPin } from 'lucide-react';

export const CustomerTestimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#0d0b09] border-t border-b border-[#241f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#3d332a] bg-[#16120f] text-[#d4af37] text-xs uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Patron Chronicles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display-regal font-normal text-[#fbf8f2] tracking-tight mb-4">
            Voices of Our <span className="font-serif-luxury italic text-[#d4af37]">Royal Brides & Patrons</span>
          </h2>
          <p className="text-[#a8a29e] text-sm sm:text-base font-light leading-relaxed">
            From imperial destination weddings in Udaipur and Lake Como to diplomatic galas in London and New York—read stories from women who treasure authentic Indian weavecraft.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-7 rounded-3xl bg-[#14110f] border border-[#2b241d] hover:border-[#d4af37]/40 transition-all duration-300 shadow-xl flex flex-col justify-between relative group"
            >
              <div className="absolute top-6 right-6 text-[#29221b] group-hover:text-[#d4af37]/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#d6d3d1] font-light leading-relaxed mb-6 italic font-serif-luxury">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-5 border-t border-[#26201a] flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/50"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f2eb]">{t.author}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#a8a29e]">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span>{t.location}</span>
                  </div>
                  <p className="text-[10px] text-[#d4af37] mt-0.5 font-mono">{t.occasion}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
