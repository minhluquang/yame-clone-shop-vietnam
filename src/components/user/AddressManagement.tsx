
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserAddress } from "@/types/user";

interface AddressManagementProps {
  addresses: UserAddress[];
  onAddAddress: (address: Omit<UserAddress, "id">) => void;
  onSetDefaultAddress: (addressId: string) => void;
}

export function AddressManagement({
  addresses,
  onAddAddress,
  onSetDefaultAddress
}: AddressManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSelectDialogOpen, setIsSelectDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>(
    addresses.find(a => a.isDefault)?.id || ""
  );
  const [newAddress, setNewAddress] = useState<Omit<UserAddress, "id" | "isDefault">>({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    city: ""
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress({ ...newAddress, isDefault: false });
    setNewAddress({
      fullName: "",
      phone: "",
      address: "",
      district: "",
      city: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleDefaultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetDefaultAddress(selectedAddress);
    setIsSelectDialogOpen(false);
  };

  const defaultAddress = addresses.find(addr => addr.isDefault);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Quản lý địa chỉ giao hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Địa chỉ mặc định</h3>
          {defaultAddress ? (
            <div className="p-4 border rounded-md">
              <div className="font-medium">{defaultAddress.fullName}</div>
              <div className="text-sm mt-1">{defaultAddress.phone}</div>
              <div className="text-sm mt-1">
                {defaultAddress.address}, {defaultAddress.district}, {defaultAddress.city}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">Chưa có địa chỉ mặc định</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-start">
        <Dialog open={isSelectDialogOpen} onOpenChange={setIsSelectDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={addresses.length <= 1}>
              Thay đổi địa chỉ mặc định
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chọn địa chỉ mặc định</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleDefaultSubmit}>
              <RadioGroup 
                value={selectedAddress} 
                onValueChange={setSelectedAddress}
                className="mt-4 space-y-3"
              >
                {addresses.map(address => (
                  <div key={address.id} className="flex items-start space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <div className="flex-1">
                      <Label htmlFor={address.id} className="block font-medium">
                        {address.fullName}
                      </Label>
                      <div className="text-sm mt-1">{address.phone}</div>
                      <div className="text-sm mt-1">
                        {address.address}, {address.district}, {address.city}
                      </div>
                      {address.isDefault && (
                        <span className="mt-2 inline-block px-2 py-1 bg-primary/10 text-xs rounded">
                          Mặc định
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <DialogFooter className="mt-4">
                <Button type="submit">Đặt làm mặc định</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Thêm địa chỉ mới</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm địa chỉ mới</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    name="address"
                    value={newAddress.address}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="district">Quận/Huyện</Label>
                    <Input
                      id="district"
                      name="district"
                      value={newAddress.district}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">Tỉnh/Thành phố</Label>
                    <Input
                      id="city"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
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
      </CardFooter>
    </Card>
  );
}
