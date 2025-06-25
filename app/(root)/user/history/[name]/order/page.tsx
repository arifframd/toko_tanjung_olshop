"use client";

import OrderHistoryCard from "@/components/OrderHistoryCard";
import { OrderHistoryProps } from "@/lib";
import { fetchOrderHistory } from "@/lib/actions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Dummy data
// const orders = [
//   {
//     id: "ORD123456",
//     date: "2025-06-15",
//     items: [
//       {
//         name: "Ban Swallow",
//         imageUrl: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
//         quantity: 2,
//         price: 150000,
//       },
//     ],
//     status: "Selesai",
//   },
//   {
//     id: "ORD123457",
//     date: "2025-06-10",
//     items: [
//       {
//         name: "Ban Luar Gerobak",
//         imageUrl: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
//         quantity: 1,
//         price: 175000,
//       },
//       {
//         name: "Ban Dalam",
//         imageUrl: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
//         quantity: 2,
//         price: 70000,
//       },
//     ],
//     status: "Diproses",
//   },
// ];

const OrderHistoryPage = () => {
  const { name } = useParams<{ name: string }>();
  const [order, setOrder] = useState<OrderHistoryProps[]>();
  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetchOrderHistory(name);
      setOrder(res);
      return res;
    };
    fetchOrder();
  }, [name]);
  console.log(order);
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Riwayat Order</h1>

      <OrderHistoryCard orders={order ?? []} />
    </div>
  );
};

export default OrderHistoryPage;
