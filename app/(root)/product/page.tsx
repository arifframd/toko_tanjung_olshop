import SearchForm from "@/components/SearchForm";
import { Product } from "@/lib";
import React from "react";
import ProductCategoryClient from "@/components/ProductCategoryClient";
import Carousel from "@/components/Carousel";
import { fetchAllProduct } from "@/lib/actions";
// import { productFetch } from "@/lib/productFetch";

const page = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {
  const { query } = await searchParams;
  const products: Product[] = await fetchAllProduct();
  // const products = await productFetch();
  // console.log("products: ", products);

  // kalau mau filter dari query juga, bisa di sini
  const filteredByQuery = query ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())) : products;

  return (
    <>
      <div className="bg-[url('/product-bg.png')] bg-cover bg-center min-h-screen py-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
          <div className="flex justify-center">
            <SearchForm query={query} />
          </div>

          {query ? (
            <div className="flex flex-col w-full">
              <h1 className="font-semibold text-3xl text-gray-800 mb-6 ml-2 tracking-wide">All Product:</h1>
              <ProductCategoryClient products={filteredByQuery} />
            </div>
          ) : (
            <>
              <section>
                <Carousel product={products} />
              </section>
              <div className="flex flex-col w-full">
                <h1 className="font-semibold text-3xl text-gray-800 mb-6 ml-2 tracking-wide">All Product:</h1>
                <ProductCategoryClient products={filteredByQuery} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
