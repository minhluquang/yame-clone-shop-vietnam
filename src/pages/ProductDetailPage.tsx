
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getProductBySlug, getProductsByCategory, Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { toast } = useToast();
  
  const relatedProducts: Product[] = product 
    ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
          <p>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </Layout>
    );
  }
  
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  const addToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Vui lòng chọn kích thước",
        description: "Hãy chọn kích thước trước khi thêm vào giỏ hàng.",
        variant: "destructive"
      });
      return;
    }
    
    if (product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Vui lòng chọn màu sắc",
        description: "Hãy chọn màu sắc trước khi thêm vào giỏ hàng.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Đã thêm vào giỏ hàng!",
      description: `${product.name} (${quantity}) đã được thêm vào giỏ hàng.`
    });
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-md">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded-md overflow-hidden w-20 h-20 flex-shrink-0 ${
                      selectedImage === index ? "border-navy" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Hình ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-xl font-bold">{product.price.toLocaleString()}₫</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}₫
                  </span>
                  <Badge className="bg-brand-red">-{product.discount}%</Badge>
                </>
              )}
            </div>
            
            {/* Sizes */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Kích thước</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <div
                    key={size}
                    className={`border rounded-md px-4 py-2 cursor-pointer transition-colors ${
                      selectedSize === size
                        ? "border-navy bg-navy text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Màu sắc</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <div
                      key={color.name}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectedColor === color.name
                          ? "border-navy"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Số lượng</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  className="px-3 py-2"
                  onClick={decreaseQuantity}
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  className="px-3 py-2"
                  onClick={increaseQuantity}
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Add to cart */}
            <div className="mt-8">
              <Button 
                className="w-full sm:w-auto flex items-center gap-2" 
                size="lg"
                onClick={addToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Thêm vào giỏ hàng</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-navy">
                Chi tiết sản phẩm
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-navy">
                Vận chuyển & Đổi trả
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <h3 className="font-medium mb-2">Chính sách vận chuyển</h3>
              <p className="text-gray-700 mb-4">Giao hàng miễn phí cho đơn hàng từ 300.000₫. Thời gian giao hàng từ 2-5 ngày tùy khu vực.</p>
              
              <h3 className="font-medium mb-2">Chính sách đổi trả</h3>
              <p className="text-gray-700">YAME hỗ trợ đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên tem mác, chưa qua sử dụng.</p>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <ProductGrid products={relatedProducts} title="Sản phẩm liên quan" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
