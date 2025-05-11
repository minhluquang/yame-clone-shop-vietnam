
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Check, CreditCard, MapPin, Package, ShoppingCart, Truck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Step type definition
type CheckoutStep = "address" | "payment" | "confirmation";

const CheckoutSteps = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address");
  const [cartItems, setCartItems] = useState(state?.cartItems || []);
  const [selectedItems, setSelectedItems] = useState(state?.selectedItems || []);
  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });
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
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  // Calculate order summary
  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
  
  const shippingFee = subtotal >= 300000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  // Handle redirect if no items selected
  React.useEffect(() => {
    if (!state || !state.cartItems || !state.selectedItems || state.selectedItems.length === 0) {
      navigate("/gio-hang");
    }
  }, [state, navigate]);

  const handleNextStep = () => {
    if (currentStep === "address") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      handlePlaceOrder();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "payment") {
      setCurrentStep("address");
    }
  };

  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);
    setShowAddAddressForm(false);
  };

  const handleAddNewAddress = () => {
    if (!newAddress.fullName || !newAddress.phone || !newAddress.address || !newAddress.city) {
      toast({
        title: "Thông tin chưa đầy đủ",
        description: "Vui lòng điền đầy đủ thông tin địa chỉ",
        variant: "destructive",
      });
      return;
    }

    const newAddressEntry = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddressEntry]);
    setSelectedAddressId(newAddressEntry.id);
    setShowAddAddressForm(false);
    setNewAddress({ fullName: "", phone: "", address: "", city: "" });
    
    toast({
      title: "Thêm địa chỉ thành công",
      description: "Địa chỉ mới đã được thêm vào danh sách",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handlePlaceOrder = () => {
    setIsProcessingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessingOrder(false);
      setIsOrderComplete(true);
      setCurrentStep("confirmation");
    }, 1500);
  };

  const handleOrderComplete = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            <div className="flex items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep === "address" || currentStep === "payment" || currentStep === "confirmation" ? "bg-primary text-white" : "bg-gray-200"}`}>
                <MapPin className="h-5 w-5" />
              </div>
              <span className={`ml-2 font-medium ${currentStep === "address" ? "text-primary" : "text-gray-500"}`}>Địa chỉ</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${currentStep === "payment" || currentStep === "confirmation" ? "bg-primary" : "bg-gray-200"}`}></div>
            
            <div className="flex items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep === "payment" || currentStep === "confirmation" ? "bg-primary text-white" : "bg-gray-200"}`}>
                <CreditCard className="h-5 w-5" />
              </div>
              <span className={`ml-2 font-medium ${currentStep === "payment" ? "text-primary" : "text-gray-500"}`}>Thanh toán</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${currentStep === "confirmation" ? "bg-primary" : "bg-gray-200"}`}></div>
            
            <div className="flex items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep === "confirmation" ? "bg-primary text-white" : "bg-gray-200"}`}>
                <Check className="h-5 w-5" />
              </div>
              <span className={`ml-2 font-medium ${currentStep === "confirmation" ? "text-primary" : "text-gray-500"}`}>Hoàn tất</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Content based on current step */}
          <div className="lg:col-span-2">
            {currentStep === "address" && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Địa chỉ giao hàng
                      </h2>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowAddAddressForm(true)}
                      >
                        + Thêm địa chỉ mới
                      </Button>
                    </div>

                    {showAddAddressForm ? (
                      <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="font-medium">Thêm địa chỉ mới</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <Input 
                              id="fullName" 
                              name="fullName" 
                              value={newAddress.fullName}
                              onChange={handleInputChange}
                              placeholder="Nguyễn Văn A" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input 
                              id="phone" 
                              name="phone" 
                              value={newAddress.phone}
                              onChange={handleInputChange}
                              placeholder="0912345678" 
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input 
                              id="address" 
                              name="address" 
                              value={newAddress.address}
                              onChange={handleInputChange}
                              placeholder="123 Đường ABC, Quận XYZ" 
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="city">Thành phố</Label>
                            <Input 
                              id="city" 
                              name="city" 
                              value={newAddress.city}
                              onChange={handleInputChange}
                              placeholder="TP. Hồ Chí Minh" 
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAddAddressForm(false)}
                          >
                            Hủy
                          </Button>
                          <Button onClick={handleAddNewAddress}>
                            Lưu địa chỉ
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {addresses.map((address) => (
                          <div 
                            key={address.id} 
                            className={`border rounded-lg p-4 cursor-pointer ${selectedAddressId === address.id ? "border-primary bg-primary/5" : "border-gray-200"}`}
                            onClick={() => handleAddressSelect(address.id)}
                          >
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-5 h-5 rounded-full border ${selectedAddressId === address.id ? "bg-primary border-primary" : "border-gray-300"} flex items-center justify-center`}>
                                  {selectedAddressId === address.id && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className="font-medium">{address.fullName}</span>
                                {address.isDefault && (
                                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Mặc định</span>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 pl-7 text-sm text-gray-600">
                              <div>{address.phone}</div>
                              <div>{address.address}, {address.city}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <Package className="h-5 w-5" />
                      Sản phẩm
                    </h2>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead className="text-right">Giá</TableHead>
                          <TableHead className="text-center">Số lượng</TableHead>
                          <TableHead className="text-right">Tổng</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems
                          .filter(item => selectedItems.includes(item.id))
                          .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                                </div>
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {item.color && <span>Màu: {item.color}</span>}
                                    {item.color && item.size && <span className="mx-1">|</span>}
                                    {item.size && <span>Size: {item.size}</span>}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{item.price.toLocaleString()}₫</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right font-medium">{(item.price * item.quantity).toLocaleString()}₫</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === "payment" && (
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Phương thức thanh toán
                  </h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={handlePaymentMethodChange}
                    className="space-y-3"
                  >
                    <div className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer ${paymentMethod === "bank" ? "border-primary bg-primary/5" : ""}`}>
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5" />
                        <span>Thanh toán online qua ngân hàng</span>
                      </Label>
                    </div>
                    
                    <div className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer ${paymentMethod === "cod" ? "border-primary bg-primary/5" : ""}`}>
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                        <Truck className="h-5 w-5" />
                        <span>Thanh toán khi nhận hàng (COD)</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "bank" && (
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

                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Xác nhận thông tin giao hàng:</h3>
                    {addresses.find(addr => addr.id === selectedAddressId) && (
                      <div className="border rounded p-3 bg-gray-50">
                        <div className="font-medium">
                          {addresses.find(addr => addr.id === selectedAddressId)?.fullName}
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>{addresses.find(addr => addr.id === selectedAddressId)?.phone}</div>
                          <div>
                            {addresses.find(addr => addr.id === selectedAddressId)?.address},
                            {addresses.find(addr => addr.id === selectedAddressId)?.city}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "confirmation" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
                <p className="text-gray-600 mb-6">
                  Cám ơn bạn đã mua hàng tại cửa hàng của chúng tôi. 
                  Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
                </p>
                <Button onClick={handleOrderComplete}>
                  Tiếp tục mua sắm
                </Button>
              </div>
            )}
          </div>

          {/* Right column: Order summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-md p-6 sticky top-6">
              <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
                <ShoppingCart className="h-5 w-5" />
                Tóm tắt đơn hàng
              </h2>
              
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
              
              {currentStep !== "confirmation" ? (
                <div className="space-y-2">
                  {currentStep === "payment" && (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handlePreviousStep}
                    >
                      Quay lại
                    </Button>
                  )}
                  <Button 
                    className="w-full" 
                    onClick={handleNextStep}
                    disabled={isProcessingOrder}
                  >
                    {isProcessingOrder ? "Đang xử lý..." : currentStep === "address" ? "Tiếp theo" : "Đặt hàng"}
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border bg-gray-50 p-3 text-sm">
                  <div className="flex items-center gap-2 mb-2 font-medium">
                    <Package className="h-4 w-4" />
                    Thông tin đơn hàng
                  </div>
                  <div className="text-gray-600 space-y-1">
                    <p>Mã đơn hàng: <span className="font-medium">DH-{Math.floor(100000 + Math.random() * 900000)}</span></p>
                    <p>Phương thức thanh toán: <span className="font-medium">{paymentMethod === "bank" ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng"}</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Complete Dialog */}
      <Dialog open={isOrderComplete} onOpenChange={setIsOrderComplete}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center">Đặt hàng thành công!</DialogTitle>
            <DialogDescription className="text-center">
              Cám ơn bạn đã mua hàng tại cửa hàng của chúng tôi. 
              Đơn hàng của bạn đang được xử lý.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={handleOrderComplete}>
              Tiếp tục mua sắm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CheckoutSteps;
