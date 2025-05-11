
export interface UserAddress {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  isDefault: boolean;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  totalAmount: number;
  status: 'processing' | 'delivered' | 'canceled';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addresses: UserAddress[];
  orders: UserOrder[];
}
