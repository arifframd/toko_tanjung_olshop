export const createTransaction = async ({
  nameBuyer,
  email,
  phone,
  address,
  city,
  postalCode,
  products,
}: {
  nameBuyer: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  postalCode: number;
  products: {
    product_id: string;
    product_name: string;
    imageUrl: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
}) => {
  const order_id = `ORD-${Date.now()}`;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tokenizer`, {
    method: "POST",
    body: JSON.stringify({
      id: order_id,
      nameBuyer,
      email,
      phone,
      address,
      city,
      postalCode,
      products,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const reqData = await res.json();
  return reqData.paymentUrl;
};
