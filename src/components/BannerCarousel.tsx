/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  accent: string;
  targetCategory?: string;
}

const BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Model Motor Siap Pakai',
    subtitle: 'Menyediakan Model Yang Berkualitas Dengan Budget Pelajar',
    badge: 'Best Seller',
    image: '',
    accent: 'from-blue-500/20 to-cyan-500/10',
    targetCategory: 'Motor'
  },
  {
    id: 'banner-2',
    title: 'Part Motor Berkualitas',
    subtitle: 'Menyediakan Part Motor Berkualitas Dengan Harga Terjangkau',
    badge: 'Bahan Gantengmu',
    image: '',
    accent: 'from-amber-500/20 to-red-500/10',
    targetCategory: 'Part Motor'
  },
  {
    id: 'banner-3',
    title: 'Lapak Jasa Resmi',
    subtitle: 'Menyediakan Jasa Dengan Harga Terjangkau, Dan Model Aman Dari Leak',
    badge: 'Jasa Terpercaya',
    image: '',
    accent: 'from-purple-500/20 to-pink-500/10',
    targetCategory: 'Jasa'
  },
  {
    id: 'banner-4',
    title: 'Model Mobil ( Coming Soon )',
    subtitle: 'Coming SoOooOn :>',
    badge: 'Coming SoOoooOn :>',
    image: '',
    accent: 'from-purple-500/20 to-pink-500/10',
    targetCategory: 'Mobil'
  },
  {
    id: 'banner-5',
    title: 'Part Mobil ( Coming Soon )',
    subtitle: 'Coming SoOooOn :>',
    badge: 'Coming SoOoooOn :>',
    image: '',
    accent: 'from-purple-500/20 to-pink-500/10',
    targetCategory: 'Part Mobil'
  }
];

interface BannerCarouselProps {
  onCategorySelect: (category: string) => void;
}

export default function BannerCarousel({ onCategorySelect }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div id="banner-carousel-root" className="relative w-full h-[240px] sm:h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-950">
      
      {/* Specular Inner Highlight Effect (Liquid Glass Signature) */}
      <div className="absolute top-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />
      
      {/* Slider Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Ambient Shadow Overlays */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[6000ms] group-hover:scale-105" style={{ backgroundImage: `url(${BANNERS[currentIndex].image})` }} />
          
          {/* Liquid Glass Overlay Backdrop Filter */}
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${BANNERS[currentIndex].accent} mix-blend-multiply opacity-60`} />

          {/* Real Text Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16 z-10">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 rounded-full w-fit mb-3 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {BANNERS[currentIndex].badge}
            </motion.span>
            
            <motion.h2
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans uppercase tracking-tight leading-tight max-w-2xl text-shadow-md"
            >
              {BANNERS[currentIndex].title}
            </motion.h2>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xs sm:text-base text-slate-350 max-w-lg mt-2 sm:mt-3 leading-relaxed hidden sm:block"
            >
              {BANNERS[currentIndex].subtitle}
            </motion.p>
            
            {BANNERS[currentIndex].targetCategory && (
              <motion.button
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                onClick={() => onCategorySelect(BANNERS[currentIndex].targetCategory!)}
                className="mt-4 sm:mt-6 w-fit px-5 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold tracking-wide rounded-2xl border border-white/20 backdrop-blur-md transition-all duration-300 shadow-lg"
              >
                Jelajahi Sekarang
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Slides Arrow Controller */}
      <button
        id="btn-prev-banner"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/30 hover:bg-slate-900/60 active:scale-90 border border-white/10 hover:border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all z-20 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        id="btn-next-banner"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/30 hover:bg-slate-900/60 active:scale-90 border border-white/10 hover:border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all z-20 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Dot Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/65'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
