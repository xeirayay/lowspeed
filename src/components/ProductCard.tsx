/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Eye } from 'lucide-react';
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

  /* NEO BRUTALISM */
  const getBadgeColors = (category: string) => {
    switch (category) {
      case 'Motor':
        return 'bg-[#4D4DFF] text-white'; // Bold Blue
      case 'Mobil':
        return 'bg-[#FF6B6B] text-black'; // Bold Red
      case 'Part Motor':
        return 'bg-[#FFE500] text-black'; // Bold Yellow
      case 'Part Mobil':
        return 'bg-[#00FF85] text-black'; // Bold Green
      case 'Jasa':
        return 'bg-[#00FF85] text-black'; // Green
      default:
        return 'bg-white text-black';
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative flex flex-col bg-white text-black border-3 border-black shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000000] transition-all duration-150 rounded-none group"
    >
      {/* Floating Category Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`inline-flex items-center px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] rounded-none ${getBadgeColors(product.category)}`}>
          {product.category}
        </span>
      </div>

      {/* Product Image Area */}
      <div 
        className="relative w-full aspect-square overflow-hidden bg-[#F5F5F5] border-b-3 border-black cursor-pointer" 
        onClick={() => onViewDetail(product)}
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600'}
          alt={product.name}
          className="w-full h-full object-cover grayscale-0 group-hover:grayscale-0 transition-all duration-300"
          referrerPolicy="no-referrer"
        />
        
        {/* Blur reveal cover on hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-3">
          {/* Subtle overlay */}
        </div>
      </div>

      {/* Product Info Area */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Stock state indicator */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase font-black">
              {isOutOfStock ? (
                <span className="text-[#FF6B6B] border border-black bg-[#FF6B6B]/15 px-2 py-0.5">
                  HABIS STOK
                </span>
              ) : (
                <span className="text-black border border-black bg-[#00FF85]/20 px-2 py-0.5">
                  STOK: {product.stock} UNIT
                </span>
              )}
            </span>
            {product.stock <= 2 && !isOutOfStock && (
              <span className="text-[10px] font-black text-black bg-[#FFE500] px-1.5 py-0.5 border border-black uppercase animate-pulse">
                LIMITED
              </span>
            )}
          </div>

          <h3 
            className="text-sm font-black text-black tracking-tight line-clamp-2 hover:underline cursor-pointer mb-2 h-10 uppercase"
            onClick={() => onViewDetail(product)}
          >
            {product.name}
          </h3>
        </div>

        <div>
          <div className="flex items-baseline gap-1 mt-1 mb-3 border-t-2 border-black pt-3">
            <span className="text-lg font-black tracking-tight text-black bg-[#FFE500] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000000]">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onViewDetail(product)}
              className="flex-1 py-2.5 text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-[#F5F5F5] border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded-none"
            >
              <Eye className="w-4 h-4 stroke-[3px]" /> Detail
            </button>
            <button
              onClick={() => !isOutOfStock && onAddToCart(product)}
              disabled={isOutOfStock}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded-none ${
                isOutOfStock
                  ? 'bg-gray-300 text-gray-500 border-2 border-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-[#FFE500] text-black border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] hover:bg-[#FFE500]/90'
              }`}
            >
              <ShoppingCart className="w-4 h-4 stroke-[3px]" /> Keranjang
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
