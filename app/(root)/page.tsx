import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import ChatBot from "@/components/ChatBot";
import { fetchBestSellerProducts } from "@/lib/actions";

export default async function Home() {
  const products = await fetchBestSellerProducts();
  return (
    <>
      {/* Main */}
      <section className="product_container">
        <ChatBot />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
          {/* Text Section */}
          <div className="text-left space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">Toko Tanjung – Pusat Ban Terpercaya Di Karawaci</h1>
            <p className="text-lg text-gray-700">Menyediakan berbagai jenis ban kendaraan berkualitas dengan harga terjangkau. Kini belanja ban lebih praktis dan cepat melalui website kami.</p>
            <Link href={"/product"}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow cursor-pointer">Belanja Sekarang</Button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="mt-10 md:mt-0">
            <img src={`/logoTanjung.png`} alt="Ban Kendaraan" className="hero_image hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Best seller */}
      <section className=" product-best">
        <div className=" px-8 py-8">
          <h1 className=" text-3xl font-bold text-gray-800"> Best Seller:</h1>
          <ul className="card_grid mt-7">{products?.length > 0 ? products.map((product: Product, index: any) => <ProductCard key={index} product={product} />) : <p className="no-result">No Product found</p>}</ul>
        </div>
      </section>

      <section className="product-choose">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">Kenapa Pilih Kami?</h2>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6">
          <div className="flex-1 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-2xl">✅</div>
            <h3 className="font-semibold text-lg mb-2">Harga Terjangkau</h3>
            <p className="text-gray-700">Produk dengan kualitas terbaik dan harga bersaing.</p>
          </div>

          <div className="flex-1 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-2xl">🚚</div>
            <h3 className="font-semibold text-lg mb-2">Pengiriman Cepat</h3>
            <p className="text-gray-700">Proses cepat, produk sampai dalam waktu singkat.</p>
          </div>

          <div className="flex-1 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full text-2xl">🛡️</div>
            <h3 className="font-semibold text-lg mb-2">Garansi Produk</h3>
            <p className="text-gray-700">Jaminan keaslian dan kualitas ban kendaraan Anda.</p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-[#a2d9ff] text-gray-700 border-t">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div>
            <h2 className="text-2xl font-bold">Toko Tanjung</h2>
            <p className="text-sm mt-2 text-gray-600">Pusat Ban Terpercaya di Karawaci</p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-blue-600">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold mb-3">Hubungi Kami</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>📍 Jl. Merdeka No.06/D1, Pasar Asem</li>
              <li>📞 0895324876603</li>
              <li>📧 toko@tanjungban.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-3">Ikuti Kami</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-pink-600">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-600">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-red-500">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 py-4 border-t">© {new Date().getFullYear()} Toko Tanjung. All rights reserved.</div>
      </footer>
    </>
  );
}
