import { auth } from "@/auth";
import ProductDetail from "@/components/ProductDetail";
import { RouteParams } from "@/lib";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const session = await auth();
  const { id } = await params;
  const user = session?.id;
  console.log("User session:", user);
  return <ProductDetail userId={user} id={id} />;
};

export default page;
