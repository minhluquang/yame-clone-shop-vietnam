
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Check, Package } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

// Form schema for address validation
const addressSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  city: z.string().min(1, "Vui lòng nhập thành phố"),
  note: z.string().optional(),
});

// Form schema for payment method
const paymentSchema = z.object({
  paymentMethod: z.enum(["bank", "cod"]),
});

const CheckoutPage = () => {
  const { state } = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addresses, setAddresses] = useState([
    { 
      id: "1", 
      fullName: "Nguyễn Văn A", 
      phone: "0912345678", 
      address: "123 Đường ABC", 
      city: "TP. Hồ Chí Minh",
      isDefault: true
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);

  // Form setup for address input
  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      note: "",
    },
  });

  // Form setup for payment method
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "cod",
    },
  });

  useEffect(() => {
    // If we don't have state from navigation, redirect back to cart
    if (!state || !state.cartItems || !state.selectedItems) {
      navigate("/gio-hang");
      return;
    }

    setCartItems(state.cartItems);
    setSelectedItems(state.selectedItems);
  }, [state, navigate]);

  // Calculate order summary
  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
  
  const shippingFee = subtotal >= 300000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    setIsNewAddress(false);
  };

  const handleNewAddressSubmit = (values) => {
    const newAddress = {
      id: Date.now().toString(),
      ...values,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddress]);
    setSelectedAddressId(newAddress.id);
    setIsNewAddress(false);
    setIsAddressSheetOpen(false);
    
    toast({
      title: "Địa chỉ đã được thêm",
      description: "Địa chỉ mới đã được thêm vào danh sách",
    });
  };

  const handlePlaceOrder = (values) => {
    setIsProcessing(true);
    
    // Get the selected address
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    
    if (!selectedAddress) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn địa chỉ giao hàng",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessDialogOpen(true);
    }, 1500);
  };

  const handleOrderComplete = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Order details */}
          <div className="lg:col-span-2">
            {/* Address selection section */}
            <div className="border rounded-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Địa chỉ giao hàng</h2>
                <Sheet open={isAddressSheetOpen} onOpenChange={setIsAddressSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">+ Thêm địa chỉ mới</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Thêm địa chỉ mới</SheetTitle>
                      <SheetDescription>
                        Nhập thông tin địa chỉ giao hàng mới của bạn
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="py-4">
                      <Form {...addressForm}>
                        <form onSubmit={addressForm.handleSubmit(handleNewAddressSubmit)} className="space-y-4">
                          <FormField
                            control={addressForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nguyễn Văn A" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={addressForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                  <Input placeholder="0912345678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={addressForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Địa chỉ</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Đường ABC, Quận XYZ" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={addressForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Thành phố</FormLabel>
                                <FormControl>
                                  <Input placeholder="TP. Hồ Chí Minh" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={addressForm.control}
                            name="note"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ghi chú (tùy chọn)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ghi chú cho shipper" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <SheetFooter className="pt-4">
                            <Button type="submit">Lưu địa chỉ</Button>
                          </SheetFooter>
                        </form>
                      </Form>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div 
                    key={address.id} 
                    className={`border rounded-lg p-4 cursor-pointer ${selectedAddressId === address.id ? "border-primary bg-primary/5" : "border-gray-200"}`}
                    onClick={() => handleSelectAddress(address.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="address" 
                          checked={selectedAddressId === address.id} 
                          onChange={() => handleSelectAddress(address.id)} 
                          className="h-4 w-4 text-primary"
                        />
                        <span className="font-medium">{address.fullName}</span>
                        {address.isDefault && (
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Mặc định</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 pl-6 text-sm text-gray-600">
                      <div>{address.phone}</div>
                      <div>{address.address}, {address.city}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order items section */}
            <div className="border rounded-md p-6 mb-6">
              <h2 className="font-bold text-lg mb-4">Sản phẩm</h2>
              <div className="space-y-4">
                {cartItems
                  .filter(item => selectedItems.includes(item.id))
                  .map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <div className="text-sm text-gray-500">
                        <span>Size: {item.size}</span>
                        <span className="mx-2">|</span>
                        <span>Màu: {item.color}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.price.toLocaleString()}₫</div>
                      <div className="text-sm text-gray-500">x{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment method section */}
            <div className="border rounded-md p-6">
              <h2 className="font-bold text-lg mb-4">Phương thức thanh toán</h2>
              <Form {...paymentForm}>
                <form className="space-y-4">
                  <FormField
                    control={paymentForm.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="space-y-3"
                          >
                            <div className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer ${field.value === "bank" ? "border-primary bg-primary/5" : ""}`}>
                              <RadioGroupItem value="bank" id="bank" />
                              <label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                                <span>Thanh toán online qua ngân hàng</span>
                              </label>
                            </div>
                            
                            <div className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer ${field.value === "cod" ? "border-primary bg-primary/5" : ""}`}>
                              <RadioGroupItem value="cod" id="cod" />
                              <label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                                <span>Thanh toán khi nhận hàng (COD)</span>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              
              {paymentForm.watch("paymentMethod") === "bank" && (
                <div className="border border-blue-200 bg-blue-50 rounded p-4 text-sm mt-4">
                  <h4 className="font-medium mb-2">Hướng dẫn thanh toán qua ngân hàng:</h4>
                  <div className="space-y-2">
                    <p>Ngân hàng: <span className="font-medium">VCB - Vietcombank</span></p>
                    <p>Số tài khoản: <span className="font-medium">1234567890</span></p>
                    <p>Chủ tài khoản: <span className="font-medium">CÔNG TY TNHH XYZ</span></p>
                    <p>Nội dung: <span className="font-medium">Thanh toan don hang online</span></p>
                    <p className="text-xs text-gray-600">Sau khi chuyển khoản, bạn sẽ nhận được email xác nhận đơn hàng</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column: Order summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-md p-6 sticky top-6">
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
                onClick={() => handlePlaceOrder(paymentForm.getValues())}
                disabled={isProcessing}
              >
                {isProcessing ? "Đang xử lý..." : "Đặt hàng"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center">Đặt hàng thành công!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Cám ơn bạn đã mua hàng tại cửa hàng của chúng tôi. 
              Đơn hàng của bạn đang được xử lý.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction onClick={handleOrderComplete}>
              Tiếp tục mua sắm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default CheckoutPage;
