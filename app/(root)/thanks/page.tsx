import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Terima Kasih!</h1>
        <p className="text-gray-700 text-lg mb-6">Pembayaran Anda berhasil. Kami akan segera memproses pesanan Anda.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
