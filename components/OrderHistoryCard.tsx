import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { OrderHistoryPropsTypes } from "@/lib";

const OrderHistoryCard = ({ orders }: OrderHistoryPropsTypes) => {
  return (
    <div>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.order_id} className="p-6 shadow-sm rounded-xl border border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">ID Order: {order.order_id}</h2>
                <p className="text-sm text-gray-500">Tanggal: {new Date(order.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${order.status === "settlement" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>{order.status}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 border-t pt-4">
                <Image src={order.imageUrl} alt={order.product_name} width={60} height={60} className="rounded object-cover" />
                <div className="flex justify-between w-full items-center">
                  <div>
                    <p className="font-medium text-gray-800">{order.product_name}</p>
                    <p className="text-sm text-gray-500">Jumlah: {order.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">Rp {order.total.toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryCard;
