
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample cart data for demonstration
const sampleCartItems = [
  {
    id: "1",
    name: "Áo phông trắng basic",
    price: 199000,
    quantity: 1,
    size: "L",
    color: "Trắng",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Quần jean nam slim fit",
    price: 499000,
    quantity: 1,
    size: "32",
    color: "Xanh đậm",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Giày thể thao nữ",
    price: 850000,
    quantity: 1,
    size: "38",
    color: "Hồng",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop",
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // For demo purposes, load sample data if cart is empty
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems && JSON.parse(storedCartItems).length > 0) {
      setCartItems(JSON.parse(storedCartItems));
      // Select all items by default
      setSelectedItems(JSON.parse(storedCartItems).map(item => item.id));
    } else {
      // Add sample items to cart if empty
      setCartItems(sampleCartItems);
      // Select all sample items by default
      setSelectedItems(sampleCartItems.map(item => item.id));
      // Store sample items in localStorage
      localStorage.setItem("cartItems", JSON.stringify(sampleCartItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to local storage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    setSelectedItems(selectedItems.filter((id) => id !== itemId));
    toast({
      title: "Sản phẩm đã được xóa",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng của bạn.",
    });
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  // Calculate order summary
  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
  
  const discount = subtotal > 1000000 ? subtotal * 0.1 : 0; // 10% discount for orders over 1,000,000₫
  const shippingFee = subtotal >= 300000 ? 0 : 30000;
  const total = subtotal - discount + shippingFee;

  const handleRemoveAll = () => {
    if (selectedItems.length === 0) return;
    
    const updatedCartItems = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(updatedCartItems);
    setSelectedItems([]);
    toast({
      title: "Đã xóa các sản phẩm đã chọn",
      description: `${selectedItems.length} sản phẩm đã được xóa khỏi giỏ hàng.`,
    });
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Chưa có sản phẩm nào được chọn",
        description: "Vui lòng chọn ít nhất một sản phẩm để thanh toán.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to multi-step checkout
    navigate("/thanh-toan-buoc", { 
      state: { 
        cartItems, 
        selectedItems 
      } 
    });
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống.</p>
            <Link to="/">
              <Button>Tiếp tục mua sắm</Button>
            </Link>
          </div>
        ) : (
          <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-1 lg:grid-cols-3 gap-8"}`}>
            {/* Left column: Cart items */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-0 focus:ring-offset-0"
                        checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                        onChange={handleSelectAll}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Chọn tất cả ({cartItems.length})
                      </span>
                    </label>
                    <Button 
                      onClick={handleRemoveAll} 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:bg-red-50"
                      disabled={selectedItems.length === 0}
                    >
                      Xóa
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-t first:border-t-0">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-0 focus:ring-offset-0"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </div>
                        
                        <div className="flex-shrink-0 w-16 h-16">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <div className="text-xs text-gray-500 my-1">
                            <span>Size: {item.size}</span>
                            <span className="mx-1">|</span>
                            <span>Màu: {item.color}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="font-medium text-primary">
                              {item.price.toLocaleString()}₫
                            </div>
                            <div className="flex items-center border rounded">
                              <button
                                className="px-2.5 py-1 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3">{item.quantity}</span>
                              <button
                                className="px-2.5 py-1 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column: Order summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      placeholder="Mã giảm giá"
                      className="h-10 border-r-0 border focus:ring-0 focus:border-gray-300 rounded-l-md w-full px-3"
                    />
                    <Button variant="default" className="h-10 rounded-l-none">Áp dụng</Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="font-medium">{subtotal.toLocaleString()}₫</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-red-500">
                        <span>Giảm giá (10%)</span>
                        <span>-{discount.toLocaleString()}₫</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span>{shippingFee > 0 ? `${shippingFee.toLocaleString()}₫` : "Miễn phí"}</span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between text-base font-semibold">
                      <span>Tổng cộng</span>
                      <span>{total.toLocaleString()}₫</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6"
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                  >
                    Đến trang thanh toán
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
