/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  key?: React.Key;
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export default function ProductCard({ product, onViewDetail, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  // Render Category Badge Color
  const getBadgeStyles = (category: string) => {
    switch (category) {
      case 'Motor':
        return 'bg-blue-500/15 border-blue-400/30 text-blue-300';
      case 'Mobil':
        return 'bg-red-500/15 border-red-400/30 text-red-300';
      case 'Part Motor':
        return 'bg-amber-500/15 border-amber-400/30 text-amber-300';
      case 'Part Mobil':
        return 'bg-orange-500/15 border-orange-400/30 text-orange-300';
      case 'Jasa':
        return 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300';
      default:
        return 'bg-purple-500/15 border-purple-400/30 text-purple-300';
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative flex flex-col rounded-3xl overflow-hidden backdrop-blur-xl bg-slate-950/40 border border-white/10 shadow-xl group transition-all duration-300"
    >
      {/* Specular Inner Highlight Curve (iOS 26 Signature) */}
      <div className="absolute top-[1px] left-3 right-3 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />

      {/* Floating Category Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-xl backdrop-blur-md ${getBadgeStyles(product.category)}`}>
          {product.category}
        </span>
      </div>

      {/* Product Image Area */}
      <div className="relative w-full aspect-square overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onViewDetail(product)}>
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft shadow cover over product image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
        
        {/* Blur reveal cover on hover */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(product);
            }}
            className="w-11 h-11 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-lg transition-transform"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
          
          {!isOutOfStock && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-11 h-11 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shadow-lg hover:bg-cyan-400 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Product Info Area */}
      <div className="p-5 flex flex-col flex-grow justify-between relative bg-slate-950/20">
        <div>
          {/* Stock state indicator */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {isOutOfStock ? (
                <span className="text-red-400 font-bold flex items-center gap-1">
                  ● Habis Stok
                </span>
              ) : (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  ● Tersedia ({product.stock} pcs)
                </span>
              )}
            </span>
            {product.stock <= 2 && !isOutOfStock && (
              <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 animate-pulse">
                Limited Stock
              </span>
            )}
          </div>

          <h3 
            className="text-sm font-bold text-white tracking-wide font-sans line-clamp-2 hover:text-cyan-400 transition-colors cursor-pointer mb-2 h-10"
            onClick={() => onViewDetail(product)}
          >
            {product.name}
          </h3>
        </div>

        <div>
          <div className="flex items-baseline gap-1 mt-2 mb-3">
            <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onViewDetail(product)}
              className="flex-1 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/15 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" /> Detail
            </button>
            <button
              onClick={() => !isOutOfStock && onAddToCart(product)}
              disabled={isOutOfStock}
              className={`flex-1 py-2.5 text-xs font-bold rounded-2xl tracking-wide transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/20 border border-cyan-550/30'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> Beli
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
