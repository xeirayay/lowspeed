/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Share2, CornerDownRight, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from './ProductCard';

// DISCORD REDIRECT
const DISCORD_SERVER_URL = 'https://discord.gg/hyA7X58cwa';

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

  const handleBeliSekarangDirect = () => {
    // DISCORD REDIRECT
    window.open(DISCORD_SERVER_URL, '_blank');
  };

  const isOutOfStock = product.stock <= 0;

  /* NEO BRUTALISM */
  return (
    <div id="product-detail-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] rounded-none overflow-y-auto bg-white border-4 border-black shadow-[10px_10px_0px_#000000] flex flex-col md:flex-row text-black z-10"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-white hover:bg-[#FFE500] border-3 border-black flex items-center justify-center text-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer rounded-none"
        >
          <X className="w-5 h-5 stroke-[3px]" />
        </button>

        {/* LEFT COLUMN: Gallery Slider Container */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r-3 md:border-black">
          <div>
            <div className="relative w-full aspect-square bg-[#F5F5F5] border-3 border-black flex items-center justify-center rounded-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white hover:bg-[#FFE500] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000000] transition-all cursor-pointer rounded-none"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[3px]" />
                  </button>
                  <button
                    onClick={handlesNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white hover:bg-[#FFE500] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000000] transition-all cursor-pointer rounded-none"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[3px]" />
                  </button>
                </>
              )}

              {/* Indicator count inside cover */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-[#FFE500] text-black border-2 border-black font-mono font-black text-xs shadow-[2px_2px_0px_#000000]">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-none overflow-hidden bg-[#F5F5F5] border-2 transition-all shrink-0 ${
                      idx === activeImageIndex 
                        ? 'border-black ring-4 ring-[#FFE500] scale-95' 
                        : 'border-gray-400 hover:border-black'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Core Specifications Notes */}
          <div className="mt-6 p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] rounded-none hidden md:block">
            <span className="text-xs uppercase tracking-widest font-black text-black bg-[#FFE500] border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000000] inline-flex items-center gap-1 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3px]" /> JAMINAN LOWSPEED
            </span>
            <ul className="space-y-1.5 text-black text-xs font-bold">
              <li className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 stroke-[3px] text-[#4D4DFF]" /> Part & Model 100% Aman.
              </li>
              <li className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 stroke-[3px] text-[#4D4DFF]" /> File Hanya Berbentuk .rbxm.
              </li>
              <li className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 stroke-[3px] text-[#4D4DFF]" /> Deskripsi Sesuai Produk Yang Dijual.
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category Breadcrumb and Stock status info */}
            <div className="flex items-center justify-between gap-2 mb-4 mt-2">
              <span className="px-3 py-1 text-xs uppercase tracking-widest font-black text-black bg-[#4D4DFF] text-white border-2 border-black shadow-[2px_2px_0px_#000000] rounded-none">
                {product.category}
              </span>

              <span className="text-xs font-mono">
                {isOutOfStock ? (
                  <span className="text-black font-black uppercase bg-[#FF6B6B] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_#000000] rounded-none">
                    HABIS STOK
                  </span>
                ) : (
                  <span className="text-black font-black uppercase bg-[#00FF85] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_#000000] rounded-none">
                    Tersedia: {product.stock}
                  </span>
                )}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase mb-4 border-b-3 border-black pb-2">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="py-3 px-5 bg-[#FFE500] border-3 border-black w-fit mb-6 shadow-[4px_4px_0px_#000000]">
              <div className="text-[10px] text-black uppercase tracking-widest font-black">Harga Spesial</div>
              <div className="text-2xl sm:text-3xl font-black text-black leading-none mt-1">
                {formatCurrency(product.price)}
              </div>
            </div>

            {/* Description Tab logs */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-black border-b-2 border-black pb-1.5">
                Deskripsi Spesifikasi
              </h4>
              <p className="text-xs sm:text-sm text-black font-bold leading-relaxed whitespace-pre-line bg-[#F5F5F5] p-3 border-2 border-black">
                {product.description}
              </p>
            </div>
          </div>

          <div>
            {/* Quantity Selector Section & Buy tools */}
            {!isOutOfStock ? (
              <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-none">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-black uppercase tracking-widest font-black">Jumlah Pembelian</span>
                  <span className="text-xs font-black">Subtotal: <span className="bg-[#00FF85] px-1 border border-black font-mono">{formatCurrency(product.price * quantity)}</span></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecreaseQty}
                    disabled={quantity <= 1}
                    className="w-9 h-9 bg-white hover:bg-[#FFE500] border-2 border-black flex items-center justify-center text-black text-lg font-black transition-all disabled:opacity-40 rounded-none cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-base font-mono bg-white rounded-none py-1 border-2 border-black">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQty}
                    disabled={quantity >= product.stock}
                    className="w-9 h-9 bg-white hover:bg-[#FFE500] border-2 border-black flex items-center justify-center text-black text-lg font-black transition-all disabled:opacity-40 rounded-none cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#FF6B6B]/20 border-3 border-black mb-6 text-black flex items-center gap-3 rounded-none">
                <AlertTriangle className="w-5 h-5 stroke-[3px]" />
                <div className="text-xs font-bold">
                  <span className="font-black block uppercase">Produk Ini Telah Habis Terjual</span>
                  Stok barang ini kosong untuk sementara waktu. Silahkan hubungi admin untuk menanyakan stock.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={isOutOfStock}
                onClick={triggerCartSuccess}
                className={`flex-1 py-4 px-4 font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 rounded-none border-3 ${
                  isOutOfStock
                    ? 'border-gray-400 text-gray-500 bg-gray-200 cursor-not-allowed shadow-none'
                    : 'border-black bg-white hover:bg-[#F5F5F5] text-black shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000]'
                }`}
              >
                <ShoppingCart className="w-5 h-5 stroke-[2.5px]" /> Tambah Keranjang
              </button>

              <button
                disabled={isOutOfStock}
                onClick={handleBeliSekarangDirect}
                className={`flex-1 py-4 px-4 font-black text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-2 rounded-none border-3 ${
                  isOutOfStock
                    ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-[#FFE500] text-black border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FFE500]/90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000]'
                }`}
              >
                Checkout via Discord 🛒
              </button>
            </div>

            {/* Direct share / query whatsapp button */}
            <div className="mt-5 flex items-center justify-between text-black text-xs font-black uppercase">
              <button 
                onClick={() => {
                  window.open(DISCORD_SERVER_URL, '_blank');
                }}
                className="hover:bg-[#4D4DFF] hover:text-white px-2 py-1 border border-black transition-colors cursor-pointer flex items-center gap-1"
              >
                <MessageSquare className="w-4 h-4 fill-current text-current" /> Chat Admin Discord
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link produk disalin ke clipboard!');
                }}
                className="hover:bg-[#FFE500] px-2 py-1 border border-black transition-colors cursor-pointer flex items-center gap-1"
              >
                <Share2 className="w-4 h-4 stroke-[2.5px]" /> Bagikan Link
              </button>
            </div>

            {/* Add to Cart feedback animation pop */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-4 p-3 bg-[#00FF85] text-black border-2 border-black text-xs font-black text-center flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000000]"
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[3px]" />
                  Berhasil menyimpan {quantity} unit ke dalam keranjang!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
