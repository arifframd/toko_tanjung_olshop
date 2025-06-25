"use client";
import { Product } from "@/lib";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

const Carousel = ({ product }: { product: Product[] }) => {
  const [current, setCurrent] = useState<number>(0);
  const displayProduct = product.slice(0, 3);
  const priceFormat = displayProduct[current].price.toLocaleString("id-ID");

  useEffect(() => {
    // setInterval untuk merubah index tiap 3 detik
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayProduct.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayProduct.length]);
  return (
    <div className="w-full flex justify-center mb-10 px-4">
      <Link href={`/product/${displayProduct[current]._id}`}>
        <Card className="max-w-5xl w-full flex flex-col sm:flex-row items-center gap-6 overflow-hidden shadow-lg rounded-2xl">
          <Image src={displayProduct[current].imageUrl} alt={displayProduct[current].name} width={400} height={450} className="object-cover rounded-l-2xl w-full sm:w-[400px] h-[250px] sm:h-[300px] transition-all duration-500 ease-in-out" />
          <CardContent className="py-4">
            <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">{displayProduct[current].name}</CardTitle>
            <CardDescription className="text-gray-600 text-sm mb-2">{displayProduct[current].description.slice(0, 100)}...</CardDescription>
            <p className="text-primary font-bold text-lg">Rp {priceFormat}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Carousel;
