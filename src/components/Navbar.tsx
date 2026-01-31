import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "./assets/workeye.jpg";
interface NavbarProps {
  onLoginClick: () => void;
  onNavigateToSection?: (section: string) => void;
  onLogoClick?: () => void; // Add this
}

type NavLinkType = "section" | "route";
interface NavLink {
  name: string;
  href: string;
  type: NavLinkType;
}

export function Navbar({
  onLoginClick,
  onNavigateToSection,
  onLogoClick,
}: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      navigate("/");
    }
  };

  const handleNavClick = (href: string, type: "section" | "route") => {
    setIsMobileMenuOpen(false);

    if (type === "route") {
      // Clear any existing hash before routing
      window.history.replaceState(null, "", href);
      navigate(href, { replace: true });
      return;
    }

    // section scroll
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
    } else {
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const navLinks: NavLink[] = [
    { name: "Features", href: "#features", type: "section" },
    { name: "How It Works", href: "#how", type: "section" },
    { name: "Pricing", href: "#pricing", type: "section" },
    { name: "FAQ", href: "#faq", type: "section" },
    { name: "Partners", href: "/partners", type: "route" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* TOP WHITE NAVBAR */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick} // Changed from onClick={() => navigate("/")}
            >
              <div className="h-10 w-36 flex items-center justify-center">
                <img
                  src={logoImage}
                  alt="WorkEye Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.type)}
                  className="text-sm font-medium text-gray-700 hover:text-[#003366]"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right leading-tight">
                <a
                  href="tel:+919892440788"
                  className="text-sm font-semibold text-[#003366] hover:underline block"
                >
                  +91 9892440788
                </a>
                <span className="text-xs text-gray-500">We work 24/7</span>
              </div>

              <Button
                onClick={() => {
                  window.location.href = "https://frontend-8x7e.onrender.com/";
                }}
                className="bg-[#003366] hover:bg-[#002244] text-white px-6 py-2 rounded-md font-medium"
              >
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.type)}
                  className="text-sm font-medium text-gray-700 hover:text-[#003366]"
                >
                  {link.name}
                </button>
              ))}
              <Button
                onClick={onLoginClick}
                className="w-full bg-[#003366] text-white"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* BLUE ANNOUNCEMENT BAR */}
      <div className="bg-[#003366] text-white text-center py-2 text-sm font-medium">
        Empowering Businesses with Strength, Backed by Reliability, and Grounded
        in Stability.
      </div>
    </header>
  );
}