import { RouteParams } from "@/lib";
import React from "react";
import { fetchCartByUserId } from "@/lib/actions";

import CartClient from "@/components/CartClient"; // komponen client

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const cart = await fetchCartByUserId(id);

  return <CartClient userId={id} cartItems={cart || []} />;
};

export default Page;
