import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAREE_CATALOG } from '../data/sarees';
import { SareeProduct, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onSelectProduct: (product: SareeProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const quickPicks = ['Banarasi Katan', 'Kanjeevaram Korvai', 'Bridal Heritage', 'Pure Silver Zari', 'Chanderi Tissue', 'Yeola Paithani'];

  const results = query.trim()
    ? SAREE_CATALOG.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.weaveType.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.occasion.toLowerCase().includes(query.toLowerCase()) ||
          p.originRegion.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-6 pt-20 bg-black/85 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#14110f] border border-[#332a24] rounded-3xl shadow-2xl p-6 z-10 overflow-hidden"
        >
          {/* Header Search Field */}
          <div className="relative mb-5">
            <Search className="w-5 h-5 text-[#d4af37] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by weave, royal occasion, motif, city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#181412] border border-[#382f25] rounded-full py-3.5 pl-12 pr-12 text-sm text-[#f5f2eb] placeholder-[#78716c] focus:outline-none focus:border-[#d4af37]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#f5f2eb]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Suggested Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-[#241f1a]">
            <span className="text-[11px] text-[#78716c] uppercase tracking-wider whitespace-nowrap">Suggested:</span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                onClick={() => setQuery(pick)}
                className="text-[11px] py-1 px-3 rounded-full bg-[#1c1815] border border-[#2b241d] text-[#a8a29e] hover:text-[#d4af37] hover:border-[#d4af37] whitespace-nowrap transition-colors"
              >
                {pick}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="max-h-80 overflow-y-auto space-y-3">
            {query.trim() && results.length === 0 && (
              <div className="text-center py-10 text-xs text-[#78716c]">
                No master drapes found for "{query}". Try searching "Banarasi" or "Kanjeevaram".
              </div>
            )}

            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-[#181412] border border-[#2b241d] hover:border-[#d4af37] transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images.drape}
                    alt={product.title}
                    className="w-12 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-serif-luxury font-bold text-[#fbf8f2] group-hover:text-[#d4af37] transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-[10px] text-[#a8a29e] mt-0.5">
                      {product.weaveType} • {product.occasion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-[#f5f2eb]">
                    {formatPrice(product.price, currency)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#78716c] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}

            {!query.trim() && (
              <div className="text-center py-8 text-xs text-[#78716c]">
                <Sparkles className="w-8 h-8 text-[#2b241d] mx-auto mb-2" />
                <span>Type keywords above to instantly browse the handloom archive.</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
