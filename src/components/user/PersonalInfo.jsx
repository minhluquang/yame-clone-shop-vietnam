
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

export function PersonalInfo({ user, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsOpen(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          Thông tin cá nhân
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Chỉnh sửa thông tin</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
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
                </div>
                <DialogFooter>
                  <Button type="submit">Lưu thay đổi</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="text-sm font-medium text-muted-foreground">Họ và tên:</div>
            <div className="md:col-span-2">{user.fullName}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="text-sm font-medium text-muted-foreground">Email:</div>
            <div className="md:col-span-2">{user.email}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="text-sm font-medium text-muted-foreground">Số điện thoại:</div>
            <div className="md:col-span-2">{user.phone}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
