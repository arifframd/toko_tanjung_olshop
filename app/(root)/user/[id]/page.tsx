import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { Card } from "@/components/ui/card";
import { Clock, PenBoxIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCircleInfo, CiShoppingCart } from "react-icons/ci";

const page = async () => {
  const session = await auth();

  return (
    <div className="bg-[#f0f9ff] min-h-screen py-10 px-4 md:px-10">
      <Card className="max-w-4xl mx-auto p-6 md:p-10 rounded-2xl shadow-md shadow-gray-200 bg-white flex flex-col gap-6">
        {/* Profil Pengguna */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image src={session?.user?.image} alt="User Avatar" width={120} height={120} className="rounded-full object-cover border-2 border-gray-300" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-semibold text-gray-800">{session?.user?.name}</h2>
              <SignOut />
            </div>
            <p className="text-gray-600">{session?.user?.email}</p>
          </div>
        </div>

        <hr className="border-t border-gray-200" />

        {/* Menu Akun */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-800">Menu Akun</h3>

          <Link href={`/user/${session?.id}/info`} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <CiCircleInfo />
              </span>
              <span className="font-medium text-gray-800">Info</span>
            </div>
            <span className="text-gray-400 text-sm">Lihat →</span>
          </Link>

          <Link href={`/user/${session?.id}/cart`} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <CiShoppingCart />
              </span>
              <span className="font-medium text-gray-800">Keranjang</span>
            </div>
            <span className="text-gray-400 text-sm">Lihat →</span>
          </Link>

          <Link href={`/user/history/${session?.user?.name}/order`} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <Clock />
              </span>
              <span className="font-medium text-gray-800">Riwayat Order</span>
            </div>
            <span className="text-gray-400 text-sm">Lihat →</span>
          </Link>

          <Link href={`/user/${session?.id}/review`} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <PenBoxIcon />
              </span>
              <span className="font-medium text-gray-800">Tulis Ulasan</span>
            </div>
            <span className="text-gray-400 text-sm">Buka →</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
