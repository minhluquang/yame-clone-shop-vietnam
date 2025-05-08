
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="relative">
      <div className="overflow-hidden h-[50vh] relative">
        <img
          src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&auto=format&fit=crop"
          alt="Bộ sưu tập mới"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent flex flex-col justify-center px-6 lg:px-20">
          <div className="max-w-xl">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in">
              Bộ Sưu Tập Mới 2025
            </h1>
            <p className="text-white/90 mb-6 text-sm md:text-base animate-fade-in">
              Khám phá các thiết kế mới nhất từ YAME. Phong cách trẻ trung, độc đáo
              dành cho giới trẻ Việt Nam.
            </p>
            <Button
              size="lg"
              className="bg-white text-navy hover:bg-white/90 animate-slide-in"
              asChild
            >
              <Link to="/danh-muc/ao">Khám phá ngay</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
