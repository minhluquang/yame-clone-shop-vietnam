
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  tags: string[];
  description: string;
  sizes: string[];
  colors: {
    name: string;
    code: string;
  }[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Áo Thun Cổ Tròn Đơn Giản",
    slug: "ao-thun-co-tron-don-gian",
    price: 185000,
    originalPrice: 250000,
    discount: 26,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&auto=format&fit=crop"
    ],
    category: "ao",
    tags: ["áo thun", "áo cổ tròn"],
    description: "Áo thun cổ tròn basic chất liệu cotton cao cấp, thiết kế đơn giản, phù hợp với mọi phong cách.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Trắng", code: "#FFFFFF" },
      { name: "Xám", code: "#808080" }
    ],
    featured: true
  },
  {
    id: "2",
    name: "Quần Jean Nam Slim Fit",
    slug: "quan-jean-nam-slim-fit",
    price: 425000,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&auto=format&fit=crop"
    ],
    category: "quan",
    tags: ["quần jean", "slim fit"],
    description: "Quần jean nam form slim fit, chất liệu jean co giãn thoải mái, màu xanh đậm trẻ trung.",
    sizes: ["29", "30", "31", "32", "33"],
    colors: [
      { name: "Xanh đậm", code: "#0F3D68" }
    ],
    featured: true
  },
  {
    id: "3",
    name: "Áo Khoác Dù Unisex",
    slug: "ao-khoac-du-unisex",
    price: 355000,
    originalPrice: 450000,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519211777646-3a7e4d30d87e?w=800&auto=format&fit=crop"
    ],
    category: "ao",
    tags: ["áo khoác", "unisex"],
    description: "Áo khoác dù unisex phong cách thể thao, chống nước nhẹ, có mũ trùm và túi tiện lợi.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh rêu", code: "#4B5320" }
    ],
    featured: true
  },
  {
    id: "4",
    name: "Quần Short Kaki Nam",
    slug: "quan-short-kaki-nam",
    price: 275000,
    images: [
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=800&auto=format&fit=crop"
    ],
    category: "quan",
    tags: ["quần short", "kaki"],
    description: "Quần short kaki nam trẻ trung, thiết kế basic với túi thời trang, form regular fit.",
    sizes: ["28", "29", "30", "31", "32", "33"],
    colors: [
      { name: "Kem", code: "#E8E6D9" },
      { name: "Đen", code: "#000000" },
      { name: "Xám", code: "#808080" }
    ]
  },
  {
    id: "5",
    name: "Áo Polo Nam Basic",
    slug: "ao-polo-nam-basic",
    price: 215000,
    originalPrice: 285000,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop"
    ],
    category: "ao",
    tags: ["áo polo", "nam"],
    description: "Áo polo nam thiết kế basic, form suông thoải mái, chất liệu cotton co giãn, mềm mịn.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Trắng", code: "#FFFFFF" },
      { name: "Đen", code: "#000000" },
      { name: "Xanh navy", code: "#000080" }
    ]
  },
  {
    id: "6",
    name: "Áo Sơ Mi Nam Tay Dài",
    slug: "ao-so-mi-nam-tay-dai",
    price: 295000,
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511105612320-2e62a04dd044?w=800&auto=format&fit=crop"
    ],
    category: "ao",
    tags: ["áo sơ mi", "tay dài"],
    description: "Áo sơ mi nam tay dài, form slim fit, thiết kế đơn giản với một túi ngực, chất liệu cotton pha.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Trắng", code: "#FFFFFF" },
      { name: "Xanh nhạt", code: "#ADD8E6" }
    ],
    featured: true
  },
  {
    id: "7",
    name: "Quần Tây Nam Công Sở",
    slug: "quan-tay-nam-cong-so",
    price: 395000,
    images: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop"
    ],
    category: "quan",
    tags: ["quần tây", "công sở"],
    description: "Quần tây nam công sở kiểu dáng slim fit, chất liệu cao cấp, thiết kế lịch lãm.",
    sizes: ["29", "30", "31", "32", "33", "34"],
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh đen", code: "#1B2430" }
    ]
  },
  {
    id: "8",
    name: "Nón Bucket Unisex",
    slug: "non-bucket-unisex",
    price: 155000,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop"
    ],
    category: "phu-kien",
    tags: ["nón", "bucket", "unisex"],
    description: "Nón bucket unisex phong cách đường phố, chất liệu bền bỉ, dễ phối với nhiều outfit.",
    sizes: ["Freesize"],
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Kem", code: "#E8E6D9" }
    ]
  }
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => product.category === categorySlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
