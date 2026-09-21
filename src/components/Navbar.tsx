import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, ShieldCheck, ChevronDown } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/sarees';
import { formatPrice } from '../utils/format';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchClick: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const ANNOUNCEMENTS = [
  'Complimentary Insured Worldwide Delivery on Orders Above ₹15,000',
  'Welcome Privilege: Enjoy 15% off your first heirloom with code ROYAL15',
  'Silk Mark Certified • 100% Genuine Handloom Weaves Direct from Master Looms',
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onSearchClick,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'Royal Weaves', id: 'catalog' },
    { label: 'Heritage Spotlights', id: 'showcase' },
    { label: 'Drape Studio', id: 'drape-studio' },
    { label: 'Artisan Story', id: 'artisan-story' },
    { label: 'Client Stories', id: 'testimonials' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      {/* Top Announcement Bar */}
      <div className="bg-[#1c1815] border-b border-[#332a24] text-[#d4af37] text-[11px] sm:text-xs py-1.5 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-[#a8a29e] text-[11px] normal-case">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Silk Mark Authority Certified</span>
          </div>

          <div className="flex-1 text-center truncate overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={announcementIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="inline-block font-medium tracking-widest text-[11px]"
              >
                {ANNOUNCEMENTS[announcementIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative text-[11px]">
            <button
              id="currency-selector-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-[#f5f2eb] hover:text-[#d4af37] transition-colors py-0.5 px-2 rounded border border-[#332a24] bg-[#12100e]"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[#d4af37]" />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-[#181512] border border-[#332a24] rounded shadow-xl py-1 z-50">
                {(Object.keys(CURRENCY_RATES) as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      onCurrencyChange(cur);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#26201b] transition-colors flex justify-between items-center ${
                      currency === cur ? 'text-[#d4af37] font-semibold' : 'text-[#d6d3d1]'
                    }`}
                  >
                    <span>{cur}</span>
                    <span className="text-[10px] text-[#78716c]">{CURRENCY_RATES[cur].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-[#0c0a09]/95 backdrop-blur-md border-[#292524] py-3.5 shadow-2xl shadow-black/40'
            : 'bg-gradient-to-b from-[#0c0a09]/90 via-[#0c0a09]/70 to-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Menu / Mobile Hamburger */}
          <div className="flex items-center gap-6">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#f5f2eb] hover:text-[#d4af37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <ul className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest text-[#d6d3d1]">
              {navLinks.slice(0, 3).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigateSection(link.id)}
                    className="hover:text-[#d4af37] transition-colors relative py-1 group"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Brand Identity */}
          <div className="text-center cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <span className="h-[1px] w-5 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="h-[1px] w-5 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display-regal tracking-[0.25em] text-[#fbf8f2] font-semibold uppercase">
              Aura Vastra
            </h1>
            <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#d4af37] uppercase font-light">
              Haute Saree Atelier
            </p>
          </div>

          {/* Right Action Icons & Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <ul className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest text-[#d6d3d1] mr-3">
              {navLinks.slice(3).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigateSection(link.id)}
                    className="hover:text-[#d4af37] transition-colors relative py-1 group"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>

            <button
              id="nav-search-btn"
              onClick={onSearchClick}
              className="p-2 text-[#d6d3d1] hover:text-[#d4af37] transition-colors"
              title="Search Catalog"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-[#d6d3d1] hover:text-[#d4af37] transition-colors relative"
              title="Saved Sarees"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#b91c1c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2.5 py-1.5 px-3 rounded-full bg-[#1c1815] border border-[#332a24] hover:border-[#d4af37] transition-all group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#d4af37] text-[#0c0a09] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider leading-none">Bag</span>
                <span className="text-xs text-[#f5f2eb] font-semibold leading-none mt-0.5">
                  {cartTotal > 0 ? formatPrice(cartTotal, currency) : 'Empty'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#12100e] border-b border-[#292524] px-6 py-6 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigateSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm uppercase tracking-widest text-[#e7e5e4] hover:text-[#d4af37] py-2 border-b border-[#241f1a]"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 flex items-center justify-between text-xs text-[#a8a29e]">
                <span>Currency: {currency}</span>
                <button
                  onClick={() => {
                    onOpenWishlist();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[#d4af37] flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
