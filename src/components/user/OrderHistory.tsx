
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { UserOrder } from "@/types/user";

interface OrderHistoryProps {
  orders: UserOrder[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "processing":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">Đang xử lý</span>;
      case "delivered":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">Đã giao</span>;
      case "canceled":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs">Đã hủy</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">{status}</span>;
    }
  };

  const openOrderDetails = (order: UserOrder) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Lịch sử đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>{getStatusLabel(order.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => openOrderDetails(order)}>
                        Xem chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Bạn chưa có đơn hàng nào
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                Chi tiết đơn hàng #{selectedOrder?.orderNumber}
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày đặt hàng</p>
                    <p>{new Date(selectedOrder.date).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <p>{getStatusLabel(selectedOrder.status)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Sản phẩm</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.productId} className="flex gap-3 border-b pb-3">
                        <div className="w-16 h-16 bg-gray-100 rounded">
                          <img 
                            src={item.imageUrl} 
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm">
                            {formatCurrency(item.price)} x {item.quantity}
                          </p>
                          <p className="font-medium mt-1">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between py-1">
                    <span>Tổng tiền sản phẩm:</span>
                    <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
