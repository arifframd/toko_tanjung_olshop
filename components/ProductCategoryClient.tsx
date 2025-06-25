"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib";
import Category from "./Category";

export default function ProductCategoryClient({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  // jika filter === 'Semua' tampilkan semua product
  const filteredProducts = selectedCategory === "Semua" ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <div className="mb-6 flex justify-end lg:-mt-15 lg:mx-9">
        {/* select category dan ubah selectedCategory */}
        <h1 className="text-[18px] text-gray-600 font-semibold mr-4">Kategori: </h1>
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No product found</p>
      )}
    </>
  );
}

// memanggil ProductCategoryClient karena use client tidak bisa digunakan dengan async di bagian product page, lalu ProductCard dirender disini juga
