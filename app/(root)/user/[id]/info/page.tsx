"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const UserInfoForm = () => {
  const [alamat, setAlamat] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [noHp, setNoHp] = useState("");
  const [kota, setKota] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const userId = params?.id as string;
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/info/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setAlamat(data.address || "");
          setKodePos(data.postalCode || "");
          setNoHp(data.phoneNumber || "");
          setKota(data.city || "");
        } else {
          console.warn("User info not found, lanjut isi baru");
        }
      } catch (err) {
        console.error("Gagal fetch user info:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchUserInfo();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          alamat,
          kodePos,
          noHp,
          kota,
        }),
      });

      if (res.ok) {
        alert("✅ Data berhasil disimpan!");
        router.refresh();
      } else {
        alert("❌ Gagal menyimpan data.");
      }
    } catch (err) {
      console.error("Error submit:", err);
      alert("❌ Terjadi kesalahan saat menyimpan.");
    }
  };

  if (isLoading) return <p className="text-center">⏳ Loading data...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 mt-15 bg-white rounded shadow">
      <div className="flex flex-row gap-4">
        <button type="button" onClick={() => router.back()} className="text-blue-600 font-semibold mb-2 hover:underline flex items-center gap-1">
          <span className="text-lg text-gray-700">
            <MoveLeft />
          </span>
        </button>

        <h2 className="text-xl font-bold mb-2">Informasi Pengguna</h2>
      </div>

      <div>
        <label className="block mb-1">Alamat</label>
        <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label className="block mb-1">Kota</label>
        <textarea value={kota} onChange={(e) => setKota(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label className="block mb-1">Kode Pos</label>
        <input type="number" value={kodePos} onChange={(e) => setKodePos(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label className="block mb-1">No HP</label>
        <input type="number" value={noHp} onChange={(e) => setNoHp(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Simpan
      </button>
    </form>
  );
};

export default UserInfoForm;
