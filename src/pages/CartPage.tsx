import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart items from local storage on component mount
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
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

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Navigate to multi-step checkout instead
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
            <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
            <Link to="/" className="text-blue-500 mt-4 inline-block">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-0 focus:ring-offset-0"
                  checked={selectedItems.length === cartItems.length}
                  onChange={handleSelectAll}
                />
                <span className="ml-2 text-sm text-gray-700">
                  Chọn tất cả ({cartItems.length} sản phẩm)
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border rounded-md p-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-0 focus:ring-offset-0"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                    <div className="ml-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-500 text-sm mb-2">
                    Size: {item.size}, Màu: {item.color}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-primary">{item.price.toLocaleString()}₫</div>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() =>
                          handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </Button>
                    <div className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                Tổng tiền: {subtotal.toLocaleString()}₫
              </div>
              <Button
                size="lg"
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
              >
                Thanh toán
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
