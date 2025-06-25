"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { CiShoppingCart } from "react-icons/ci";
import { Product } from "@/lib";
import Link from "next/link";
import { handleAddToCart } from "@/lib/actions";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const onAdd = async () => {
    const result = await handleAddToCart({ quantity: 1, product: product });

    if (result?.status === "SUCCESS") {
      // redirect atau show toast sukses
      toast.success(result.message || "Berhasil menambahkan ke cart");
    } else {
      toast.error(result.message || "Gagal menambahkan ke cart");
    }
  };
  const { _id, name, price, description, imageUrl } = product;
  const priceFormat = price.toLocaleString("id-Id");

  return (
    <>
      <li className="product-card">
        <div>
          <Image src={imageUrl} alt="Ban" width={200} height={100} className="product-image" />
          <div className="product-content">
            <div className="flex justify-between items-center">
              <Link href={`/product/${_id}`}>
                <h2 className="product-title">{name}</h2>
              </Link>
              <Button className=" icon-circle bg-white hover:bg-gray-100 cursor-pointer" onClick={onAdd}>
                <CiShoppingCart className="text-red-500" />
              </Button>
            </div>
            <div className="flex items-center mt-1">
              <p className="product-price">Rp. {priceFormat}</p>
            </div>
            <p className="product-description">{description}</p>
            <Link href={`/product/${_id}`}>
              <Button className="product-button cursor-pointer">Detail</Button>
            </Link>
          </div>
        </div>
      </li>
    </>
  );
};

export default ProductCard;
