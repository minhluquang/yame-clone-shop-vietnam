
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "Áo", slug: "ao" },
  { name: "Quần", slug: "quan" },
  { name: "Phụ kiện", slug: "phu-kien" },
  { name: "Đồ bộ", slug: "do-bo" },
  { name: "Khuyến mãi", slug: "khuyen-mai" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="shadow-sm sticky top-0 bg-white z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
          
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-navy">
            YAME
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            {categories.map((category) => (
              <NavLink
                key={category.slug}
                to={`/danh-muc/${category.slug}`}
                className={({ isActive }) =>
                  `font-medium text-sm hover:text-brand-red transition-colors ${
                    isActive ? "text-brand-red" : ""
                  }`
                }
              >
                {category.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Right navigation */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            
            <Link to="/gio-hang">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-2 animate-fade-in">
          <nav className="container-custom flex flex-col space-y-2 pb-2">
            {categories.map((category) => (
              <NavLink
                key={category.slug}
                to={`/danh-muc/${category.slug}`}
                className={({ isActive }) =>
                  `font-medium text-sm p-2 hover:bg-gray-100 rounded ${
                    isActive ? "text-brand-red" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
