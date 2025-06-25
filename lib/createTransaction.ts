import { TransactionProps } from ".";

export const createTransaction = async ({ imageUrl, id, quantity, price, name, nameBuyer, email, phone, address, city, postalCode }: TransactionProps) => {
  const order_id = `ORDER-${id}-${Date.now()}`;
  const data = {
    id: order_id,
    quantity: quantity,
    price: price,
    imageUrl: imageUrl,
    productName: name,
    nameBuyer: nameBuyer,
    email: email,
    phone: phone,
    address: address,
    city: city,
    postalCode: postalCode,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tokenizer`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const reqData = await res.json();
  return reqData.paymentUrl;
};
