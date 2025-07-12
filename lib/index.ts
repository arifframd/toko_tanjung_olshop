export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  stock: number;
}

export interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

export interface CartItems {
  _id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CheckoutProps {
  userId: string | undefined;
  onClose: () => void;
  imageUrl: string;
  id: string;
  quantity: number;
  price: number;
  name: string;
}

export interface TransactionProps {
  imageUrl: string;
  id: string;
  quantity: number;
  price: number;
  name: string;
  nameBuyer: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  postalCode: number;
}

export interface OrderHistoryProps {
  order_id: string;
  products: OrderProducts[];
  total: number;
  status: string;
  createdAt: any;
}

export type OrderHistoryPropsTypes = {
  orders: OrderHistoryProps[];
};

export interface OrderProducts {
  product_name: string;
  imageUrl: string;
}
