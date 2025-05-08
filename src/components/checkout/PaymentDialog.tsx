
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check, CreditCard, X } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
});

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
  onPaymentComplete: () => void;
}

export function PaymentDialog({ open, onOpenChange, totalAmount, onPaymentComplete }: PaymentDialogProps) {
  const [paymentStep, setPaymentStep] = useState<"shipping" | "payment" | "complete">("shipping");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const handleSubmitShipping = (values: z.infer<typeof formSchema>) => {
    console.log("Shipping info:", values);
    setPaymentStep("payment");
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    // Giả lập gửi yêu cầu thanh toán
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Mô phỏng phản hồi thành công
      setPaymentStep("complete");
      toast({
        title: "Thanh toán thành công",
        description: "Cám ơn bạn đã mua hàng tại cửa hàng của chúng tôi.",
      });
    } catch (error) {
      toast({
        title: "Lỗi thanh toán",
        description: "Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (paymentStep === "complete") {
      onPaymentComplete();
    }
    onOpenChange(false);
    // Reset state after dialog/drawer is fully closed
    setTimeout(() => {
      setPaymentStep("shipping");
      setPaymentMethod("cod");
      form.reset();
    }, 300);
  };

  const Content = (
    <>
      {paymentStep === "shipping" && (
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitShipping)} className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
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
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Đường ABC, Quận XYZ, TP. HCM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button type="submit" className="w-full">Tiếp tục</Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {paymentStep === "payment" && (
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Chọn phương thức thanh toán:</h3>
            
            <div className="space-y-2">
              <div 
                className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer ${paymentMethod === "bank" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setPaymentMethod("bank")}
              >
                <div className={`w-5 h-5 rounded-full border ${paymentMethod === "bank" ? "bg-primary border-primary" : "border-gray-300"} flex items-center justify-center`}>
                  {paymentMethod === "bank" && <Check className="h-3 w-3 text-white" />}
                </div>
                <CreditCard className="h-5 w-5" />
                <span>Thanh toán online qua ngân hàng</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer ${paymentMethod === "cod" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className={`w-5 h-5 rounded-full border ${paymentMethod === "cod" ? "bg-primary border-primary" : "border-gray-300"} flex items-center justify-center`}>
                  {paymentMethod === "cod" && <Check className="h-3 w-3 text-white" />}
                </div>
                <span>Thanh toán khi nhận hàng (COD)</span>
              </div>
            </div>
          </div>

          {paymentMethod === "bank" && (
            <div className="border border-blue-200 bg-blue-50 rounded p-4 text-sm">
              <h4 className="font-medium mb-2">Hướng dẫn thanh toán qua ngân hàng:</h4>
              <div className="space-y-2">
                <p>Ngân hàng: <span className="font-medium">VCB - Vietcombank</span></p>
                <p>Số tài khoản: <span className="font-medium">1234567890</span></p>
                <p>Chủ tài khoản: <span className="font-medium">CÔNG TY TNHH XYZ</span></p>
                <p>Nội dung: <span className="font-medium">Thanh toan don hang online</span></p>
                <p className="text-xs text-gray-600">Sau khi chuyển khoản, vui lòng nhấn "Xác nhận thanh toán" để hoàn tất</p>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-1 font-medium">
            <div className="flex justify-between">
              <span>Tổng thanh toán:</span>
              <span>{totalAmount.toLocaleString()}₫</span>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handlePaymentSubmit} 
              className="w-full" 
              disabled={isProcessing}
            >
              {isProcessing 
                ? "Đang xử lý..." 
                : paymentMethod === "bank" 
                  ? "Xác nhận thanh toán" 
                  : "Hoàn tất đặt hàng"}
            </Button>
          </div>
        </div>
      )}

      {paymentStep === "complete" && (
        <div className="py-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">Đặt hàng thành công!</h3>
          <p className="text-gray-500 text-center mb-6">
            Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. 
            Đơn hàng của bạn đang được xử lý.
          </p>
          <Button onClick={handleClose}>Đóng</Button>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {paymentStep === "shipping" && "Thông tin giao hàng"}
              {paymentStep === "payment" && "Thanh toán"}
              {paymentStep === "complete" && "Đặt hàng thành công"}
            </DrawerTitle>
            {paymentStep !== "complete" && (
              <DrawerDescription>
                {paymentStep === "shipping" && "Vui lòng nhập thông tin giao hàng của bạn"}
                {paymentStep === "payment" && "Chọn phương thức thanh toán"}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div className="px-4 pb-4">
            {Content}
          </div>
          <DrawerFooter>
            {paymentStep !== "complete" && (
              <Button variant="outline" onClick={handleClose}>
                Hủy
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {paymentStep === "shipping" && "Thông tin giao hàng"}
            {paymentStep === "payment" && "Thanh toán"}
            {paymentStep === "complete" && "Đặt hàng thành công"}
          </DialogTitle>
          {paymentStep !== "complete" && (
            <DialogDescription>
              {paymentStep === "shipping" && "Vui lòng nhập thông tin giao hàng của bạn"}
              {paymentStep === "payment" && "Chọn phương thức thanh toán"}
            </DialogDescription>
          )}
        </DialogHeader>
        {Content}
        {paymentStep !== "complete" && (
          <Button variant="outline" size="icon" className="absolute right-4 top-4" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
