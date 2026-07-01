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
import AdminPanel from './components/AdminPanel';

// DISCORD REDIRECT CONSTANT
const DISCORD_SERVER_URL = 'https://discord.gg/hyA7X58cwa';

export default function App() {
  // Global States
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
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
    // DISCORD REDIRECT
    window.open(DISCORD_SERVER_URL, '_blank');
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

  /* NEO BRUTALISM */
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-black relative overflow-x-hidden pb-24 sm:pb-8">
      {/* HEADER SECTION - Solid White with Stark Black Borders */}
      <header className="sticky top-0 z-40 bg-white border-b-4 border-black px-4 py-4 sm:py-5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand Logo left side */}
          <div 
            className="cursor-pointer active:translate-x-0.5 active:translate-y-0.5" 
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
                <Search className="w-5 h-5 text-black stroke-[3px]" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Mobil, Vespa, Knalpot, Coating..."
                className="w-full pl-11 pr-9 py-3 bg-white border-3 border-black text-xs sm:text-sm text-black placeholder-gray-550 focus:outline-none focus:bg-[#FFE500]/10 font-black rounded-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-[#FF6B6B]"
                >
                  <X className="w-5 h-5 stroke-[3px]" />
                </button>
              )}
            </div>
          )}

          {/* Header Action Buttons (Right Aligned) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin trigger Lock icon */}
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
              className={`w-11 h-11 border-3 border-black flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] rounded-none ${
                currentView === 'admin'
                  ? 'bg-[#FFE500] text-black'
                  : 'bg-white hover:bg-gray-150 text-black'
              }`}
              title="Admin Dashboard"
            >
              <User className="w-5.5 h-5.5 stroke-[2.5px]" />
            </button>

            {/* Shopping Cart button trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 h-11 bg-[#FFE500] hover:bg-[#FFE500]/90 border-3 border-black flex items-center gap-2 text-black relative cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all rounded-none"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.5px]" />
              <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">Keranjang</span>
              
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center bg-[#FF6B6B] text-[11px] font-black font-mono text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000]">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* RENDER DYNAMIC SWITCH VIEWS ROUTER */}
      <main id="lowspeed-main-stage" className="mt-6 sm:mt-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
            >
              {/* Banner sliding component */}
              <BannerCarousel onCategorySelect={(cat) => setActiveCategory(cat as Category)} />

              {/* AUTOMOTIVE CATEGORIES BAR SCROLL GRIDS */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b-3 border-black pb-2">
                  <h3 className="text-xs uppercase tracking-wider text-black font-black flex items-center gap-1.5">
                    <Filter className="w-4 h-4 text-black stroke-[3px]" /> PILIH KATEGORI AUTOMOTIF
                  </h3>
                  {activeCategory !== 'Semua' && (
                    <button
                      onClick={() => setActiveCategory('Semua')}
                      className="text-xs uppercase font-black text-black hover:underline cursor-pointer bg-[#00FF85] px-2 py-0.5 border border-black"
                    >
                      Reset Kategori
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {CATEGORY_ITEMS.map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeCategory === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setActiveCategory(item.name as Category | 'Semua')}
                        className={`flex flex-col items-center justify-center p-4 border-3 border-black transition-all duration-100 relative group cursor-pointer rounded-none shadow-[3px_3px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${
                          isActive
                            ? 'bg-[#FFE500] text-black font-black'
                            : 'bg-white hover:bg-gray-150 text-black'
                        }`}
                      >
                        <IconComp className="w-6 h-6 mb-2 stroke-[2.5px]" />
                        <span className="text-[11px] font-black uppercase tracking-tight text-center truncate max-w-full">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* PRODUCTS LISTING CATALOG SECTION */}
              <section className="space-y-6">
                <div className="flex justify-between items-baseline border-b-3 border-black pb-2.5">
                  <h2 className="text-lg font-black tracking-tight text-black uppercase font-sans flex items-center gap-2">
                    {activeCategory === 'Semua' ? 'Katalog Semua Produk' : `Koleksi ${activeCategory}`}
                    <span className="text-xs font-mono font-black text-black px-3 py-0.5 rounded-none bg-[#FFE500] border-2 border-black shadow-[2px_2px_0px_#000000]">
                      {filteredProducts.length} unit
                    </span>
                  </h2>

                  {searchTerm && (
                    <span className="text-xs font-bold text-black bg-white px-2 py-1 border border-black">
                      Kata kunci: <b className="underline">"{searchTerm}"</b>
                    </span>
                  )}
                </div>

                {/* Grid layout */}
                {filteredProducts.length === 0 ? (
                  /* Empty state rendering */
                  <div className="p-12 text-center bg-white border-3 border-black shadow-[6px_6px_0px_#000000] rounded-none max-w-xl mx-auto space-y-4 mt-6 text-black">
                    <HelpCircle className="w-12 h-12 text-black mx-auto stroke-[2.5px]" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-black">
                      Produk Tidak Ditemukan
                    </h3>
                    <p className="text-xs text-black/75 font-bold leading-normal">
                      Maaf, produk mewah dengan filter atau kata pencarian "{searchTerm}" sedang tidak tersedia di Lowspeed. Coba gunakan kategori lain atau atur ulang pencarian.
                    </p>
                    <button
                      onClick={() => {
                        setActiveCategory('Semua');
                        setSearchTerm('');
                      }}
                      className="px-5 py-3 bg-[#FFE500] border-2 border-black font-black text-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 rounded-none cursor-pointer"
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

          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
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

      {/* PRIMARY FLOATING BOTTOM NAVIGATION BAR FOR MOBILE DEVICES */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-80 max-w-full px-1.5 py-1.5 z-40 sm:hidden">
        <div className="relative bg-white border-3 border-black p-1 shadow-[4px_4px_0px_#000000] flex justify-between items-center text-black rounded-none">
          {/* Home Catalog Link */}
          <button
            onClick={() => {
              setCurrentView('home');
              setActiveCategory('Semua');
              setSearchTerm('');
            }}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-all ${
              currentView === 'home' ? 'bg-[#FFE500] font-black text-black border border-black' : 'text-black hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mb-0.5 stroke-[2.5px]" />
            <span className="text-[9px] uppercase tracking-wide font-black">Katalog</span>
          </button>

          {/* Open shopping cart tab */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 py-1 relative flex flex-col items-center justify-center text-black hover:bg-gray-100"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 mb-0.5 stroke-[2.5px]" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center bg-[#FF6B6B] text-[9px] font-black text-black border border-black">
                  {totalCartItems}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wide font-black">Cart</span>
          </button>

          {/* Admin panel redirect */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-all ${
              currentView === 'admin' ? 'bg-[#FFE500] font-black text-black border border-black' : 'text-black hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5 mb-0.5 stroke-[2.5px]" />
            <span className="text-[9px] uppercase tracking-wide font-black">Admin</span>
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
              // Directly redirects to Discord URL
              window.open(DISCORD_SERVER_URL, '_blank');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
