
import { Layout } from "@/components/layout/Layout";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      <HeroBanner />
      <div className="container-custom">
        <CategorySection />
        <ProductGrid products={featuredProducts} title="Sản Phẩm Nổi Bật" />
      </div>
    </Layout>
  );
};

export default HomePage;
