
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AddressManagement({ addresses, onAddAddress, onSetDefaultAddress }) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSelectDialogOpen, setIsSelectDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    city: "",
  });

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAddress(newAddress);
    setNewAddress({
      fullName: "",
      phone: "",
      address: "",
      district: "",
      city: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleSetDefault = (addressId) => {
    onSetDefaultAddress(addressId);
    setIsSelectDialogOpen(false);
  };

  const defaultAddress = addresses.find(addr => addr.isDefault) || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          Địa chỉ giao hàng
          <div className="flex gap-2">
            <Dialog open={isSelectDialogOpen} onOpenChange={setIsSelectDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Đổi địa chỉ mặc định</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chọn địa chỉ mặc định</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {addresses.length > 0 ? (
                    <RadioGroup defaultValue={defaultAddress.id} className="space-y-4">
                      {addresses.map(address => (
                        <div key={address.id} className="flex items-start space-x-3 border p-3 rounded-md">
                          <RadioGroupItem value={address.id} id={address.id} />
                          <div className="flex-1">
                            <Label htmlFor={address.id} className="font-medium">
                              {address.fullName} | {address.phone}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {address.address}, {address.district}, {address.city}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">
                      Bạn chưa có địa chỉ nào
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => handleSetDefault(document.querySelector('input[name="radix-:rh:"]:checked')?.value)}>
                    Xác nhận
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>Thêm địa chỉ</Button>
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
                        value={newAddress.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        name="address"
                        value={newAddress.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="district">Quận/Huyện</Label>
                        <Input
                          id="district"
                          name="district"
                          value={newAddress.district}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="city">Tỉnh/Thành phố</Label>
                        <Input
                          id="city"
                          name="city"
                          value={newAddress.city}
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
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 ? (
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{defaultAddress.fullName}</div>
                <div className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">Mặc định</div>
              </div>
              <div className="text-sm">{defaultAddress.phone}</div>
              <div className="text-sm text-muted-foreground">
                {defaultAddress.address}, {defaultAddress.district}, {defaultAddress.city}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-2">
              Bạn có {addresses.length} địa chỉ đã lưu
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
