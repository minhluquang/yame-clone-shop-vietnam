
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

export function AddressManagement({ addresses, onAddAddress, onSetDefaultAddress }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    city: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAddress(formData);
    setIsOpen(false);
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      district: "",
      city: ""
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Địa chỉ giao hàng</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Thêm địa chỉ mới</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm địa chỉ mới</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="district">Quận/Huyện</Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">Tỉnh/Thành phố</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Thêm địa chỉ</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`border rounded-md p-4 ${address.isDefault ? 'border-primary' : 'border-border'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-sm text-muted-foreground">{address.phone}</p>
                  </div>
                  {address.isDefault && (
                    <div className="flex items-center text-primary text-xs bg-primary/10 px-2 py-1 rounded">
                      <Check className="h-3 w-3 mr-1" /> Mặc định
                    </div>
                  )}
                </div>
                <p className="text-sm mt-2">{address.address}</p>
                <p className="text-sm">{address.district}, {address.city}</p>
                
                {!address.isDefault && (
                  <div className="mt-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onSetDefaultAddress(address.id)}
                    >
                      Đặt làm mặc định
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Bạn chưa có địa chỉ nào
          </div>
        )}
      </CardContent>
    </Card>
  );
}
