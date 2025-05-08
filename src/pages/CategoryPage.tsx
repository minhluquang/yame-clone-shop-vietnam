
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProductsByCategory } from "@/data/products";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const categoryNames: Record<string, string> = {
  "ao": "Áo",
  "quan": "Quần",
  "phu-kien": "Phụ kiện",
  "do-bo": "Đồ bộ",
  "khuyen-mai": "Khuyến mãi"
};

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const products = categorySlug ? getProductsByCategory(categorySlug) : [];
  const categoryName = categorySlug ? categoryNames[categorySlug] || categorySlug : "";

  return (
    <Layout>
      <div className="container-custom py-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold">{categoryName}</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter sidebar */}
          {isFilterOpen && (
            <div className="py-6 pr-6 border-r border-gray-200">
              <div className="mb-6">
                <h3 className="font-medium mb-3">Giá</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-1" className="mr-2" />
                    <label htmlFor="price-1">Dưới 200.000₫</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-2" className="mr-2" />
                    <label htmlFor="price-2">200.000₫ - 400.000₫</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-3" className="mr-2" />
                    <label htmlFor="price-3">Trên 400.000₫</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Kích thước</h3>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map(size => (
                    <div key={size} className="border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-100 text-sm">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Màu sắc</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Đen", code: "#000000" },
                    { name: "Trắng", code: "#FFFFFF" },
                    { name: "Xanh", code: "#0000FF" },
                    { name: "Đỏ", code: "#FF0000" }
                  ].map(color => (
                    <div 
                      key={color.name} 
                      className="w-6 h-6 rounded-full border cursor-pointer"
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Products */}
          <div className={isFilterOpen ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-4"}>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="py-12 text-center">
                <p>Không có sản phẩm nào trong danh mục này.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
