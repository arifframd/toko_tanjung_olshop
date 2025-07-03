"use server";
import { auth } from "@/auth";
import { Product } from ".";

export const handleAddToCart = async ({ quantity = 1, product }: { quantity?: number; product: Product }) => {
  const session = await auth();
  if (!session) {
    return {
      error: true,
      message: "User belum login",
    };
  }

  try {
    const data = {
      sessionId: session.id,
      product: product,
      quantity: quantity,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log("Error saat fetch cart", error.message);
    return { error: true, message: error.message };
  }
};

export const fetchAllProduct = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`);
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.log("Error saat mengambil semua produk", error);
  }
};

export const fetchCartByUserId = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart/${id}`);
    const { products } = await res.json();
    return products;
  } catch (error) {
    console.log("Error saat fetching cart ", error);
  }
};

export const deleteProductCart = async (id: string, productId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart/${id}/delete/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error saat fetching delete produk cart: ", err);
  }
};

export const fetchOrderHistory = async (name: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/transactions/history/${name}`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log("Error saat fetching order histori ", err);
  }
};

export const createReviewUser = async (userId: string, rating: number, review: string) => {
  try {
    const data = {
      userId: userId,
      rating: rating,
      review: review,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/review`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (err) {
    console.log("Error saat fetching review ", err);
  }
};

export const fetchBestSellerProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/best`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log("Error saat fetching best seller products", err);
    return [];
  }
};
