/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Search, ShoppingCart, User, Plus, X, Sparkles, Filter, Check,
  Car, Bike, Wrench, Settings, Cog, Grid, Sliders, ArrowUpRight, HelpCircle
} from 'lucide-react';

// Types and Data
import { Product, CartItem, Category, Order } from './types';
import { getStoredProducts, saveProductsToStore } from './data';

// Components
import Logo from './components/Logo';
import BannerCarousel from './components/BannerCarousel';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Global States
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'checkout' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // UI Interactive States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'Semua'>('Semua');
  const [orders, setOrders] = useState<Order[]>([]);

  // Load Initial Data from LocalStorage
  useEffect(() => {
    // Products Database initialization
    const initialProducts = getStoredProducts();
    setProducts(initialProducts);

    // Cart loading
    const storedCart = localStorage.getItem('lowspeed_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error('Error parsing cart from storage', e);
      }
    }

    // Orders loading
    const storedOrders = localStorage.getItem('lowspeed_orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error('Error parsing orders from storage', e);
      }
    }
  }, []);

  // Save Cart to LocalStorage
  const saveCartToStore = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('lowspeed_cart', JSON.stringify(newCart));
  };

  const handleCreateOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('lowspeed_orders', JSON.stringify(updated));
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan') => {
    const updated = orders.map((o) => o.id === orderId ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem('lowspeed_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem('lowspeed_orders', JSON.stringify(updated));
  };

  // Product Database manipulation triggers (from Admin CRUD)
  const handleAddProduct = (newProd: Product) => {
    const updated = [newProd, ...products];
    setProducts(updated);
    saveProductsToStore(updated);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    const updated = products.map((p) => p.id === updatedProd.id ? updatedProd : p);
    setProducts(updated);
    saveProductsToStore(updated);
    // If the currently viewed detail product was updated (like stock change), sync it
    if (selectedProduct && selectedProduct.id === updatedProd.id) {
      setSelectedProduct(updatedProd);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    saveProductsToStore(updated);
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
  };

  // Cart Management Methods
  const handleAddToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      const newQuantity = newCart[existingIndex].quantity + quantity;
      // Guard against maximum stock
      newCart[existingIndex].quantity = Math.min(newQuantity, product.stock);
    } else {
      newCart.push({ product, quantity: Math.min(quantity, product.stock) });
    }

    saveCartToStore(newCart);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    const index = cart.findIndex((item) => item.product.id === productId);
    if (index === -1) return;

    let newCart = [...cart];
    const targetProduct = products.find((p) => p.id === productId) || newCart[index].product;
    const nextQty = newCart[index].quantity + delta;

    if (nextQty <= 0) {
      newCart = newCart.filter((item) => item.product.id !== productId);
    } else {
      // Limit quantity by total actual products stock available
      newCart[index].quantity = Math.min(nextQty, targetProduct.stock);
    }

    saveCartToStore(newCart);
  };

  const handleRemoveCartItem = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCartToStore(newCart);
  };

  const handleClearCart = () => {
    saveCartToStore([]);
  };

  // Immediate Checkout gateway trigger
  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setCurrentView('checkout');
  };

  // Multi-Category selection menu keys
  const CATEGORY_ITEMS = [
    { name: 'Semua', label: 'Semua Produk', icon: Grid },
    { name: 'Motor', label: 'Motor Sport', icon: Bike },
    { name: 'Mobil', label: 'Mobil Mewah', icon: Car },
    { name: 'Part Motor', label: 'Part Motor', icon: Wrench },
    { name: 'Part Mobil', label: 'Part Mobil', icon: Cog },
    { name: 'Jasa', label: 'Service/Jasa', icon: Sliders },
    { name: 'Lainnya', label: 'Lainnya', icon: ArrowUpRight }
  ];

  // Filter products by category dropdown + search items
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden pb-24 sm:pb-8">
      {/* Background Liquid Ambient Light Spots (iOS 26 Glow Accent) */}
      <div className="absolute top-[-10%] left-[5%] w-[450px] h-[450px] bg-indigo-500/10 blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-pink-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* HEADER SECTION - Back-glass blur effect */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/65 border-b border-white/10 px-4 py-3 sm:py-4 transition-all">
        {/* Top inner shiny light line decoration */}
        <div className="absolute top-[1px] left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand Logo left side */}
          <div 
            className="cursor-pointer active:scale-95 transition-transform" 
            onClick={() => {
              setCurrentView('home');
              setActiveCategory('Semua');
              setSearchTerm('');
            }}
          >
            <Logo size={42} />
          </div>

          {/* Center search bar */}
          {currentView === 'home' && (
            <div className="relative w-full max-w-sm md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Mobil, Vespa, Knalpot, Coating..."
                className="w-full pl-10 pr-9 py-2 rounded-2xl text-xs sm:text-sm bg-white/5 hover:bg-white/10 focus:bg-slate-950 border border-white/10 hover:border-white/15 focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-500 text-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          )}

          {/* Header Action Buttons (Right Aligned) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Admin trigger Lock icon */}
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 border cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
              }`}
              title="Admin Dashboard"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart button trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 h-10 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-550 hover:to-blue-550 border border-cyan-500/20 flex items-center gap-2 text-white relative cursor-pointer active:scale-95 transition-transform shadow-lg shadow-cyan-900/10"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <span className="text-xs font-bold font-mono tracking-wide hidden sm:inline">Keranjang</span>
              
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold font-mono text-white shadow-xl ring-2 ring-slate-950">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* RENDER DYNAMIC SWITCH VIEWS ROUTER */}
      <main id="lowspeed-main-stage" className="mt-4 sm:mt-6">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
            >
              {/* Banner sliding component */}
              <BannerCarousel onCategorySelect={(cat) => setActiveCategory(cat as Category)} />

              {/* AUTOMOTIVE CATEGORIES BAR SCROLL GRIDS */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1.5 col">
                    <Filter className="w-3.5 h-3.5 text-cyan-400" /> PILIH KATEGORI AUTOMOTIF
                  </h3>
                  {activeCategory !== 'Semua' && (
                    <button
                      onClick={() => setActiveCategory('Semua')}
                      className="text-xs text-cyan-405 text-cyan-400 hover:underline cursor-pointer"
                    >
                      Reset Kategori
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {CATEGORY_ITEMS.map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeCategory === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setActiveCategory(item.name as Category | 'Semua')}
                        className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-3xl border transition-all duration-300 relative group cursor-pointer active:scale-95 ${
                          isActive
                            ? 'backdrop-blur-xl bg-cyan-500 text-slate-950 border-cyan-400 shadow-xl shadow-cyan-500/10'
                            : 'backdrop-blur-md bg-white/5 hover:bg-white/10 text-slate-350 border-white/10 hover:border-white/15'
                        }`}
                      >
                        {/* Upper highlight on custom button */}
                        {!isActive && (
                          <div className="absolute top-[1.5px] left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                        )}
                        
                        <IconComp className={`w-5 h-5 mb-1.5 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                        <span className="text-[10px] sm:text-xs font-extrabold font-sans uppercase tracking-wide truncate max-w-full text-center">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* PRODUCTS LISTING CATALOG SECTION */}
              <section className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <h2 className="text-lg font-black tracking-widest text-white uppercase font-sans flex items-center gap-1.5">
                    {activeCategory === 'Semua' ? 'Katalog Semua Produk' : `Koleksi ${activeCategory}`}
                    <span className="text-xs font-mono font-medium text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {filteredProducts.length} unit
                    </span>
                  </h2>

                  {searchTerm && (
                    <span className="text-xs text-slate-400">
                      Kata kunci: <b className="text-white">"{searchTerm}"</b>
                    </span>
                  )}
                </div>

                {/* Grid layout */}
                {filteredProducts.length === 0 ? (
                  /* Empty state rendering */
                  <div className="p-12 text-center rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 max-w-xl mx-auto space-y-4 mt-6">
                    <HelpCircle className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
                      Produk Tidak Ditemukan
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Maaf, produk mewah dengan filter atau kata pencarian "{searchTerm}" sedang tidak tersedia di Lowspeed. Coba gunakan kategori lain atau atur ulang pencarian.
                    </p>
                    <button
                      onClick={() => {
                        setActiveCategory('Semua');
                        setSearchTerm('');
                      }}
                      className="px-5 py-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 whitespace-nowrap font-bold text-slate-950 text-xs transition-colors cursor-pointer"
                    >
                      Tampilkan Semua Barang
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onViewDetail={(item) => setSelectedProduct(item)}
                        onAddToCart={(item) => handleAddToCart(item, 1)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </motion.div>
          )}

          {currentView === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <Checkout
                cartItems={cart}
                onBackToCart={() => {
                  setCurrentView('home');
                  setIsCartOpen(true);
                }}
                onClearCart={handleClearCart}
                onCreateOrder={handleCreateOrder}
              />
            </motion.div>
          )}

          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <AdminPanel
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onLogoutAdmin={() => {}}
                onCloseAdmin={() => setCurrentView('home')}
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onDeleteOrder={handleDeleteOrder}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* PRIMARY FLOATING GLASS BOTTOM NAVIGATION PILL (iOS 26 Liquid Signature for mobile devices) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-80 max-w-full px-1.5 py-1.5 z-40 sm:hidden">
        <div className="relative rounded-full backdrop-blur-2xl bg-slate-950/70 border border-white/20 p-1 shadow-2xl flex justify-between items-center text-slate-350">
          {/* Subtle upper glass curve accent */}
          <div className="absolute top-[1px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Home Catalog Link */}
          <button
            onClick={() => {
              setCurrentView('home');
              setActiveCategory('Semua');
              setSearchTerm('');
            }}
            className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center transition-all ${
              currentView === 'home' ? 'text-cyan-400 font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold">Katalog</span>
          </button>

          {/* Open shopping cart tab */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 py-1 relative flex flex-col items-center justify-center text-slate-400 hover:text-white"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 mb-0.5 text-cyan-400" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold font-mono text-white ring-1 ring-slate-950">
                  {totalCartItems}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold">Cart</span>
          </button>

          {/* Admin panel redirect */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
            className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center transition-all ${
              currentView === 'admin' ? 'text-cyan-400 font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold">Admin</span>
          </button>
        </div>
      </div>

      {/* OVERLAY: PRODUCT DETAIL FLOATING DIALOG MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(item, qty) => handleAddToCart(item, qty)}
            onBuyNow={(item, qty) => handleBuyNow(item, qty)}
          />
        )}
      </AnimatePresence>

      {/* OVERLAY: SLIDE-OUT CART PANEL OR BOTTOM DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={() => {
              setIsCartOpen(false);
              setCurrentView('checkout');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
