"use client";

import { CartItems } from "@/lib";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import CheckoutForm from "./CheckoutForm";
import { toast } from "sonner";
import { deleteProductCart } from "@/lib/actions";
import { useRouter } from "next/navigation";

const CartCard = ({ cart, userId }: { cart: CartItems; userId: string }) => {
  const { productId, name, price, imageUrl, quantity } = cart;
  // const [qty, setQty] = useState(quantity);
  const formatedPrice = price.toLocaleString("id-ID");
  const totalFormatedPrice = (quantity * price).toLocaleString("id-ID");
  const [isCheckout, setIsCheckout] = useState(false);
  const router = useRouter();
  // const incrementQty = () => setQty((prev) => prev + 1);
  // const decrementQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));
  const onBuyClick = () => {
    setIsCheckout(true);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteProductCart(userId, productId);

      if (data.status === "SUCCESS") {
        toast.success(data.message || "Berhasil menghapus produk");
        router.refresh();
      } else {
        toast.error(data.message || "Gagal menghapus produk");
      }
    } catch (err) {
      console.log("Error: ", err);
      toast.error("Terjadi kesalahan saat menghapus.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 py-4 border-b last:border-b-0">
      {isCheckout && <CheckoutForm imageUrl={imageUrl} name={name} id={productId} quantity={quantity} price={price} onClose={() => setIsCheckout(false)} />}

      <div className="col-span-5 flex items-center gap-4">
        <Image src={imageUrl} alt={name} width={80} height={80} className="rounded-lg border w-20 h-20 object-cover" />
        <Link href={`/product/${productId}`}>
          <h2 className="text-base font-medium text-gray-800 hover:underline">{name}</h2>
        </Link>
      </div>

      <div className="col-span-2 text-blue-700 font-semibold text-sm">Rp {formatedPrice}</div>

      <div className="col-span-2 flex items-center gap-2">
        {/* <Button variant="outline" size="sm" onClick={decrementQty}>
          -
        </Button> */}
        <span className="text-sm">{quantity}</span>
        {/* <Button variant="outline" size="sm" onClick={incrementQty}>
          +
        </Button> */}
      </div>

      <div className="col-span-3 font-bold text-md text-gray-700">
        <div className="flex gap-10 items-center">
          Rp {totalFormatedPrice}
          <div className="flex gap-2">
            {/* TODO: BUAT ONCLICK EVENT HANDLER HAPUS SAMA CHECKOUT */}
            <Button className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-1.5" onClick={onBuyClick}>
              Checkout
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1.5" onClick={handleDelete}>
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
