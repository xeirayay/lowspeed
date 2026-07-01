/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from './ProductCard';

// DISCORD REDIRECT
const DISCORD_SERVER_URL = 'https://discord.gg/hyA7X58cwa';

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

  /* NEO BRUTALISM */
  return (
    <div id="cart-drawer-root" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer content panel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed inset-y-0 right-0 max-w-full flex md:pl-10 pointer-events-auto">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md md:max-w-xl h-[85vh] sm:h-[80vh] md:h-screen fixed bottom-0 left-0 right-0 md:relative md:top-0 md:bottom-auto md:left-auto md:right-auto md:h-full flex flex-col bg-white border-t-4 md:border-t-0 md:border-l-4 border-black shadow-[-8px_0px_0px_#000000] rounded-none text-black"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b-3 border-black bg-[#FFE500] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-black stroke-[2.5px]" />
                <span className="text-base font-black tracking-widest font-sans uppercase">
                  KERANJANG BELANJA
                </span>
                <span className="px-2.5 py-0.5 text-xs font-mono font-black bg-white border-2 border-black">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white hover:bg-[#FF6B6B] border-2 border-black flex items-center justify-center text-black transition-all cursor-pointer rounded-none"
              >
                <X className="w-5 h-5 stroke-[2.5px]" />
              </button>
            </div>

            {/* Scrollable list of items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F5F5F5]">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-black py-12">
                  <div className="w-20 h-20 bg-white border-3 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000000]">
                    <ShoppingBag className="w-10 h-10 text-black stroke-[2px]" />
                  </div>
                  <h3 className="text-lg font-black text-black mb-1 uppercase tracking-wider">
                    Keranjang Kosong
                  </h3>
                  <p className="text-xs text-black/70 max-w-xs mx-auto font-bold leading-relaxed">
                    Wah, belum ada barang yang kamu masukkan. Silahkan jelajahi katalog Lowspeed untuk memesan!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-3 bg-[#FFE500] hover:bg-[#FFE500]/90 border-2 border-black text-black text-xs font-black uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 rounded-none cursor-pointer"
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
                    className="relative p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] flex gap-4 rounded-none"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 border-2 border-black shrink-0 rounded-none bg-white">
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
                          <h4 className="text-xs sm:text-sm font-black text-black tracking-tight line-clamp-1 uppercase">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-black hover:text-[#FF6B6B] border border-transparent hover:border-black p-1 transition-colors cursor-pointer rounded-none"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2px]" />
                          </button>
                        </div>
                        <span className="inline-block text-[9px] uppercase tracking-wider font-black text-black bg-[#00FF85] border border-black px-1.5 py-0.5 mt-1">
                          {item.product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-2">
                        {/* Unit price indicator */}
                        <span className="text-xs sm:text-sm font-black font-mono text-black bg-[#FFE500] border border-black px-1.5">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-white border-2 border-black px-1 py-0.5">
                          <button
                            onClick={() => onUpdateQty(item.product.id, -1)}
                            className="w-6 h-6 hover:bg-[#FF6B6B] flex items-center justify-center text-black text-xs font-bold disabled:opacity-40 cursor-pointer"
                          >
                            <Minus className="w-3 h-3 stroke-[3px]" />
                          </button>
                          <span className="w-6 text-center font-black font-mono text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-6 h-6 hover:bg-[#00FF85] flex items-center justify-center text-black text-xs font-bold disabled:opacity-40 cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[3px]" />
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
              <div className="p-6 border-t-3 border-black bg-white">
                <div className="space-y-2.5 mb-6">
                  <div className="flex justify-between text-xs font-black uppercase text-black">
                    <span>Jumlah Barang</span>
                    <span className="font-mono">{totalItems} unit</span>
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase text-black">
                    <span>Pajak & Biaya Transaksi</span>
                    <span className="text-black uppercase font-mono font-black text-[10px] bg-[#00FF85] px-2 py-0.5 border-2 border-black shadow-[1.5px_1.5px_0px_#000000]">
                      Bebas Pajak
                    </span>
                  </div>
                  <div className="h-px bg-black my-2" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-black text-black uppercase">
                      Total Belanja
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-black bg-[#FFE500] border-2 border-black px-3 py-1 shadow-[3px_3px_0px_#000000]">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {/* DISCORD REDIRECT */}
                  <button
                    onClick={() => {
                      window.open(DISCORD_SERVER_URL, '_blank');
                    }}
                    className="w-full py-4 px-5 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-black tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2 rounded-none text-sm"
                  >
                    Checkout via Discord 🛒
                  </button>
                  <p className="text-[11px] text-black font-black text-center uppercase tracking-wide">
                    Kamu akan diarahkan ke server Discord kami untuk menyelesaikan pesanan
                  </p>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 px-4 text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer text-center rounded-none"
                  >
                    Lanjut Cari Barang
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
