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

  // Dashboard views: 'list' | 'form' | 'orders'
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

  /* NEO BRUTALISM */
  return (
    <div id="admin-panel-container" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black relative">
      {/* Absolute floating toast overlay */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-none bg-[#00FF85] text-black font-black text-xs sm:text-sm tracking-wider uppercase shadow-[4px_4px_0px_#000000] border-3 border-black flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-black stroke-[3px]" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {!isAuthenticated ? (
        /* SCREEN 1: NEO BRUTALISM LOGIN GATEWAY (NO TIPS/HINTS) */
        <div id="admin-login-screen" className="min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000000] rounded-none space-y-6 relative text-black"
          >
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#FFE500] border-3 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000000]">
                <Lock className="w-7 h-7 text-black stroke-[2.5px]" />
              </div>
              <h2 className="text-xl font-black tracking-tight uppercase text-black font-sans mt-3">
                ADMIN LOGIN GATEWAY
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-black text-black mb-1.5">
                  ID Pengguna (Username)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
                    <KeyRound className="w-4 h-4 text-black stroke-[2.5px]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan ID Pengguna"
                    className="w-full pl-10 pr-4 py-3.5 text-sm bg-white border-3 border-black rounded-none text-black placeholder-gray-500 focus:outline-none focus:bg-[#FFE500]/10 transition-colors font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-black text-black mb-1.5">
                  Kata Sandi (Password)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
                    <Lock className="w-4 h-4 text-black stroke-[2.5px]" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Kata Sandi"
                    className="w-full pl-10 pr-4 py-3.5 text-sm bg-white border-3 border-black rounded-none text-black placeholder-gray-500 focus:outline-none focus:bg-[#FFE500]/10 transition-colors font-bold"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-none bg-[#FF6B6B] border-2 border-black text-black text-xs text-center font-black uppercase">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#FFE500] hover:bg-[#FFE500]/90 text-black font-black tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer rounded-none text-xs sm:text-sm"
              >
                MASUK KE DASHBOARD
              </button>
            </form>

            <button
              onClick={onCloseAdmin}
              className="w-full py-3 text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer rounded-none"
            >
              Kembali ke Katalog
            </button>
          </motion.div>
        </div>
      ) : (
        /* SCREEN 2: ADMIN DASHBOARD */
        <div id="admin-dashboard-screen" className="flex flex-col lg:flex-row gap-8">
          
          {/* NAVIGATION SIDEBAR */}
          <div className="w-full lg:w-64 shrink-0 space-y-4">
            <div className="p-5 bg-white border-3 border-black shadow-[6px_6px_0px_#000000] space-y-4 rounded-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00FF85] border-2 border-black flex items-center justify-center text-black font-black text-sm uppercase">
                  AD
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-black font-black block leading-none">Role Pengguna</span>
                  <span className="text-sm font-black text-black">LOWSPEED ADMIN</span>
                </div>
              </div>

              <div className="h-px bg-black my-2" />

              {/* TAB BUTTONS */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('list');
                    resetForm();
                  }}
                  className={`w-full px-4 py-3 rounded-none text-xs font-black tracking-wider uppercase text-left flex items-center gap-3 transition-all cursor-pointer border-2 ${
                    activeTab === 'list'
                      ? 'bg-[#FFE500] text-black border-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-white text-black border-gray-400 hover:border-black'
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5 stroke-[2.5px]" /> Daftar Produk
                </button>

                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('form');
                  }}
                  className={`w-full px-4 py-3 rounded-none text-xs font-black tracking-wider uppercase text-left flex items-center gap-3 transition-all cursor-pointer border-2 ${
                    activeTab === 'form' && !editingProduct
                      ? 'bg-[#FFE500] text-black border-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-white text-black border-gray-400 hover:border-black'
                  }`}
                >
                  <Plus className="w-4.5 h-4.5 stroke-[2.5px]" /> Tambah Produk
                </button>

                <button
                  onClick={() => {
                    setActiveTab('orders');
                  }}
                  className={`w-full px-4 py-3 rounded-none text-xs font-black tracking-wider uppercase text-left flex items-center justify-between gap-3 transition-all cursor-pointer border-2 ${
                    activeTab === 'orders'
                      ? 'bg-[#FFE500] text-black border-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-white text-black border-gray-400 hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4.5 h-4.5 stroke-[2.5px]" />
                    <span>History Pembelian</span>
                  </div>
                  {orders && orders.filter(o => o.status === 'Menunggu').length > 0 && (
                    <span className="shrink-0 bg-[#FF6B6B] text-black border border-black text-[10px] w-5 h-5 flex items-center justify-center font-black">
                      {orders.filter(o => o.status === 'Menunggu').length}
                    </span>
                  )}
                </button>
              </div>

              <div className="h-px bg-black my-2" />

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 rounded-none text-xs font-black text-black bg-[#FF6B6B]/20 hover:bg-[#FF6B6B] border-2 border-black text-left flex items-center gap-3 transition-all cursor-pointer"
              >
                <LogOut className="w-4.5 h-4.5 stroke-[2.5px]" /> Logout Admin
              </button>
            </div>

            <button
              onClick={onCloseAdmin}
              className="w-full py-3 bg-white hover:bg-[#FFE500] text-xs text-black rounded-none text-center font-black tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer block"
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border-3 border-black shadow-[6px_6px_0px_#000000] rounded-none">
                    <div>
                      <h2 className="text-lg font-black tracking-tight text-black uppercase font-sans">
                        Katalog Produk Jual ({products.length})
                      </h2>
                      <p className="text-xs text-black/75 mt-0.5 leading-relaxed font-bold">
                        Manajemen internal stok, nama barang mewah, rentang harga, dan link media visual.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        resetForm();
                        setActiveTab('form');
                      }}
                      className="px-5 py-3 rounded-none text-xs font-black tracking-widest uppercase bg-[#00FF85] text-black flex items-center gap-2 cursor-pointer border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      <Plus className="w-4.5 h-4.5 stroke-[3px]" /> Tambah Baru
                    </button>
                  </div>

                  {/* Desktop view Table */}
                  <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#000000] rounded-none overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b-3 border-black bg-[#F5F5F5] uppercase font-mono tracking-wider text-[10px] text-black">
                            <th className="px-5 py-4 font-black border-r-2 border-black">Produk</th>
                            <th className="px-5 py-4 font-black border-r-2 border-black">Kategori</th>
                            <th className="px-5 py-4 font-black border-r-2 border-black">Harga Satuan</th>
                            <th className="px-5 py-4 font-black text-center border-r-2 border-black">Kelola Stok (Quick)</th>
                            <th className="px-5 py-4 font-black text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black">
                          {products.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-5 py-12 text-center text-black/60 font-bold">
                                Belum ada data produk di database lokal. Klik Tambah Produk untuk mendaftarkan barang.
                              </td>
                            </tr>
                          ) : (
                            products.map((p) => (
                              <tr key={p.id} className="hover:bg-[#F5F5F5] transition-colors group">
                                {/* Product name of thumbnail & details */}
                                <td className="px-5 py-3 border-r-2 border-black">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white overflow-hidden shrink-0 border-2 border-black rounded-none">
                                      <img
                                        src={p.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600'}
                                        alt={p.name}
                                        className="w-full h-full object-cover grayscale-0"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                    <div>
                                      <span className="font-black text-black text-[13px] line-clamp-1 max-w-[200px] sm:max-w-xs uppercase">
                                        {p.name}
                                      </span>
                                      <span className="text-[10px] font-mono font-black text-black/60 block mt-0.5">
                                        ID: {p.id}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                {/* Category chip */}
                                <td className="px-5 py-3 border-r-2 border-black">
                                  <span className="px-2.5 py-0.5 border-2 border-black bg-white text-[10px] font-black rounded-none uppercase text-black">
                                    {p.category}
                                  </span>
                                </td>

                                {/* Price tag */}
                                <td className="px-5 py-3 border-r-2 border-black">
                                  <span className="font-black text-black font-mono text-[13px] bg-[#FFE500] px-1.5 py-0.5 border border-black">
                                    {formatCurrency(p.price)}
                                  </span>
                                </td>

                                {/* Quick Stock incrementors */}
                                <td className="px-5 py-3 text-center border-r-2 border-black">
                                  <div className="inline-flex items-center bg-white border-2 border-black rounded-none px-1.5 py-1 select-none">
                                    <button
                                      onClick={() => adjustStockInline(p.id, p.stock, -1)}
                                      className="w-5.5 h-5.5 rounded-none bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 border border-black active:scale-90 flex items-center justify-center font-black cursor-pointer text-xs"
                                    >
                                      -
                                    </button>
                                    <span className={`w-10 text-center font-black font-mono text-xs text-black`}>
                                      {p.stock}
                                    </span>
                                    <button
                                      onClick={() => adjustStockInline(p.id, p.stock, 1)}
                                      className="w-5.5 h-5.5 rounded-none bg-[#00FF85] hover:bg-[#00FF85]/80 border border-black active:scale-90 flex items-center justify-center font-black cursor-pointer text-xs"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>

                                {/* Actions buttons */}
                                <td className="px-5 py-3 text-right space-x-1.5 whitespace-nowrap">
                                  <button
                                    onClick={() => startEditProduct(p)}
                                    className="px-3 py-1.5 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-1 text-[11px] font-black uppercase rounded-none"
                                  >
                                    <Edit className="w-3.5 h-3.5 stroke-[3px]" /> Edit
                                  </button>

                                  <button
                                    onClick={() => performDeleteProduct(p.id, p.name)}
                                    className="px-3 py-1.5 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-1 text-[11px] font-black uppercase rounded-none"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 stroke-[3px]" /> Hapus
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
                  className="p-6 md:p-8 bg-white border-3 border-black shadow-[6px_6px_0px_#000000] rounded-none space-y-6 text-black"
                >
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-black uppercase font-sans">
                      {editingProduct ? 'EDIT PRODUK SEKARANG' : 'TAMBAH PRODUK BARU'}
                    </h2>
                    <p className="text-xs text-black/75 font-bold mt-0.5">
                      {editingProduct ? 'Modifikasi detail produk premium existing Anda kemudian klik simpan.' : 'Masukkan parameter visual & data kendaraan mewah ke database.'}
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider font-black text-black flex items-center gap-1">
                          <Package className="w-4 h-4 text-black stroke-[2.5px]" /> Nama Produk (Unit/Part/Jasa) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Misal: Kawasaki H2R Carbon Edition"
                          className="w-full px-4 py-3 bg-white border-3 border-black rounded-none focus:outline-none focus:bg-[#FFE500]/10 text-sm font-bold text-black"
                        />
                      </div>

                      {/* Dropdown Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider font-black text-black flex items-center gap-1">
                          <Layers className="w-4 h-4 text-black stroke-[2.5px]" /> Kategori Produk *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as Category)}
                          className="w-full px-4 py-3 bg-white border-3 border-black rounded-none focus:outline-none focus:bg-[#FFE500]/10 text-sm font-bold text-black"
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
                        <label className="text-xs uppercase tracking-wider font-black text-black flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-black stroke-[2.5px]" /> Harga Satuan (Rupiah) *
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={formPrice === 0 ? '' : formPrice}
                          onChange={(e) => setFormPrice(Number(e.target.value))}
                          placeholder="Nominal rupiah, misal: 145000000"
                          className="w-full px-4 py-3 bg-white border-3 border-black rounded-none focus:outline-none focus:bg-[#FFE500]/10 text-sm font-mono font-bold text-black"
                        />
                      </div>

                      {/* Stock input */}
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider font-black text-black flex items-center gap-1">
                          <Package className="w-4 h-4 text-black stroke-[2.5px]" /> Jumlah Stok Awal *
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={formStock}
                          onChange={(e) => setFormStock(Number(e.target.value))}
                          placeholder="Contoh: 15"
                          className="w-full px-4 py-3 bg-white border-3 border-black rounded-none focus:outline-none focus:bg-[#FFE500]/10 text-sm font-mono font-bold text-black"
                        />
                      </div>
                    </div>

                    {/* Description textarea */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider font-black text-black flex items-center gap-1">
                        <TextQuote className="w-4 h-4 text-black stroke-[2.5px]" /> Deskripsi dan Spesifikasi Lengkap *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Detail spesifikasi mesin, part original, kondisi, bahan baku, kelengkapan surat..."
                        className="w-full px-4 py-3 bg-white border-3 border-black rounded-none focus:outline-none focus:bg-[#FFE500]/10 text-sm resize-none font-bold text-black"
                      />
                    </div>

                    {/* DYNAMIC IMAGE URL FIELDS ROW LIST */}
                    <div className="space-y-3.5 p-4 bg-[#F5F5F5] border-2 border-black rounded-none">
                      <div className="flex justify-between items-center">
                        <label className="text-xs uppercase tracking-wider font-black text-black flex items-center gap-1.5">
                          <Image className="w-4 h-4 text-black stroke-[2.5px]" /> Link Media Gambar ({formImages.length})
                        </label>
                        <button
                          type="button"
                          onClick={handleAddImageUrlField}
                          className="px-3 py-1 bg-[#FFE500] hover:bg-[#FFE500]/90 border-2 border-black text-black font-black text-[10px] tracking-wider uppercase rounded-none transition-all flex items-center gap-1 cursor-pointer shadow-[1.5px_1.5px_0px_#000000]"
                        >
                          <Plus className="w-3 h-3 stroke-[3px]" /> Tambah Kolom URL
                        </button>
                      </div>
                      <p className="text-[10px] text-black/70 leading-normal font-bold">
                        Masukkan tautan foto (Unsplash/Imgur dll). Admin dapat menambahkan baris URL gambar secara tak terbatas untuk galeri detail produk karosel.
                      </p>

                      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                        {formImages.map((imgUrl, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <span className="text-[10px] font-mono font-black text-black w-5">#{idx + 1}</span>
                            <input
                              type="url"
                              value={imgUrl}
                              onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                              placeholder="Fasilitasi https://images.unsplash.com/..."
                              className="flex-1 px-3.5 py-2.5 bg-white border-2 border-black rounded-none focus:outline-none focus:bg-[#FFE500]/10 text-xs font-mono text-black"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImageUrlField(idx)}
                              className="p-2.5 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black border-2 border-black rounded-none transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 stroke-[2px]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end gap-3 pt-3 border-t-2 border-black">
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setActiveTab('list');
                        }}
                        className="px-5 py-3 rounded-none text-xs font-black uppercase text-black bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                      >
                        Batal
                      </button>

                      <button
                        type="submit"
                        className="px-7 py-3 rounded-none text-xs font-black tracking-widest uppercase bg-[#FFE500] hover:bg-[#FFE500]/90 text-black border-3 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer"
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border-3 border-black shadow-[6px_6px_0px_#000000] rounded-none text-black">
                    <div>
                      <h2 className="text-lg font-black tracking-tight text-black uppercase font-sans">
                        History Pembelian ({orders.length})
                      </h2>
                      <p className="text-xs text-black/75 mt-0.5 leading-relaxed font-bold">
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
                            className={`px-3 py-1.5 rounded-none text-[11px] font-black tracking-wider uppercase border-2 transition-all cursor-pointer ${
                              orderFilter === status
                                ? 'bg-[#FFE500] text-black border-black shadow-[2px_2px_0px_#000000]'
                                : 'bg-white text-black border-gray-400 hover:border-black'
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
                    <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] rounded-none space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase font-black text-black/60">Total Akumulasi Omset</span>
                      <div className="text-xl font-black text-black font-mono">
                        {formatCurrency(
                          orders.filter(o => o.status === 'Dikonfirmasi').reduce((sum, o) => sum + o.totalAmount, 0)
                        )}
                      </div>
                      <span className="text-[9px] text-black/55 font-bold block">Dihitung dari pesanan berstatus Dikonfirmasi</span>
                    </div>

                    <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] rounded-none space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase font-black text-black/60">Transaksi Pending</span>
                      <div className="text-xl font-black text-black font-mono">
                        {orders.filter(o => o.status === 'Menunggu').length} Pesanan
                      </div>
                      <span className="text-[9px] text-black/55 font-bold block">Perlu verifikasi pembayaran / data segera</span>
                    </div>

                    <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] rounded-none space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase font-black text-black/60">Rasio Sukses</span>
                      <div className="text-xl font-black text-black font-mono">
                        {orders.length === 0 ? '0%' : `${Math.round((orders.filter(o => o.status === 'Dikonfirmasi').length / orders.length) * 100)}%`}
                      </div>
                      <span className="text-[9px] text-black/55 font-bold block">Persentase sukses penyelesaian pesanan</span>
                    </div>
                  </div>

                  {/* TRANSACTIONS CONTAINER */}
                  <div className="space-y-4">
                    {orders.filter(o => orderFilter === 'Semua' || o.status === orderFilter).length === 0 ? (
                      <div className="p-12 text-center bg-white border-3 border-black shadow-[6px_6px_0px_#000000] rounded-none max-w-xl mx-auto space-y-4">
                        <ShoppingCart className="w-12 h-12 text-black mx-auto animate-pulse" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-black">
                          Tidak Ada Transaksi ditemukan
                        </h3>
                        <p className="text-xs text-black/75 font-bold leading-normal max-w-md mx-auto">
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
                              className="relative p-5 bg-white border-3 border-black shadow-[6px_6px_0px_#000000] rounded-none space-y-5 overflow-hidden text-black"
                            >
                              {/* Main Order Header Block */}
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-black pb-3.5">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black tracking-wider uppercase text-black font-mono bg-[#FFE500] px-2.5 py-1 rounded-none border-2 border-black shadow-[1.5px_1.5px_0px_#000000]">
                                      {order.id}
                                    </span>
                                    <span className="text-[10px] font-mono font-black text-black/60">
                                      {orderDate} WIB
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* Status Badges with custom glass styles */}
                                  <span
                                    className={`px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-none border-2 ${
                                      order.status === 'Menunggu'
                                        ? 'bg-[#FFE500] text-black border-black shadow-[1.5px_1.5px_0px_#000000]'
                                        : order.status === 'Dikonfirmasi'
                                        ? 'bg-[#00FF85] text-black border-black shadow-[1.5px_1.5px_0px_#000000]'
                                        : 'bg-[#FF6B6B] text-black border-black shadow-[1.5px_1.5px_0px_#000000]'
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </div>
                              </div>

                              {/* Buyer details and Items details Grid */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Column 1: Customer Profile Details */}
                                <div className="lg:col-span-5 space-y-3.5 bg-[#F5F5F5] border-2 border-black rounded-none p-4">
                                  <div className="text-[11px] uppercase font-black tracking-wider text-black flex items-center gap-1.5 border-b-2 border-black pb-1.5">
                                    <User className="w-4 h-4 text-black stroke-[2.5px]" /> Profil Akun Buyer (Discord)
                                  </div>

                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-baseline font-bold">
                                      <span className="text-black/70">Akun Discord:</span>
                                      <span className="font-black text-black uppercase tracking-wider">{order.buyerName}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline font-bold">
                                      <span className="text-black/70">Tanggal & Bulan:</span>
                                      <span className="font-black text-black bg-[#FFE500] px-1 border border-black">{order.buyerNotes || '-'}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column 2: Purchased items list */}
                                <div className="lg:col-span-7 space-y-2">
                                  <div className="text-[11px] uppercase font-black tracking-wider text-black flex items-center gap-1.5">
                                    <Package className="w-4 h-4 text-black stroke-[2.5px]" /> Daftar Unit & Part yang Dibeli
                                  </div>

                                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {order.items.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between p-2.5 rounded-none bg-[#F5F5F5] border-2 border-black"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-9 h-9 bg-white overflow-hidden shrink-0 border-2 border-black rounded-none">
                                            <img
                                              src={item.product.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600'}
                                              alt={item.product.name}
                                              className="w-full h-full object-cover"
                                              referrerPolicy="no-referrer"
                                            />
                                          </div>
                                          <div>
                                            <span className="block text-xs font-black text-black uppercase line-clamp-1 max-w-[180px] sm:max-w-xs">
                                              {item.product.name}
                                            </span>
                                            <span className="block text-[10px] font-mono font-black text-black/60">
                                              {formatCurrency(item.product.price)} x {item.quantity}
                                            </span>
                                          </div>
                                        </div>

                                        <span className="text-xs font-black text-black font-mono shrink-0">
                                          {formatCurrency(item.product.price * item.quantity)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Footer content with summary and action controllers */}
                              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#F5F5F5] p-4 border-2 border-black rounded-none">
                                <div className="flex items-center gap-3.5 text-center sm:text-left self-stretch sm:self-auto justify-between sm:justify-start">
                                  <span className="text-[11px] font-black uppercase text-black/60">Total Pembayaran:</span>
                                  <span className="text-base font-black text-black bg-[#00FF85] border border-black px-1.5 font-mono">
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
                                        className="flex-1 sm:flex-none px-4 py-2 bg-[#00FF85] hover:bg-[#00FF85]/90 border-2 border-black text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1 cursor-pointer rounded-none"
                                      >
                                        <Check className="w-3.5 h-3.5 text-black stroke-[3px]" /> Konfirmasi
                                      </button>
                                      <button
                                        onClick={() => {
                                          onUpdateOrderStatus(order.id, 'Dibatalkan');
                                          triggerToast(`Pemesanan ${order.id} dibatalkan.`);
                                        }}
                                        className="flex-1 sm:flex-none px-4 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 border-2 border-black text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1 cursor-pointer rounded-none"
                                      >
                                        <XCircle className="w-3.5 h-3.5 text-black" /> Tolak
                                      </button>
                                    </>
                                  )}

                                  <button
                                    onClick={() => {
                                      onDeleteOrder(order.id);
                                      triggerToast(`Riwayat order ${order.id} berhasil terhapus.`);
                                    }}
                                    className="p-2 bg-white hover:bg-[#FF6B6B] border-2 border-black rounded-none transition-all cursor-pointer flex items-center justify-center text-black"
                                    title="Hapus Dari History"
                                  >
                                    <Trash2 className="w-4 h-4 stroke-[2.5px]" />
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md p-6 bg-white border-4 border-black shadow-[8px_8px_0px_#000000] rounded-none space-y-4 overflow-hidden z-10 text-black"
            >
              <div className="flex items-center gap-3 text-black">
                <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-black stroke-[2.5px]" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider font-sans">Konfirmasi Hapus</h3>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-black font-bold leading-normal">
                  Apakah Anda yakin ingin menghapus produk <span className="font-black underline">"{productToDelete.name}"</span> dari katalog Lowspeed?
                </p>
                <p className="text-[10px] font-mono text-black bg-[#FF6B6B]/20 py-2.5 px-3 rounded-none border-2 border-black leading-normal font-black uppercase">
                  Tindakan ini bersifat permanen dan tidak bisa dibatalkan dari database lokal.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className="px-4.5 py-3 rounded-none text-xs font-black uppercase text-black bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteProduct}
                  className="px-4.5 py-3 rounded-none text-xs font-black tracking-widest uppercase bg-[#FF6B6B] text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#FF6B6B]/80 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
