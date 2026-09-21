import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAREE_CATALOG } from '../data/sarees';
import { SareeProduct, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { Compass, Sparkles, Check, ArrowRight, Eye, Layers, Palette } from 'lucide-react';

interface VirtualDrapeVisualizerProps {
  currency: Currency;
  onSelectProduct: (product: SareeProduct) => void;
}

interface DrapeStyle {
  id: string;
  name: string;
  region: string;
  century: string;
  description: string;
  palluPlacement: string;
  pleatCount: string;
  bestFor: string;
  illustrationImage: string;
}

const DRAPE_STYLES: DrapeStyle[] = [
  {
    id: 'nivi',
    name: 'Classic Nivi Drape',
    region: 'Deccan & Pan-India',
    century: 'Late 19th Century Renaissance',
    description: 'The iconic regal silhouette with 7 to 9 hand-folded pleats tucked neatly into the waist and the pallu gracefully tossed over the left shoulder.',
    palluPlacement: 'Flowing behind left arm to mid-calf',
    pleatCount: '7 to 8 Crisp Pleats (approx 5 inches)',
    bestFor: 'Formal Banquets, Royal Receptions & Cocktail Evenings',
    illustrationImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'bengali',
    name: 'Bengali Atpoure Drape',
    region: 'Bengal Presidency',
    century: 'Aristocratic Zamindari Era',
    description: 'Box-pleated front drape wrapping both shoulders, secured with a traditional silver bunch of heirloom keys (Chabir Guchha) at the pallu corner.',
    palluPlacement: 'Both shoulders with right pallu brought to front',
    pleatCount: 'Single Wide Accordion Pleat',
    bestFor: 'Durga Puja Celebrations, Weddings & Heritage Gatherings',
    illustrationImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'gujarati',
    name: 'Gujarati Seedha Pallu',
    region: 'Gujarat & Rajasthan',
    century: 'Solanki Royal Courts',
    description: 'Brings the intricate heavy pallu and zari embroidery forward across the chest, spreading the artisan motif in full glory.',
    palluPlacement: 'Draped forward over right shoulder and tucked at waist',
    pleatCount: '6 to 7 Deep Pleats facing right',
    bestFor: 'Bridal Ceremonies with heavy zari borders & heirloom Patolas',
    illustrationImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'maharashtrian',
    name: 'Nauvari Kashta Drape',
    region: 'Maharashtra',
    century: 'Maratha Peshwa Empire',
    description: 'Warrior-queen trouser drape tucked between legs into the spine, offering unrivaled mobility, majestic poise, and timeless power.',
    palluPlacement: 'Wrapped firmly around bodice and left shoulder',
    pleatCount: 'Double fold with central back tuck (Kashta)',
    bestFor: 'Grand Festive Entrances & Traditional Maharashtrian Nuptials',
    illustrationImage: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=85',
  },
];

export const VirtualDrapeVisualizer: React.FC<VirtualDrapeVisualizerProps> = ({
  currency,
  onSelectProduct,
}) => {
  const [selectedSareeIndex, setSelectedSareeIndex] = useState(0);
  const [selectedDrapeId, setSelectedDrapeId] = useState('nivi');
  const [activeTab, setActiveTab] = useState<'preview' | 'guide'>('preview');

  const currentSaree = SAREE_CATALOG[selectedSareeIndex];
  const currentDrape = DRAPE_STYLES.find((d) => d.id === selectedDrapeId) || DRAPE_STYLES[0];

  return (
    <section id="drape-studio" className="py-24 bg-[#0a0807] border-t border-b border-[#241f1a] relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#991b1b]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#3d332a] bg-[#16120f] text-[#d4af37] text-xs uppercase tracking-[0.25em] mb-4">
            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive Silhouette Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display-regal font-normal text-[#fbf8f2] tracking-tight mb-4">
            Virtual <span className="font-serif-luxury italic text-[#d4af37]">Drape Studio</span>
          </h2>
          <p className="text-[#a8a29e] text-xs sm:text-base font-light leading-relaxed">
            Witness how different traditional regional folds alter the personality and movement of each weave. Select a master saree and experiment with signature silhouettes.
          </p>
        </div>

        {/* Studio Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Controls: Select Saree & Drape Style */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Step 1: Choose Weave */}
            <div className="p-6 rounded-2xl bg-[#14110f] border border-[#2b241d] shadow-xl">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                  <Palette className="w-4 h-4" />
                  <span>1. Select Master Drape</span>
                </div>
                <span className="text-[11px] text-[#78716c]">4 Featured Silks</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {SAREE_CATALOG.slice(0, 4).map((saree, idx) => (
                  <button
                    key={saree.id}
                    onClick={() => setSelectedSareeIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      selectedSareeIndex === idx
                        ? 'border-[#d4af37] bg-[#1f1914] shadow-md ring-1 ring-[#d4af37]/40'
                        : 'border-[#241f1a] bg-[#100e0c] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={saree.images.drape}
                      alt={saree.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[#f5f2eb] truncate leading-tight">
                        {saree.weaveType}
                      </p>
                      <p className="text-[10px] text-[#a8a29e] truncate">{saree.colorFamily}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Historical Draping Style */}
            <div className="p-6 rounded-2xl bg-[#14110f] border border-[#2b241d] shadow-xl flex-1">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                  <Layers className="w-4 h-4" />
                  <span>2. Choose Draping Technique</span>
                </div>
                <span className="text-[11px] text-[#78716c]">Regional Folds</span>
              </div>

              <div className="space-y-2.5">
                {DRAPE_STYLES.map((drape) => (
                  <button
                    key={drape.id}
                    onClick={() => setSelectedDrapeId(drape.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedDrapeId === drape.id
                        ? 'border-[#d4af37] bg-[#221c17] text-[#fbf8f2] shadow-lg ring-1 ring-[#d4af37]/30'
                        : 'border-[#241f1a] bg-[#100e0c] text-[#a8a29e] hover:border-[#382f25] hover:text-[#f5f2eb]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-[#f5f2eb]">{drape.name}</h4>
                        <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#29221b] text-[#d4af37]">
                          {drape.region}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716c] mt-0.5 line-clamp-1">{drape.bestFor}</p>
                    </div>
                    {selectedDrapeId === drape.id && (
                      <div className="w-6 h-6 rounded-full bg-[#d4af37] text-[#0c0a09] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Saree Details & Action Card */}
            <div className="p-4 rounded-2xl bg-[#16120f] border border-[#2b241d] flex items-center justify-between">
              <div>
                <p className="text-xs font-serif-luxury font-bold text-[#fbf8f2] leading-tight">
                  {currentSaree.title}
                </p>
                <p className="text-[11px] text-[#d4af37] font-mono mt-0.5">
                  {formatPrice(currentSaree.price, currency)} • In Stock
                </p>
              </div>
              <button
                onClick={() => onSelectProduct(currentSaree)}
                className="py-2 px-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0c0a09] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow cursor-pointer"
              >
                <span>Inspect Weave</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Visual Stage: Interactive Silhouette Simulator */}
          <div className="lg:col-span-7 rounded-3xl bg-[#120f0d] border border-[#332a24] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            {/* View Toggle Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-[#241f1a] mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#d4af37]">
                  {currentDrape.name} • {currentSaree.weaveType} Weave
                </span>
              </div>
              <div className="flex items-center bg-[#1c1815] rounded-lg p-1 border border-[#2e261f]">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    activeTab === 'preview' ? 'bg-[#d4af37] text-[#0c0a09] font-bold' : 'text-[#a8a29e]'
                  }`}
                >
                  Silhouette Preview
                </button>
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    activeTab === 'guide' ? 'bg-[#d4af37] text-[#0c0a09] font-bold' : 'text-[#a8a29e]'
                  }`}
                >
                  Pleat & Pallu Guide
                </button>
              </div>
            </div>

            {/* Main Stage Display with Motion */}
            <AnimatePresence mode="wait">
              {activeTab === 'preview' ? (
                <motion.div
                  key={`preview-${currentSaree.id}-${currentDrape.id}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1 my-auto"
                >
                  {/* Visual Portrait */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#382f25] shadow-2xl group">
                    <img
                      src={currentDrape.illustrationImage}
                      alt={currentDrape.name}
                      className="w-full h-full object-cover object-top filter contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-black/20" />

                    {/* Floating Drape Badge */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#14110f]/90 backdrop-blur-md border border-[#382f25]">
                      <p className="text-[10px] uppercase tracking-wider text-[#d4af37]">Active Draping Style</p>
                      <h4 className="text-sm font-serif-luxury font-bold text-[#fbf8f2]">{currentDrape.name}</h4>
                      <p className="text-[10px] text-[#a8a29e] mt-0.5">{currentDrape.region}</p>
                    </div>
                  </div>

                  {/* Anatomical Drape Breakdown */}
                  <div className="space-y-4 text-left">
                    <div className="p-4 rounded-xl bg-[#181411] border border-[#2b241d]">
                      <span className="text-[10px] text-[#78716c] uppercase tracking-wider block mb-1">
                        Pallu Fall & Placement
                      </span>
                      <p className="text-xs text-[#f5f2eb] font-medium leading-relaxed">
                        {currentDrape.palluPlacement}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#181411] border border-[#2b241d]">
                      <span className="text-[10px] text-[#78716c] uppercase tracking-wider block mb-1">
                        Pleat Construction
                      </span>
                      <p className="text-xs text-[#f5f2eb] font-medium leading-relaxed">
                        {currentDrape.pleatCount}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#181411] border border-[#2b241d]">
                      <span className="text-[10px] text-[#78716c] uppercase tracking-wider block mb-1">
                        Historical Context
                      </span>
                      <p className="text-xs text-[#d6d3d1] font-light leading-relaxed">
                        {currentDrape.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="guide"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 my-auto"
                >
                  <div className="p-5 rounded-2xl bg-[#181411] border border-[#2b241d]">
                    <h4 className="text-sm font-serif-luxury font-bold text-[#d4af37] mb-2">
                      Art of the Perfect 6-Yard Drape
                    </h4>
                    <ul className="space-y-3 text-xs text-[#d6d3d1] leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#29221a] text-[#d4af37] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                        <span>Anchor the inner end into the petticoat at the navel, tucking smoothly around clockwise for a complete 360-degree foundation loop.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#29221a] text-[#d4af37] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                        <span>Measure the pallu from behind your back over the left shoulder, allowing 3.5 feet of zari border to cascade gracefully below the knee.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#29221a] text-[#d4af37] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                        <span>Gather the remaining body silk into 7 to 9 uniform pleats between your thumb and index finger, tap gently to align, and tuck 2 inches below the navel.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#29221a] text-[#d4af37] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                        <span>Pin the pallu securely to your blouse shoulder seam with an invisible safety clasp, letting the front border hug your torso cleanly.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Guarantee Banner */}
            <div className="pt-6 border-t border-[#241f1a] mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a8a29e]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>All Aura Vastra sarees include complimentary hand-stitched fall and pico.</span>
              </div>
              <button
                onClick={() => onSelectProduct(currentSaree)}
                className="text-[#d4af37] hover:underline font-medium cursor-pointer"
              >
                Customize this look in your measurements &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
