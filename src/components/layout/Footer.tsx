
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">YAME</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Thương hiệu thời trang hàng đầu dành cho giới trẻ Việt Nam với
              phong cách trẻ trung, năng động và luôn cập nhật xu hướng mới nhất.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/" className="hover:text-white">Trang chủ</Link>
              </li>
              <li>
                <Link to="/danh-muc/ao" className="hover:text-white">Áo</Link>
              </li>
              <li>
                <Link to="/danh-muc/quan" className="hover:text-white">Quần</Link>
              </li>
              <li>
                <Link to="/danh-muc/phu-kien" className="hover:text-white">Phụ kiện</Link>
              </li>
              <li>
                <Link to="/danh-muc/khuyen-mai" className="hover:text-white">Khuyến mãi</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Chính sách</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/chinh-sach/thanh-toan" className="hover:text-white">Chính sách thanh toán</Link>
              </li>
              <li>
                <Link to="/chinh-sach/van-chuyen" className="hover:text-white">Chính sách vận chuyển</Link>
              </li>
              <li>
                <Link to="/chinh-sach/bao-hanh" className="hover:text-white">Chính sách bảo hành</Link>
              </li>
              <li>
                <Link to="/chinh-sach/doi-tra" className="hover:text-white">Chính sách đổi trả</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>0123 456 789</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@yame.com</span>
              </p>
              <p>
                Số 123 Nguyễn Trãi, Quận 1, TP HCM
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-gray-700 text-center text-gray-400 text-xs">
          <p>© 2025 YAME. Tất cả các quyền được bảo lưu</p>
        </div>
      </div>
    </footer>
  );
}
