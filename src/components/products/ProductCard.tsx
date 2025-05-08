
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link to={`/san-pham/${product.slug}`} className="block relative overflow-hidden rounded-md">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-brand-red">-{product.discount}%</Badge>
          )}
        </div>
        <div className="pt-3">
          <h3 className="text-sm font-medium leading-tight line-clamp-2 mb-1">{product.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">{product.price.toLocaleString()}₫</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString()}₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
