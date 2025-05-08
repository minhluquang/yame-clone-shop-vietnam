
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container-custom py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Không tìm thấy trang bạn yêu cầu</p>
        <Button asChild>
          <Link to="/">Quay lại trang chủ</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
