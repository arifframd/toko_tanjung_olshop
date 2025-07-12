"use client";

import { useState } from "react";
import CartCard from "@/components/CartCard";
import CheckoutForm from "@/components/CheckoutForm";
import { CartItems } from "@/lib";

type Props = {
  userId: string;
  cartItems: CartItems[];
};

type CheckoutItem = {
  product_id: string;
  product_name: string;
  imageUrl: string;
  quantity: number;
  price: number;
  subtotal: number;
};

const CartClient = ({ userId, cartItems }: Props) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);

  const handleCheckout = () => {
    const mapped = cartItems.map((item) => ({
      product_id: item.productId,
      product_name: item.name,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.quantity * item.price,
    }));
    setCheckoutItems(mapped);
    setShowCheckout(true);
  };

  return (
    <div className="mx-auto bg-[#f0f9ff] bg-cover bg-center min-h-screen py-10 px-4 md:px-10">
      <div className="bg-white p-4 shadow-sm border border-gray-200">
        {cartItems.length > 0 ? (
          <>
            <div className="hidden md:grid grid-cols-12 font-semibold text-gray-600 text-sm border-b pb-2 mb-4">
              <div className="col-span-5">NAMA PRODUK</div>
              <div className="col-span-2">HARGA</div>
              <div className="col-span-2">QTY</div>
              <div className="col-span-3">SUBTOTAL</div>
            </div>

            {cartItems.map((cart) => (
              <CartCard key={cart._id} cart={cart} userId={userId} />
            ))}

            <div className="mt-6 text-right">
              <p className="text-lg font-semibold text-gray-800 mb-4">Total: Rp {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString("id-ID")}</p>
              <button onClick={handleCheckout} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
                Checkout Semua
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Keranjang Anda kosong</p>
        )}
      </div>

      {showCheckout && <CheckoutForm userId={userId} products={checkoutItems} onClose={() => setShowCheckout(false)} />}
    </div>
  );
};

export default CartClient;
