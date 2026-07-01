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
  accentBg: string; // solid color for neo brutalism
  textColor: string;
  badgeColor: string;
  targetCategory?: string;
}

const BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Model Motor Siap Pakai',
    subtitle: 'Menyediakan Model Yang Berkualitas Dengan Budget Pelajar',
    badge: 'Best Seller',
    image: '',
    accentBg: 'bg-[#FFE500]', // Yellow
    textColor: 'text-black',
    badgeColor: 'bg-[#00FF85]',
    targetCategory: 'Motor'
  },
  {
    id: 'banner-2',
    title: 'Part Motor Berkualitas',
    subtitle: 'Menyediakan Part Motor Berkualitas Dengan Harga Terjangkau',
    badge: 'Bahan Gantengmu',
    image: '',
    accentBg: 'bg-[#00FF85]', // Green
    textColor: 'text-black',
    badgeColor: 'bg-[#FFE500]',
    targetCategory: 'Part Motor'
  },
  {
    id: 'banner-3',
    title: 'Lapak Jasa Resmi',
    subtitle: 'Menyediakan Jasa Dengan Harga Terjangkau, Dan Model Aman Dari Leak',
    badge: 'Jasa Terpercaya',
    image: '',
    accentBg: 'bg-[#4D4DFF]', // Blue
    textColor: 'text-white',
    badgeColor: 'bg-[#FF6B6B] text-black',
    targetCategory: 'Jasa'
  },
  {
    id: 'banner-4',
    title: 'Model Mobil ( Coming Soon )',
    subtitle: 'Coming SoOooOn :>',
    badge: 'Coming SoOoooOn :>',
    image: '',
    accentBg: 'bg-[#FF6B6B]', // Red
    textColor: 'text-black',
    badgeColor: 'bg-[#FFE500]',
    targetCategory: 'Mobil'
  },
  {
    id: 'banner-5',
    title: 'Part Mobil ( Coming Soon )',
    subtitle: 'Coming SoOooOn :>',
    badge: 'Coming SoOoooOn :>',
    image: '',
    accentBg: 'bg-[#ffffff]', // White
    textColor: 'text-black',
    badgeColor: 'bg-[#4D4DFF] text-white',
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

  /* NEO BRUTALISM */
  return (
    <div id="banner-carousel-root" className="relative w-full h-[260px] sm:h-[350px] md:h-[400px] rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_#000000] bg-white group">
      {/* Slider Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className={`absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 ${BANNERS[currentIndex].accentBg} ${BANNERS[currentIndex].textColor}`}
        >
          {/* Top Row with Badge */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black tracking-widest uppercase border-2 border-black shadow-[2px_2px_0px_#000000] ${BANNERS[currentIndex].badgeColor} text-black`}>
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              {BANNERS[currentIndex].badge}
            </span>
            <span className="font-mono font-black text-sm">
              [ {currentIndex + 1} / {BANNERS.length} ]
            </span>
          </div>

          {/* Middle Body Header/Subtitle */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-shadow-none">
              {BANNERS[currentIndex].title}
            </h2>
            <p className="text-sm sm:text-lg font-bold leading-relaxed max-w-2xl border-l-4 border-black pl-3 py-1">
              {BANNERS[currentIndex].subtitle}
            </p>
          </div>

          {/* Bottom Action CTA Button */}
          <div>
            {BANNERS[currentIndex].targetCategory && (
              <button
                onClick={() => onCategorySelect(BANNERS[currentIndex].targetCategory!)}
                className="px-6 py-3 bg-[#000000] hover:bg-white text-white hover:text-black font-black uppercase tracking-widest border-3 border-black shadow-[4px_4px_0px_#FFE500] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-100 cursor-pointer text-xs sm:text-sm rounded-none"
              >
                Jelajahi Sekarang ➜
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Slides Arrow Controller */}
      <button
        id="btn-prev-banner"
        onClick={prevSlide}
        className="absolute left-4 bottom-4 w-10 h-10 bg-white hover:bg-[#FFE500] border-3 border-black text-black flex items-center justify-center transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer z-20"
      >
        <ChevronLeft className="w-5 h-5 stroke-[3px]" />
      </button>
      <button
        id="btn-next-banner"
        onClick={nextSlide}
        className="absolute left-16 bottom-4 w-10 h-10 bg-white hover:bg-[#FFE500] border-3 border-black text-black flex items-center justify-center transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer z-20"
      >
        <ChevronRight className="w-5 h-5 stroke-[3px]" />
      </button>

      {/* Pagination Dot Indicator */}
      <div className="absolute right-6 bottom-6 flex items-center gap-1.5 z-20">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 border-2 border-black cursor-pointer transition-all ${
              index === currentIndex ? 'w-8 bg-black' : 'w-3 bg-white hover:bg-black/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
