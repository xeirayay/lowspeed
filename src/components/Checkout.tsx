/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ArrowLeft, ShieldCheck, HeartHandshake, CheckCircle2, MessageSquare, ExternalLink, QrCode, Download } from 'lucide-react';
import { CartItem, Order } from '../types';
import { formatCurrency } from './ProductCard';
const xeiraQris = "https://cdn.phototourl.com/member/2026-06-20-e4be246a-99e1-4633-a21e-1b53753a91f2.jpg";

interface CheckoutProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onClearCart: () => void;
  onCreateOrder: (order: Order) => void;
}

export default function Checkout({ cartItems, onBackToCart, onClearCart, onCreateOrder }: CheckoutProps) {
  // Configurable WhatsApp receipt target 
  const [waLink, setWaLink] = useState('https://discord.gg/hyA7X58cwa'); 
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerNotes, setBuyerNotes] = useState('');
  const [orderId] = useState(() => '#LS-' + Math.floor(1000 + Math.random() * 9000) + '-' + Date.now().toString().slice(-4));

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Generate order text summary for WA link
  const constructMessageForWhatsApp = () => {
    let itemsText = cartItems
      .map((item, idx) => `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}x) - ${formatCurrency(item.product.price * item.quantity)}`)
      .join('%0A');
    
    let text = `Halo%20Lowspeed%20Admin%21%0A%0ASaya%20ingin%20mengirim%20bukti%20pembayaran%20QRIS%20untuk%20pesanan%20berikut%20ini%3A%0A%0A` +
      `*Detail%20Pembeli*%0A` +
      `- Nama: ${encodeURIComponent(buyerName || 'Pelanggan Lowspeed')}%0A` +
      `- Catatan: ${encodeURIComponent(buyerNotes || 'Tidak ada')}%0A%0A` +
      `*Rincian%20Pesanan*%0A${itemsText}%0A%0A` +
      `*Total%20Bayar%3A%20${encodeURIComponent(formatCurrency(totalAmount))}*%0A%0A` +
      `Berikut%20saya%20lampirkan%20tangkapan%20layar%20%28screenshot%29%20bukti%20transfernya.%20Terima%20kasih%20%21`;
    
    // Add text parameter to waLink
    if (waLink.includes('?')) {
      return `${waLink}&text=${text}`;
    } else {
      return `${waLink}?text=${text}`;
    }
  };

  const handleFinishCheckout = () => {
    if (!buyerName.trim()) {
      alert('Silakan isi Akun Discord Anda terlebih dahulu!');
      return;
    }
    
    const newOrder: Order = {
      id: orderId,
      buyerName: buyerName.trim(),
      buyerPhone: '',
      buyerNotes: buyerNotes.trim(),
      items: [...cartItems],
      totalAmount,
      status: 'Menunggu',
      createdAt: Date.now(),
    };
    
    onCreateOrder(newOrder);
    setOrderSubmitted(true);
  };

  const handleReturnToHome = () => {
    onClearCart();
    // Refresh page / back to katalog
    window.location.reload();
  };

  return (
    <div id="checkout-root" className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-white">
      {/* Specular light highlight */}
      <div className="absolute top-[1px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Back to Catalog link */}
      {!orderSubmitted && (
        <button
          onClick={onBackToCart}
          className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-405 text-slate-300 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Kembali ke Keranjang
        </button>
      )}

      {!orderSubmitted ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDE: Order Summary & Customer Forms */}
          <div className="flex-1 space-y-6">
            {/* Form data buyer */}
            <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-950/40 border border-white/10 shadow-xl relative">
              <div className="absolute top-[1px] left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5" /> Konfirmasi Data
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                    Akun Discord *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: @xeeira"
                    className="w-full px-4 py-3 text-sm bg-black/40 border border-white/10 rounded-2xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                    Tanggal & Bulan Pembelian
                  </label>
                  <textarea
                    rows={3}
                    value={buyerNotes}
                    onChange={(e) => setBuyerNotes(e.target.value)}
                    placeholder="Contoh: 6 Juni"
                    className="w-full px-4 py-3 text-sm bg-black/40 border border-white/10 rounded-2xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Order Items Table recap */}
            <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-950/40 border border-white/10 shadow-xl">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 mb-4 pb-1.5 border-b border-white/10">
                Item Pembelian ({totalItems} Pcs)
              </h3>
              <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-2 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="pt-3 flex gap-3 text-xs items-center justify-between">
                    <div className="flex gap-2.5 items-center">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0 border border-white/5"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-white max-w-[180px] sm:max-w-sm truncate">
                          {item.product.name}
                        </div>
                        <span className="text-[9px] text-slate-400">
                          {item.quantity}x @ {formatCurrency(item.product.price)}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-300">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Dedicated QRIS Block payment mechanism */}
          <div className="w-full lg:w-[350px] space-y-6">
            <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-950/60 border border-cyan-500/20 shadow-2xl relative flex flex-col items-center justify-center text-center">
              {/* Outer floating glow */}
              <div className="absolute -inset-1 bg-cyan-500/5 blur-xl -z-10 rounded-full" />
              <div className="absolute top-[1px] left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

              <div className="flex justify-between items-center w-full pb-3 border-b border-white/10 mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">E-Payment Merchant</span>
                <span className="font-bold text-emerald-400 text-xs flex items-center gap-1">
                  ● QRIS Realtime
                </span>
              </div>

              {/* QRIS BRAND HEADER */}
              <div className="w-full flex items-center justify-center mb-4 bg-slate-950/50 py-1.5 px-4 rounded-xl border border-white/5 text-slate-100 font-black text-sm">
                <QrCode className="w-4 h-4 mr-1.5 text-orange-400" />
                <span className="tracking-widest">QRIS</span>
                <span className="text-[8px] font-normal text-slate-400 ml-1.5">GPN INDONESIA</span>
              </div>

              {/* QR MATRIX GRAPHIC INLINE SVG */}
              <div className="p-2 bg-white rounded-2xl shadow-xl border border-white/10 aspect-square w-52 flex items-center justify-center relative group overflow-hidden">
                <img
                  src={xeiraQris}
                  alt="Xeira Store QRIS"
                  className="w-full h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
                {/* Floating zoom hint on hover */}
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-100 font-bold tracking-wider leading-relaxed text-center">
                    SCAN DENGAN APLIKASI BANK ATAU E-WALLET KAMU
                  </span>
                </div>
              </div>

              {/* DOWNLOAD QR BUTTON */}
              <a
                href={xeiraQris}
                download="Xeira_Store_QRIS.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 text-[10.5px] font-black tracking-widest uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all outline-none border-none shadow-md shadow-cyan-500/15 cursor-pointer w-full max-w-[208px] active:scale-95 text-center no-underline"
              >
                <Download className="w-3.5 h-3.5 text-slate-950 stroke-[3px]" /> Buka Qris Di Website
              </a>

              <div className="mt-4 text-center">
                <span className="text-[10.5px] font-semibold text-slate-450 block">NAMA MERC.:</span>
                <span className="text-sm font-extrabold text-cyan-300 block uppercase font-sans tracking-wide">
                  Xeira Store.
                </span>
                <span className="text-xs text-slate-400 block mt-1">NMID: ID1025404011310</span>
              </div>

              <div className="w-full h-px bg-white/10 my-4" />

              {/* Outstanding payment amount displays */}
              <div className="w-full">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">JUMLAH TRANSFER (PAS)</div>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight mt-1 mb-1">
                  {formatCurrency(totalAmount)}
                </div>
                <span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 py-1 px-2.5 rounded-lg border border-amber-400/20 inline-block font-semibold">
                  Selesaikan dalam 30:00 menit
                </span>
              </div>
            </div>

            {/* Instruction block */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-xs text-slate-350 space-y-3 leading-relaxed">
              <span className="font-extrabold uppercase text-cyan-300 tracking-widest block text-[10px]">
                Instruksi Melakukan  Pembayaran:
              </span>
              <ol className="list-decimal pl-4 space-y-2 text-slate-300">
                <li>Buka aplikasi bank (BCA, Mandiri, BRI, Dll) atau e-wallet (Gopay, OVO, Dana, Dll).</li>
                <li>Pilih menu Scan QRIS lalu arahkan kameramu ke kode QR di atas (atau klik tombol "Buka Qris Di Website" Lalu di screenshot).</li>
                <li>Pastikan nominal transfer sama persis dengan angka di atas: **{formatCurrency(totalAmount)}**.</li>
                <li>Setelah transfer berhasil, wajib screenshot bukti pembayaran untuk mengirimkan bukti.</li>
                <li>Isi Formulir Data Yang Telah Disediakan, lalu klik tombol "Konfirmasi & Kirim Bukti" di bawah.</li>
              </ol>
            </div>

            {/* MAIN GLOWING CHECKOUT TRIGGER */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinishCheckout}
              className="w-full py-4 rounded-3xl font-extrabold text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/10 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" /> Konfirmasi & Kirim Bukti
            </motion.button>
          </div>
        </div>
      ) : (
        /* SCREEN 2: SUCCESS ORDER SUBMISSION & WHATSAPP DISPATCH GATEWAY */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto p-8 rounded-3xl backdrop-blur-2xl bg-slate-900/45 border border-white/20 shadow-2xl text-center space-y-6 relative"
        >
          {/* Specular inner highlight */}
          <div className="absolute top-[1px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

          {/* Success circle green pulse */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10 animate-bounce">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wider font-sans">
              PESANAN DIPROSES!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-400 font-bold tracking-wide uppercase">
              Lowspeed Order Ref ID: {orderId}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs sm:text-sm space-y-4">
            <div className="border-b border-white/10 pb-2 flex justify-between font-bold">
              <span className="text-slate-300">Total Tagihan:</span>
              <span className="text-cyan-305 text-cyan-300 font-mono">{formatCurrency(totalAmount)}</span>
            </div>

            <div className="space-y-1.5 leading-relaxed text-slate-350 text-xs">
              <p>
                Halo <b className="text-white">{buyerName}</b>, sabar yaa pesanan anda sedang kami proses.
              </p>
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 font-semibold italic text-justify text-[11px] mt-2">
                "Setelah melakukan pembayaran, silakan masuk server melalui link dibawah, lalu kirimkan bukti pembayaran melalui open ticket atau bisa dm langsung ke admin!"
              </div>
            </div>
          </div>

          {/* REDIRECT ACTION BUTTONS FOR THE TRANSFER */}
          <div className="space-y-3 pt-2">
            <motion.a
              href={constructMessageForWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-black text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-lg shadow-emerald-900/30 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 text-white fill-green-600" /> Kirim Bukti Disini <ExternalLink className="w-4 h-4" />
            </motion.a>

            <button
              onClick={handleReturnToHome}
              className="w-full py-3.5 rounded-2xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Kembali ke Beranda Katalog
            </button>
          </div>

          <div className="pt-2 text-[10px] text-slate-550 text-slate-505 flex items-center justify-center gap-1">
            <HeartHandshake className="w-4.5 h-4.5 text-red-500" /> Terima kasih telah berbelanja dan percaya kepada kami ~Lowspeed.
          </div>
        </motion.div>
      )}
    </div>
  );
}
