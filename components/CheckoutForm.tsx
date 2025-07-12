"use client";

import { fetchUserInfo } from "@/lib/actions";
import { createTransaction } from "@/lib/createTransaction";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ Ubah props: products jadi array
type Product = {
  product_id: string;
  product_name: string;
  imageUrl: string;
  quantity: number;
  price: number;
  subtotal: number;
};

type CheckoutFormProps = {
  userId: string | undefined;
  products: Product[];
  onClose: () => void;
};

export default function CheckoutForm({ userId, products, onClose }: CheckoutFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    nameBuyer: "",
    email: "",
    phone: 0,
    address: "",
    city: "",
    postalCode: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetchUserInfo(userId);
      if (res) {
        setForm({
          nameBuyer: res.userId.name || "",
          email: res.userId.email || "",
          phone: res.phoneNumber || 0,
          address: res.address || "",
          city: res.city || "",
          postalCode: res.postalCode || 0,
        });
      } else {
        console.warn("Data user tidak ditemukan, silakan isi formulir checkout.");
      }
    };
    try {
      fetchUserData();
    } catch (err) {
      console.error("Error saat mengambil data user: ", err);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data checkout:", form);

    const { nameBuyer, email, phone, address, city, postalCode } = form;

    try {
      const paymentUrl = await createTransaction({
        nameBuyer,
        email,
        phone,
        address,
        city,
        postalCode,
        products, // kirim array product di sini
      });
      router.push(paymentUrl);
    } catch (err) {
      console.error("Gagal create transaksi:", err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-center items-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} className="w-[90%] md:w-[550px]">
          <div className="relative max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <button onClick={onClose} className="absolute top-3 left-3 text-gray-500 hover:text-gray-700" aria-label="Tutup">
              <ArrowLeft />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Formulir Pengiriman</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama Lengkap</label>
                <input type="text" name="nameBuyer" value={form.nameBuyer} onChange={handleChange} required placeholder="Nama anda" className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="example@gmail.com" className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium">No. HP</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+62..." className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium">Alamat Lengkap</label>
                <textarea name="address" value={form.address} onChange={handleChange} required rows={3} placeholder="Alamat anda" className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Kota</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="Kota anda" className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Kode Pos</label>
                  <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} required placeholder="Kode Post anda" className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
                Lanjut ke Pembayaran
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
