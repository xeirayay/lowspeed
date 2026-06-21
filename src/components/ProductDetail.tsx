/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Share2, CornerDownRight, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart, onBuyNow }: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState(false);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600'];

  const handlesNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlesPrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQty = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const triggerCartSuccess = () => {
    onAddToCart(product, quantity);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div id="product-detail-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Immersive backdrop with custom blur layers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] rounded-3xl overflow-y-auto backdrop-blur-2xl bg-slate-900/40 border border-white/20 shadow-2xl flex flex-col md:flex-row text-white z-10"
      >
        {/* Specular Edge Highlight Light Reflection */}
        <div className="absolute top-[1px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/35 to-transparent z-20 pointer-events-none" />

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 active:scale-90 border border-white/10 hover:border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Gallery Slider Container */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-white/5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlesPrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/40 hover:bg-slate-900/70 active:scale-90 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handlesNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/40 hover:bg-slate-900/70 active:scale-90 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Indicator dots inside cover */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/5">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border transition-all ${
                      idx === activeImageIndex 
                        ? 'border-cyan-400 ring-2 ring-cyan-400/20 scale-95' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Core Specifications Notes */}
          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md hidden md:block">
            <span className="text-xs uppercase tracking-widest font-extrabold text-cyan-400 flex items-center gap-1 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> JAMINAN LOWSPEED
            </span>
            <ul className="space-y-1 text-slate-350 text-xs">
              <li className="flex items-center gap-2">
                <CornerDownRight className="w-3 h-3 text-cyan-400" /> Part & Model 100% Aman.
              </li>
              <li className="flex items-center gap-2">
                <CornerDownRight className="w-3 h-3 text-cyan-400" /> File Yang Diberikan Hanya Berbentuk .rbxm.
              </li>
              <li className="flex items-center gap-2">
                <CornerDownRight className="w-3 h-3 text-cyan-400" /> Deskripsi Produk Sesuai Dengan Produk Yang Dijual.
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category Breadcrumb and Stock status info */}
            <div className="flex items-center justify-between gap-2 mb-3 mt-1.5">
              <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 rounded-xl font-bold">
                {product.category}
              </span>

              <span className="text-xs font-mono">
                {isOutOfStock ? (
                  <span className="text-red-405 font-bold flex items-center gap-1 bg-red-950/30 border border-red-500/30 px-2.5 py-0.5 rounded-lg text-red-300">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-emerald-405 font-medium flex items-center gap-1 bg-emerald-950/30 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg text-emerald-300">
                    Stok: {product.stock} Tersedia
                  </span>
                )}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide font-sans mb-3 leading-tight uppercase">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="py-2.5 px-4 rounded-2xl bg-white/5 border border-white/10 w-fit mb-5">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Harga Spesial</div>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 leading-none mt-1">
                {formatCurrency(product.price)}
              </div>
            </div>

            {/* Description Tab logs */}
            <div className="space-y-3.5 mb-6">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 border-b border-white/10 pb-1.5">
                Deskripsi Spesifikasi
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-full text-justify whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          <div>
            {/* Quantity Selector Section & Buy tools */}
            {!isOutOfStock ? (
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/10 mb-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Atur Jumlah Pembelian</span>
                  <span className="text-xs text-slate-300">Subtotal: <b className="text-cyan-300 font-bold font-mono">{formatCurrency(product.price * quantity)}</b></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecreaseQty}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-base font-mono bg-black/30 rounded-xl py-1 border border-white/5">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQty}
                    disabled={quantity >= product.stock}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20 mb-5 text-red-300 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">Produk Ini Telah Habis Terjual</span>
                  Stok barang ini kosong untuk sementara waktu. Silahkan hubungi admin untuk menanyakan stock.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={isOutOfStock}
                onClick={triggerCartSuccess}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm tracking-wide active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border ${
                  isOutOfStock
                    ? 'border-slate-800 text-slate-500 bg-slate-900 cursor-not-allowed'
                    : 'border-white/15 bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <ShoppingCart className="w-5 h-5" /> Tambah Keranjang
              </button>

              <button
                disabled={isOutOfStock}
                onClick={() => onBuyNow(product, quantity)}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-widest uppercase active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 hover:text-slate-950 shadow-lg shadow-cyan-500/10 font-bold'
                }`}
              >
                Beli Sekarang
              </button>
            </div>

            {/* Direct share / query whatsapp button */}
            <div className="mt-4 flex items-center justify-between text-slate-400 text-xs">
              <button 
                onClick={() => {
                  window.open(`https://discord.gg/hyA7X58cwa`, '_blank');
                }}
                className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" /> Chat Admin Via Discord
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link produk disalin ke clipboard!');
                }}
                className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> Bagikan Link
              </button>
            </div>

            {/* Add to Cart feedback animation pop */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Berhasil menyimpan {quantity} unit ke dalam keranjang belanja Anda!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
