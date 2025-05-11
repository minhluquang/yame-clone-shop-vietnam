
// User types converted to JS objects/comments for reference

/*
User Address structure:
{
  id: string,
  fullName: string,
  phone: string,
  address: string,
  district: string,
  city: string,
  isDefault: boolean
}

User Order structure:
{
  id: string,
  orderNumber: string,
  date: string,
  totalAmount: number,
  status: 'processing' | 'delivered' | 'canceled',
  items: [
    {
      productId: string,
      productName: string,
      quantity: number,
      price: number,
      imageUrl: string
    }
  ]
}

User Profile structure:
{
  id: string,
  fullName: string,
  email: string,
  phone: string,
  addresses: [UserAddress],
  orders: [UserOrder]
}
*/

