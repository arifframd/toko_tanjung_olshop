"use client";
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { fetchAllProduct, handleAddToCart } from "@/lib/actions";
import { toast } from "sonner";

const ProductDetail = ({ userId, id }: { userId: string | undefined; id: string }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [qty, setQty] = useState(1);

  const productId = id;
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const products: Product[] = await fetchAllProduct();
      setProduct(products.find((item) => item._id === productId) as Product);
      // Ambil related products selain produk saat ini
      setRelatedProducts(products.filter((item) => item._id !== productId).slice(0, 4));
    };
    fetchProduct();
  }, [productId]);
  const formatedPrice = product?.price.toLocaleString("id-ID");

  const incrementQty = () => setQty((prev) => prev + 1);
  const decrementQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));
  const onBuyClick = () => {
    setShowCheckoutForm(true);
  };

  const onCartClick = async () => {
    if (!product) {
      toast.error("Produk tidak ditemukan.");
      return;
    }
    const result = await handleAddToCart({ quantity: qty, product: product });

    if (result.status === "SUCCESS") {
      toast.success(result.message || "Berhasil menambahkan ke cart");
    } else {
      toast.error("Gagal menambahkan ke cart");
    }
  };

  // useEffect(() => {
  //   // render snap token
  //   // You can also change below url value to any script url you wish to load,
  //   // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
  //   const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

  //   const scriptTag = document.createElement("script");
  //   scriptTag.src = midtransScriptUrl;

  //   // Optional: set script attribute, for example snap.js have data-client-key attribute
  //   // (change the value according to your client-key)
  //   const myMidtransClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
  //   scriptTag.setAttribute("data-client-key", myMidtransClientKey!);

  //   document.body.appendChild(scriptTag);

  //   return () => {
  //     document.body.removeChild(scriptTag);
  //   };
  // }, []);

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Produk tidak ditemukan.</p>;
  }

  const { name, imageUrl, description, stock = 5 } = product;

  //

  return (
    <div className="container mx-auto px-4 py-8">
      {showCheckoutForm && (
        <CheckoutForm
          userId={userId}
          products={[{ product_id: product._id, product_name: product.name, imageUrl: product.imageUrl, price: product.price, quantity: 1, subtotal: product.price * 1 }]}
          onClose={() => setShowCheckoutForm(false)}
        />
      )}

      {/* Detail Produk */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Gambar Produk */}
        <div className="flex-shrink-0">
          <Image src={imageUrl} width={600} height={600} alt="product-image" className="rounded-xl object-cover" />
        </div>

        {/* Info Produk */}
        <div className="flex flex-col justify-between w-full ml-9">
          <hr />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
            <div className="flex flex-row gap-5 items-center">
              <p className="text-xl text-gray-600 font-semibold mb-4">Harga</p>
              <p className="text-3xl text-blue-600 font-semibold mb-4">Rp {formatedPrice}</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">{description}</p>

            {/* Stok */}
            <p className={`text-sm font-medium mb-4 ${stock > 0 ? "text-green-600" : "text-red-600"}`}>{stock > 0 ? `Stok Tersedia: ${stock}` : "Stok Habis"}</p>
          </div>
          <hr />
          {/* Jumlah */}
          <div className="flex items-center gap-2 mt-3">
            <h3>Jumlah: </h3>
            <Button variant="outline" size="sm" onClick={decrementQty}>
              -
            </Button>
            <span className="text-sm">{qty}</span>
            <Button variant="outline" size="sm" onClick={incrementQty} disabled={qty >= stock}>
              +
            </Button>
          </div>
          {/* Tombol */}
          <div className="flex gap-4 mt-6">
            <Button onClick={onCartClick} variant="outline">
              Keranjang
            </Button>

            <Button onClick={onBuyClick}>Buy Now</Button>

            {/* TODO: membuat form muncul ketika buttok buy now ditekan */}
          </div>
        </div>
      </div>

      {/* Produk Terkait */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Terkait</h2>
        <ul className="card_grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
// memberikan id produk ke komponen ProductDetailCard karena di client component tidak bisa menggunakan async/await
