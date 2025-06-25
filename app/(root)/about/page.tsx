import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Selamat Datang di Toko Tanjung</h1>
              <Image src="/logoTanjung.png" alt="Toko Tanjung" width={60} height={60} className="rounded-full" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              Toko Tanjung merupakan usaha keluarga yang bergerak di bidang penjualan ban gerobak. Toko ini didirikan secara mandiri oleh keluarga Tanjung sebagai bentuk usaha turun-temurun yang telah berjalan sejak beberapa tahun lalu.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Berlokasi di Pasar Asem, Grendeng, Kelurahan Sukajadi, Kecamatan Karawaci, Kota Tangerang, Toko Tanjung awalnya hanya melayani pelanggan di sekitar lingkungan pasar secara langsung. Seiring waktu, toko ini berkembang menjadi
              salah satu toko ban yang dikenal di wilayah tersebut karena pelayanan yang ramah dan ketersediaan produk yang cukup lengkap.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">Hingga saat ini toko tanjung masih menjadi toko yang dikenal sangat hangat dalam pelayanan dan bergansi.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#a2d9ff] text-gray-700 border-t">
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

          {/* Sosial Media */}
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
    </div>
  );
};

export default Page;
