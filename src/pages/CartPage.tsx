
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { PaymentDialog } from "@/components/checkout/PaymentDialog";

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Áo Thun Cổ Tròn Đơn Giản",
    price: 185000,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop",
    quantity: 1,
    size: "M",
    color: "Đen"
  },
  {
    id: "3",
    name: "Áo Khoác Dù Unisex",
    price: 355000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
    quantity: 2,
    size: "L",
    color: "Đen"
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedItems, setSelectedItems] = useState<string[]>(initialCartItems.map(item => item.id));
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng."
    });
  };

  const toggleSelectItem = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const toggleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(cartItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  
  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
  
  const shippingFee = subtotal >= 300000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;
  
  const handlePaymentComplete = () => {
    // Xóa các sản phẩm đã thanh toán khỏi giỏ hàng
    const remainingItems = cartItems.filter(item => !selectedItems.includes(item.id));
    setCartItems(remainingItems);
    setSelectedItems([]);
    
    toast({
      title: "Đặt hàng thành công",
      description: "Đơn hàng của bạn đã được xác nhận."
    });
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-4">Giỏ hàng của bạn đang trống</h2>
            <Button asChild>
              <Link to="/">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-md">
                <div className="bg-gray-50 px-6 py-4 rounded-t-md hidden sm:grid grid-cols-12 text-sm font-medium">
                  <div className="col-span-6 flex items-center gap-3">
                    <Checkbox 
                      id="select-all" 
                      checked={allSelected}
                      onCheckedChange={(checked) => toggleSelectAll(!!checked)} 
                    />
                    <label htmlFor="select-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Sản phẩm
                    </label>
                  </div>
                  <div className="col-span-2">Giá</div>
                  <div className="col-span-2">Số lượng</div>
                  <div className="col-span-2 text-right">Tổng</div>
                </div>
                
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="border-t first:border-t-0">
                    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Mobile: Product, Desktop: Product with info */}
                      <div className="sm:col-span-6 flex gap-4">
                        <div className="flex items-center">
                          <Checkbox 
                            id={`select-${item.id}`} 
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => toggleSelectItem(item.id, !!checked)}
                          />
                        </div>
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            <div>Size: {item.size}</div>
                            <div>Màu: {item.color}</div>
                          </div>
                          <button
                            className="text-red-500 text-sm flex items-center gap-1 mt-2 sm:hidden"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="sm:col-span-2 text-sm">
                        <div className="sm:hidden font-medium">Giá:</div>
                        {item.price.toLocaleString()}₫
                      </div>
                      
                      {/* Quantity */}
                      <div className="sm:col-span-2">
                        <div className="sm:hidden font-medium mb-2">Số lượng:</div>
                        <div className="flex items-center border border-gray-300 rounded-md w-fit">
                          <button
                            className="px-2 py-1"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <MinusIcon className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 border-x border-gray-300 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="sm:col-span-2 text-right">
                        <div className="sm:hidden font-medium">Tổng:</div>
                        <div className="font-medium">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </div>
                        <button
                          className="text-red-500 text-sm hidden sm:flex items-center gap-1 justify-end mt-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-md p-6">
                <h2 className="font-bold text-lg mb-4">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{subtotal.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}₫`}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold mb-6">
                  <span>Tổng cộng</span>
                  <span>{total.toLocaleString()}₫</span>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={selectedItems.length === 0}
                  onClick={() => setPaymentDialogOpen(true)}
                >
                  Thanh toán
                </Button>
                
                <div className="mt-4 text-center">
                  <Link to="/" className="text-sm text-navy hover:underline">
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Payment Dialog Component */}
        <PaymentDialog 
          open={paymentDialogOpen} 
          onOpenChange={setPaymentDialogOpen}
          totalAmount={total}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </Layout>
  );
};

export default CartPage;
