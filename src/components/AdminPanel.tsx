/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, LayoutDashboard, LogOut, Plus, Trash2, CheckCircle, Edit, ListFilter,
  Package, DollarSign, TextQuote, Layers, Image, FolderPlus, Eye, ShoppingCart, KeyRound, AlertTriangle,
  Calendar, XCircle, Check, User
} from 'lucide-react';
import { Product, Category, Order } from '../types';
import { formatCurrency } from './ProductCard';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onLogoutAdmin: () => void;
  onCloseAdmin: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan') => void;
  onDeleteOrder: (orderId: string) => void;
}

export default function AdminPanel({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onLogoutAdmin,
  onCloseAdmin,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder
}: AdminPanelProps) {
  // Login auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard views: 'list' | 'add' | 'edit' | 'orders'
  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'orders'>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null);
  const [orderFilter, setOrderFilter] = useState<'Semua' | 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan'>('Semua');

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Motor');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDescription, setFormDescription] = useState('');
  const [formStock, setFormStock] = useState<number>(0);
  const [formImages, setFormImages] = useState<string[]>(['']); // Dynamic list of image URLs

  // Success notifications
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'jomil' && password === 'jomilkeren') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('ID Pengguna atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    onLogoutAdmin();
  };

  // Form URL Manipulation helpers
  const handleAddImageUrlField = () => {
    setFormImages((prev) => [...prev, '']);
  };

  const handleRemoveImageUrlField = (index: number) => {
    if (formImages.length > 1) {
      setFormImages((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      setFormImages(['']);
    }
  };

  const handleImageUrlChange = (index: number, val: string) => {
    setFormImages((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  // Form submission: handles both creation and edit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPrice <= 0 || formStock < 0) {
      triggerToast('Mohon isi semua data formulir dengan angka/teks yang benar!');
      return;
    }

    // Clean empty image links before saving
    const cleanedImages = formImages
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
    
    const finalImages = cleanedImages.length > 0 
      ? cleanedImages 
      : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600']; // default fallback

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDescription,
        stock: Number(formStock),
        images: finalImages
      };
      onUpdateProduct(updated);
      triggerToast('Berhasil mengedit produk!');
    } else {
      const createNew: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDescription,
        stock: Number(formStock),
        images: finalImages,
        createdAt: Date.now()
      };
      onAddProduct(createNew);
      triggerToast('Berhasil memasukkan produk baru ke katalog!');
    }

    // Reset Form state
    resetForm();
    setActiveTab('list');
  };

  const resetForm = () => {
    setFormName('');
    setFormCategory('Motor');
    setFormPrice(0);
    setFormDescription('');
    setFormStock(0);
    setFormImages(['']);
    setEditingProduct(null);
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormDescription(p.description);
    setFormStock(p.stock);
    setFormImages(p.images && p.images.length > 0 ? p.images : ['']);
    setActiveTab('form');
  };

  const performDeleteProduct = (id: string, name: string) => {
    setProductToDelete({ id, name });
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      triggerToast('Produk berhasil dihapus!');
      setProductToDelete(null);
    }
  };

  // Inline Quick Stock update from table view
  const adjustStockInline = (productId: string, currentStock: number, delta: number) => {
    const matched = products.find((p) => p.id === productId);
    if (matched) {
      const newStock = Math.max(0, currentStock + delta);
      const updated: Product = {
        ...matched,
        stock: newStock
      };
      onUpdateProduct(updated);
      triggerToast(`Stok "${matched.name}" berhasil diupdate menjadi ${newStock} Pcs!`);
    }
  };

  return (
    <div id="admin-panel-container" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-white relative">
      {/* Absolute floating toast overlay */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl flex items-center gap-2 border border-cyan-300/30"
          >
            <CheckCircle className="w-5 h-5 text-slate-950 fill-white" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {!isAuthenticated ? (
        /* SCREEN 1: LIQUID GLASS LOGIN PANEL */
        <div id="admin-login-screen" className="min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl bg-slate-950/40 border border-white/10 shadow-2xl space-y-6 relative"
          >
            {/* Specular glass reflection */}
            <div className="absolute top-[1px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/15">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-extrabold tracking-widest uppercase text-white font-sans mt-3">
                ADMIN LOGIN GATEWAY
              </h2>
              <p className="text-xs text-slate-400">
                Admin restricted area.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                  ID Pengguna (Username)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-550">
                    <KeyRound className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Example:  Admin"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-black/40 border border-white/10 rounded-2xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                  Kata Sandi (Password)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-550">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sandi keamanan"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-black/40 border border-white/10 rounded-2xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/20 text-red-300 text-xs text-center font-bold">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                MASUK KE DASHBOARD
              </button>
            </form>

            <button
              onClick={onCloseAdmin}
              className="w-full py-2.5 text-xs font-semibold text-slate-350 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all cursor-pointer"
            >
              Kembali ke Katalog
            </button>
          </motion.div>
        </div>
      ) : (
        /* SCREEN 2: ADMIN CONTROL PANEL DASHBOARD (FULLY LOGGED IN) */
        <div id="admin-dashboard-screen" className="flex flex-col lg:flex-row gap-8">
          
          {/* NAVIGATION SIDEBAR */}
          <div className="w-full lg:w-64 shrink-0 space-y-4">
            <div className="p-5 rounded-3xl backdrop-blur-2xl bg-slate-950/40 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs uppercase">
                  AD
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-450 text-slate-405 block">Role Pengguna</span>
                  <span className="text-sm font-black text-white">LOWSPEED ADMIN</span>
                </div>
              </div>

              <div className="h-px bg-white/15 my-1" />

              {/* TAB BUTTONS */}
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setActiveTab('list');
                    resetForm();
                  }}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold tracking-wider uppercase text-left flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'list'
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5" /> Daftar Produk
                </button>

                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('form');
                  }}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold tracking-wider uppercase text-left flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'form' && !editingProduct
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Plus className="w-4.5 h-4.5" /> Tambah Produk
                </button>

                <button
                  onClick={() => {
                    setActiveTab('orders');
                  }}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold tracking-wider uppercase text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4.5 h-4.5" />
                    <span>History Pembelian</span>
                  </div>
                  {orders && orders.filter(o => o.status === 'Menunggu').length > 0 && (
                    <span className="shrink-0 bg-red-500 text-white rounded-full text-[9px] w-5 h-5 flex items-center justify-center font-bold font-mono">
                      {orders.filter(o => o.status === 'Menunggu').length}
                    </span>
                  )}
                </button>
              </div>

              <div className="h-px bg-white/15 my-1" />

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 rounded-2xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/30 text-left flex items-center gap-3 transition-all cursor-pointer"
              >
                <LogOut className="w-4.5 h-4.5" /> Logout Admin
              </button>
            </div>

            <button
              onClick={onCloseAdmin}
              className="w-full py-3 bg-white/5 hover:bg-white/10 active:scale-95 text-xs text-slate-300 hover:text-white rounded-2xl text-center font-bold tracking-wider border border-white/10 cursor-pointer block"
            >
              Kembali ke Toko Utama
            </button>
          </div>

          {/* MAIN AREA */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'list' && (
                /* SUBVIEW A: DENSE PRODUCT TABLE */
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center bg-slate-950/30 p-5 rounded-3xl border border-white/5 backdrop-blur-md">
                    <div>
                      <h2 className="text-lg font-black tracking-widest text-white uppercase font-sans">
                        Katalog Produk Jual ({products.length})
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Manajemen internal stok, nama barang mewah, rentang harga, dan link media visual.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        resetForm();
                        setActiveTab('form');
                      }}
                      className="px-4.5 py-2.5 rounded-2xl text-xs font-black tracking-widest uppercase bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 flex items-center gap-2 cursor-pointer border border-cyan-400/20 active:scale-95 transition-all"
                    >
                      <Plus className="w-4.5 h-4.5" /> Tambah Baru
                    </button>
                  </div>

                  {/* Desktop view Table */}
                  <div className="rounded-3xl backdrop-blur-2xl bg-slate-950/40 border border-white/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/10 bg-slate-950/60 uppercase font-mono tracking-widest text-[9px] text-slate-400">
                            <th className="px-5 py-4 font-extrabold">Produk</th>
                            <th className="px-5 py-4 font-extrabold">Kategori</th>
                            <th className="px-5 py-4 font-extrabold">Harga Satuan</th>
                            <th className="px-5 py-4 font-extrabold text-center">Kelola Stok (Quick)</th>
                            <th className="px-5 py-4 font-extrabold text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {products.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-5 py-12 text-center text-slate-450 text-slate-400">
                                Belum ada data produk di database lokal. Klik Tambah Produk untuk mendaftarkan barang.
                              </td>
                            </tr>
                          ) : (
                            products.map((p) => (
                              <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                                {/* Product name of thumbnail & details */}
                                <td className="px-5 py-3.5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-white/5">
                                      <img
                                        src={p.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600'}
                                        alt={p.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                    <div>
                                      <span className="font-extrabold text-white text-[12.5px] line-clamp-1 max-w-[200px] sm:max-w-xs uppercase">
                                        {p.name}
                                      </span>
                                      <span className="text-[9.5px] font-mono text-slate-400 block mt-0.5">
                                        ID: {p.id}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                {/* Category chip */}
                                <td className="px-5 py-3.5">
                                  <span className="px-2.5 py-0.5 border border-white/10 bg-white/5 text-[10px] font-bold rounded-lg uppercase text-cyan-300">
                                    {p.category}
                                  </span>
                                </td>

                                {/* Price tag */}
                                <td className="px-5 py-3.5">
                                  <span className="font-bold text-white font-mono text-[13px]">
                                    {formatCurrency(p.price)}
                                  </span>
                                </td>

                                {/* Quick Stock incrementors */}
                                <td className="px-5 py-3.5 text-center">
                                  <div className="inline-flex items-center bg-black/40 border border-white/10 rounded-xl px-1.5 py-1 select-none">
                                    <button
                                      onClick={() => adjustStockInline(p.id, p.stock, -1)}
                                      className="w-5.5 h-5.5 rounded bg-white/5 hover:bg-white/10 active:scale-90 flex items-center justify-center font-bold"
                                    >
                                      -
                                    </button>
                                    <span className={`w-10 text-center font-bold font-mono text-xs ${p.stock <= 0 ? 'text-red-405 text-red-400' : 'text-slate-100'}`}>
                                      {p.stock}
                                    </span>
                                    <button
                                      onClick={() => adjustStockInline(p.id, p.stock, 1)}
                                      className="w-5.5 h-5.5 rounded bg-white/5 hover:bg-white/10 active:scale-90 flex items-center justify-center font-bold"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>

                                {/* Actions buttons */}
                                <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                                  <button
                                    onClick={() => startEditProduct(p)}
                                    className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/10 cursor-pointer inline-flex items-center gap-1 text-[11px] font-bold"
                                  >
                                    <Edit className="w-3.5 h-3.5" /> Edit
                                  </button>

                                  <button
                                    onClick={() => performDeleteProduct(p.id, p.name)}
                                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/10 cursor-pointer inline-flex items-center gap-1 text-[11px] font-bold"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'form' && (
                /* SUBVIEW B: FORM FOR CREATION OR EDITING */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-slate-950/45 border border-white/10 shadow-2xl space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-black tracking-widest text-white uppercase font-sans">
                      {editingProduct ? 'EDIT PRODUK SEKARANG' : 'TAMBAH PRODUK BARU'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {editingProduct ? 'Modifikasi detail produk premium existing Anda kemudian klik simpan.' : 'Masukkan parameter visual & data kendaraan mewah ke database.'}
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1">
                          <Package className="w-3.5 h-3.5 text-cyan-400" /> Nama Produk (Unit/Part/Jasa) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Misal: Kawasaki H2R Carbon Edition"
                          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500 text-sm"
                        />
                      </div>

                      {/* Dropdown Category */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" /> Kategori Produk *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as Category)}
                          className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500 text-sm"
                        >
                          <option value="Motor">Motor</option>
                          <option value="Mobil">Mobil</option>
                          <option value="Part Motor">Part Motor</option>
                          <option value="Part Mobil">Part Mobil</option>
                          <option value="Jasa">Jasa</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      {/* Price input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-cyan-400" /> Harga Satuan (Rupiah) *
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={formPrice === 0 ? '' : formPrice}
                          onChange={(e) => setFormPrice(Number(e.target.value))}
                          placeholder="Nominal rupiah, misal: 145000000"
                          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500 text-sm font-mono"
                        />
                      </div>

                      {/* Stock input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1">
                          <Package className="w-3.5 h-3.5 text-cyan-400" /> Jumlah Stok Awal *
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={formStock}
                          onChange={(e) => setFormStock(Number(e.target.value))}
                          placeholder="Contoh: 15"
                          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500 text-sm font-mono"
                        />
                      </div>
                    </div>

                    {/* Description textarea */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1">
                        <TextQuote className="w-3.5 h-3.5 text-cyan-400" /> Deskripsi dan Spesifikasi Lengkap *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Detail spesifikasi mesin, part original, kondisi, bahan baku, kelengkapan surat..."
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500 text-sm resize-none"
                      />
                    </div>

                    {/* DYNAMIC IMAGE URL FIELDS ROW LIST */}
                    <div className="space-y-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-300 flex items-center gap-1.5">
                          <Image className="w-3.5 h-3.5 text-cyan-400" /> Link Media Gambar ({formImages.length})
                        </label>
                        <button
                          type="button"
                          onClick={handleAddImageUrlField}
                          className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/20 text-cyan-300 font-extrabold text-[10px] tracking-wider uppercase rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Tambah Kolom URL
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Masukkan tautan foto (Unsplash/Imgur dll). Admin dapat menambahkan baris URL gambar secara tak terbatas untuk galeri detail produk karosel.
                      </p>

                      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                        {formImages.map((imgUrl, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <span className="text-[10px] font-mono text-slate-500 w-5">#{idx + 1}</span>
                            <input
                              type="url"
                              value={imgUrl}
                              onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                              placeholder="Fasilitasi https://images.unsplash.com/..."
                              className="flex-1 px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 text-xs font-mono text-cyan-200"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImageUrlField(idx)}
                              className="p-2.5 rounded-xl bg-red-550/15 text-red-400 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setActiveTab('list');
                        }}
                        className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        Batal
                      </button>

                      <button
                        type="submit"
                        className="px-7 py-3 rounded-2xl text-xs font-black tracking-widest uppercase bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold active:scale-95 transition-all cursor-pointer shadow-lg"
                      >
                        {editingProduct ? 'Simpan Edit' : 'Simpan Barang Baru'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                /* SUBVIEW C: PURCHASE ORDERS HISTORY WITH CONFIRMATIONS */
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {/* HEADER CONTENT */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/30 p-5 rounded-3xl border border-white/5 backdrop-blur-md">
                    <div>
                      <h2 className="text-lg font-black tracking-widest text-white uppercase font-sans">
                        History Pembelian ({orders.length})
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Data pemesanan, verifikasi dana transfer buyer, dan konfirmasi pengiriman pesanan Lowspeed.
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {(['Semua', 'Menunggu', 'Dikonfirmasi', 'Dibatalkan'] as const).map((status) => {
                        const count = status === 'Semua' ? orders.length : orders.filter(o => o.status === status).length;
                        return (
                          <button
                            key={status}
                            onClick={() => setOrderFilter(status)}
                            className={`px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                              orderFilter === status
                                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/10'
                                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {status} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* QUICK INCOME STATS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Total Akumulasi Omset</span>
                      <div className="text-xl font-black text-emerald-400 font-mono">
                        {formatCurrency(
                          orders.filter(o => o.status === 'Dikonfirmasi').reduce((sum, o) => sum + o.totalAmount, 0)
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 block">Dihitung dari pesanan berstatus Dikonfirmasi</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Transaksi Pending</span>
                      <div className="text-xl font-black text-amber-500 font-mono">
                        {orders.filter(o => o.status === 'Menunggu').length} Pesanan
                      </div>
                      <span className="text-[9px] text-slate-500 block">Perlu verifikasi pembayaran / data segera</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Rasio Sukses</span>
                      <div className="text-xl font-black text-cyan-400 font-mono">
                        {orders.length === 0 ? '0%' : `${Math.round((orders.filter(o => o.status === 'Dikonfirmasi').length / orders.length) * 100)}%`}
                      </div>
                      <span className="text-[9px] text-slate-500 block">Persentase sukses penyelesaian pesanan</span>
                    </div>
                  </div>

                  {/* TRANSACTIONS CONTAINER */}
                  <div className="space-y-4">
                    {orders.filter(o => orderFilter === 'Semua' || o.status === orderFilter).length === 0 ? (
                      <div className="p-12 text-center rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 max-w-xl mx-auto space-y-4">
                        <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
                        <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
                          Tidak Ada Transaksi ditemukan
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                          Daftar dengan filter "{orderFilter}" kosong. Lakukan simulasi checkout di katalog utama untuk merekam aktivitas pembelian baru.
                        </p>
                      </div>
                    ) : (
                      orders
                        .filter(o => orderFilter === 'Semua' || o.status === orderFilter)
                        .map((order) => {
                          const orderDate = new Date(order.createdAt).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          });

                          return (
                            <div
                              key={order.id}
                              className="relative p-5 rounded-3xl bg-slate-900/60 border border-white/10 shadow-xl space-y-5 overflow-hidden group"
                            >
                              {/* Specular premium top line glow */}
                              <div className="absolute top-[1px] left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                              {/* Main Order Header Block */}
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-3.5">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black tracking-wider uppercase text-white font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                                      {order.id}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-450 text-slate-400">
                                      {orderDate} WIB
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* Status Badges with custom glass styles */}
                                  <span
                                    className={`px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-lg border ${
                                      order.status === 'Menunggu'
                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-sm shadow-amber-500/5'
                                        : order.status === 'Dikonfirmasi'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/5'
                                        : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-sm shadow-red-500/5'
                                    }`}
                                  >
                                    ● {order.status}
                                  </span>
                                </div>
                              </div>

                              {/* Buyer details and Items details Grid */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Column 1: Customer Profile Details */}
                                <div className="lg:col-span-5 space-y-3.5 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                                  <div className="text-[10px] uppercase font-mono tracking-widest text-slate-450 text-slate-400 flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                                    <User className="w-3.5 h-3.5 text-cyan-400" /> Profil Akun Buyer (Discord)
                                  </div>

                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-baseline">
                                      <span className="text-slate-400">Akun Discord:</span>
                                      <span className="font-extrabold text-white uppercase tracking-wider">{order.buyerName}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                      <span className="text-slate-400">Nick Discord:</span>
                                      <span className="font-semibold text-slate-300">{order.buyerPhone || '- (Kosong)'}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                      <span className="text-slate-400">Tanggal & Bulan:</span>
                                      <span className="font-semibold text-cyan-300 italic">{order.buyerNotes || '-'}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column 2: Purchased items list */}
                                <div className="lg:col-span-7 space-y-2">
                                  <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 flex items-center gap-1.5">
                                    <Package className="w-3.5 h-3.5 text-cyan-400" /> Daftar Unit & Part yang Dibeli
                                  </div>

                                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {order.items.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-9 h-9 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-white/5">
                                            <img
                                              src={item.product.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600'}
                                              alt={item.product.name}
                                              className="w-full h-full object-cover"
                                              referrerPolicy="no-referrer"
                                            />
                                          </div>
                                          <div>
                                            <span className="block text-xs font-extrabold text-slate-150 uppercase text-slate-200 line-clamp-1 max-w-[180px] sm:max-w-xs">
                                              {item.product.name}
                                            </span>
                                            <span className="block text-[10px] font-mono text-slate-400">
                                              {formatCurrency(item.product.price)} x {item.quantity}
                                            </span>
                                          </div>
                                        </div>

                                        <span className="text-xs font-bold text-white font-mono shrink-0">
                                          {formatCurrency(item.product.price * item.quantity)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Footer content with summary and action controllers */}
                              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-950/20 p-4 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3.5 text-center sm:text-left self-stretch sm:self-auto justify-between sm:justify-start">
                                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-405 text-slate-400">Total Pembayaran:</span>
                                  <span className="text-base font-black text-cyan-300 font-mono">
                                    {formatCurrency(order.totalAmount)}
                                  </span>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto justify-end">
                                  {order.status === 'Menunggu' && (
                                    <>
                                      <button
                                        onClick={() => {
                                          onUpdateOrderStatus(order.id, 'Dikonfirmasi');
                                          triggerToast(`Pemesanan ${order.id} berhasil Dikonfirmasi!`);
                                        }}
                                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-[10.5px] font-bold tracking-wider uppercase text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                      >
                                        <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3px]" /> Konfirmasi
                                      </button>
                                      <button
                                        onClick={() => {
                                          onUpdateOrderStatus(order.id, 'Dibatalkan');
                                          triggerToast(`Pemesanan ${order.id} dibatalkan.`);
                                        }}
                                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-[10.5px] font-bold tracking-wider uppercase text-slate-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                      >
                                        <XCircle className="w-3.5 h-3.5" /> Tolak
                                      </button>
                                    </>
                                  )}

                                  <button
                                    onClick={() => {
                                      onDeleteOrder(order.id);
                                      triggerToast(`Riwayat order ${order.id} berhasil terhapus.`);
                                    }}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-slate-405 text-slate-400 hover:text-red-400 hover:text-red-300 transition-all cursor-pointer flex items-center justify-center"
                                    title="Hapus Dari History"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION DIALOG MODAL */}
      <AnimatePresence>
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProductToDelete(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 overflow-hidden z-10"
            >
              {/* Top glass glow highlighting */}
              <div className="absolute top-[1px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div className="flex items-center gap-3 text-red-400">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest font-sans">Konfirmasi Hapus</h3>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Apakah Anda yakin ingin menghapus produk <span className="font-extrabold text-white">"{productToDelete.name}"</span> dari katalog Lowspeed?
                </p>
                <p className="text-[10px] font-mono text-red-400 bg-red-950/20 py-2.5 px-3 rounded-xl border border-red-500/10 leading-normal">
                  Tindakan ini bersifat permanen dan tidak bisa dibatalkan dari database lokal.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className="px-4.5 py-3 rounded-2xl text-[11px] font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteProduct}
                  className="px-4.5 py-3 rounded-2xl text-[11px] font-black tracking-widest uppercase bg-red-650 hover:bg-red-500 text-white active:scale-95 transition-all cursor-pointer shadow-lg shadow-red-900/10"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
