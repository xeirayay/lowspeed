/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, MoveRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from './ProductCard';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout
}: CartDrawerProps) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-root" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      {/* Drawer content panel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed inset-y-0 right-0 max-w-full flex md:pl-10 pointer-events-auto">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            // Responsive styling: transforms to bottom sheet on mobile (viewport full-width, slides bottom-up implicitly or we can slide sidebar with high aesthetic value)
            // To make it bottom sheet on mobile: left-0 bottom-0 top-auto h-[80vh] md:left-auto md:bottom-auto md:top-0 md:h-full md:w-[480px]
            className="w-screen max-w-md md:max-w-xl h-[85vh] sm:h-[80vh] md:h-screen fixed bottom-0 left-0 right-0 md:relative md:top-0 md:bottom-auto md:left-auto md:right-auto md:h-full flex flex-col backdrop-blur-3xl bg-slate-900/60 border-t md:border-t-0 md:border-l border-white/20 shadow-2xl rounded-t-[32px] md:rounded-t-none md:rounded-l-[32px] text-white"
          >
            {/* Liquid glass light leak */}
            <div className="absolute top-[1px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent z-20 pointer-events-none" />

            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <span className="text-base font-extrabold tracking-wider font-sans">
                  KERANJANG BELANJA
                </span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-white/10 rounded-full border border-white/10">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable list of items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-1 uppercase tracking-wider">
                    Keranjang Kosong
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Wah, belum ada barang yang kamu masukkan. Silahkan jelajahi katalog Lowspeed untuk memesan !
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 text-white text-xs font-bold rounded-2xl transition-all"
                  >
                    Kembali Belanja
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layoutId={`cart-item-${item.product.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative p-4 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md flex gap-4"
                  >
                    {/* Tiny reflection highlight inside item */}
                    <div className="absolute top-[1px] left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/5 shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta info container */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Category text */}
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-cyan-400 block mt-0.5">
                          {item.product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-2">
                        {/* Unit price indicator */}
                        <span className="text-xs sm:text-sm font-extrabold font-mono text-cyan-300">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-xl px-1.5 py-1">
                          <button
                            onClick={() => onUpdateQty(item.product.id, -1)}
                            className="w-6 h-6 rounded-lg hover:bg-white/10 active:scale-90 flex items-center justify-center text-white text-xs disabled:opacity-40"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold font-mono text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-6 h-6 rounded-lg hover:bg-white/10 active:scale-90 flex items-center justify-center text-white text-xs disabled:opacity-40"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-slate-950/40 backdrop-blur-xl">
                <div className="space-y-2.5 mb-6">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Jumlah Barang</span>
                    <span className="font-mono">{totalItems} unit</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Pajak & Biaya Transaksi</span>
                    <span className="text-emerald-400 uppercase font-mono font-bold text-[10px] bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      Bebas Pajak
                    </span>
                  </div>
                  <div className="h-px bg-white/10 my-1" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white uppercase">
                      Total Belanja
                    </span>
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-2xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 cursor-pointer text-center"
                  >
                    Lanjut Cari
                  </button>
                  <button
                    onClick={onProceedToCheckout}
                    className="flex-1.5 py-3 px-5 rounded-2xl text-xs font-black tracking-widest uppercase bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 hover:text-slate-950 font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-lg shadow-cyan-900/10"
                  >
                    Checkout <MoveRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
