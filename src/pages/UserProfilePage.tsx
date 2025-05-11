
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PersonalInfo } from "@/components/user/PersonalInfo";
import { AddressManagement } from "@/components/user/AddressManagement";
import { OrderHistory } from "@/components/user/OrderHistory";
import { UserAddress, UserProfile } from "@/types/user";
import { mockUserData } from "@/data/mockUserData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function UserProfilePage() {
  const [user, setUser] = useState<UserProfile>(mockUserData);
  const { toast } = useToast();

  const handleUpdatePersonalInfo = (updatedInfo: Partial<UserProfile>) => {
    setUser({ ...user, ...updatedInfo });
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin cá nhân đã được cập nhật",
    });
  };

  const handleAddAddress = (address: Omit<UserAddress, "id">) => {
    const newAddress = {
      ...address,
      id: `addr${user.addresses.length + 1}`,
      isDefault: user.addresses.length === 0,
    };

    setUser({
      ...user,
      addresses: [...user.addresses, newAddress],
    });

    toast({
      title: "Thêm địa chỉ thành công",
      description: "Địa chỉ mới đã được thêm vào danh sách",
    });
  };

  const handleSetDefaultAddress = (addressId: string) => {
    const updatedAddresses = user.addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));

    setUser({
      ...user,
      addresses: updatedAddresses,
    });

    toast({
      title: "Cập nhật thành công",
      description: "Đã thay đổi địa chỉ mặc định",
    });
  };

  return (
    <Layout>
      <div className="container-custom py-6">
        <h1 className="text-2xl font-bold mb-6">Tài khoản của tôi</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Desktop sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-24">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
                <TabsList className="flex flex-col items-stretch h-auto bg-transparent border-0">
                  {["thong-tin", "dia-chi", "don-hang"].map((value, index) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="justify-start py-3 px-4 border-b last:border-b-0 data-[state=active]:bg-muted rounded-none text-left"
                    >
                      {["Thông tin tài khoản", "Địa chỉ giao hàng", "Lịch sử đơn hàng"][index]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-9">
            <Tabs defaultValue="thong-tin" className="w-full">
              {/* Mobile tabs */}
              <TabsList className="md:hidden w-full mb-6 flex justify-start overflow-x-auto">
                <TabsTrigger value="thong-tin">Thông tin tài khoản</TabsTrigger>
                <TabsTrigger value="dia-chi">Địa chỉ giao hàng</TabsTrigger>
                <TabsTrigger value="don-hang">Lịch sử đơn hàng</TabsTrigger>
              </TabsList>

              <TabsContent value="thong-tin">
                <PersonalInfo user={user} onUpdate={handleUpdatePersonalInfo} />
              </TabsContent>

              <TabsContent value="dia-chi">
                <AddressManagement
                  addresses={user.addresses}
                  onAddAddress={handleAddAddress}
                  onSetDefaultAddress={handleSetDefaultAddress}
                />
              </TabsContent>

              <TabsContent value="don-hang">
                <OrderHistory orders={user.orders} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
