/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Motor' | 'Mobil' | 'Part Motor' | 'Part Mobil' | 'Jasa' | 'Lainnya';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  stock: number;
  images: string[]; // Supports multiple image URLs (inputted dynamically by admin)
  createdAt: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  buyerName: string;
  buyerPhone: string;
  buyerNotes: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan';
  createdAt: number;
}

export interface CheckoutConfig {
  paymentQrUrl: string; // QRIS image url or placeholder
  whatsappLink: string; // WhatsApp redirect link for proof of transfer
}
