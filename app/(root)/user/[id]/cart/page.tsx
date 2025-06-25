import CartCard from "@/components/CartCard";
import { CartItems, RouteParams } from "@/lib";
import React from "react";
import { fetchCartByUserId } from "@/lib/actions";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const userCart: CartItems[] = (await fetchCartByUserId(id)) || [];
  console.log("id adalah ", id);
  return (
    <div className="mx-auto bg-[#f0f9ff] bg-cover bg-center min-h-screen py-10 px-4 md:px-10">
      <div className="bg-white p-4 shadow-sm border border-gray-200">
        {userCart.length > 0 ? (
          <div className="hidden md:grid grid-cols-12 font-semibold text-gray-600 text-sm border-b pb-2 mb-4">
            <div className="col-span-5">NAMA PRODUK</div>
            <div className="col-span-2">HARGA</div>
            <div className="col-span-2">QTY</div>
            <div className="col-span-3">SUBTOTAL</div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Keranjang Anda kosong</p>
        )}

        {/* Semua item cart */}
        {userCart.map((cart) => (
          <CartCard key={cart._id} cart={cart} userId={id} />
        ))}
      </div>
    </div>
  );
};

export default page;
