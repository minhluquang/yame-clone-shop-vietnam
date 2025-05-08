
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Áo",
    slug: "ao",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop"
  },
  {
    name: "Quần",
    slug: "quan",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop"
  },
  {
    name: "Phụ kiện",
    slug: "phu-kien",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop"
  }
];

export function CategorySection() {
  return (
    <div className="py-12">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Danh Mục Sản Phẩm</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/danh-muc/${category.slug}`}
            className="group overflow-hidden rounded-lg relative hover-scale"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
