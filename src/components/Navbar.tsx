import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logoImage from "../assets/workeye.png";

interface NavbarProps {
  onLoginClick: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 🔹 TOP WHITE NAVBAR */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo – LEFT CORNER */}
            <div className="flex items-center">
              <img
                src={logoImage}
                alt="WorkEye Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#003366]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right leading-tight">
                <p className="text-sm font-semibold text-[#003366]">
                  +91 9892440788
                </p>
                <p className="text-xs text-gray-500">We work 24/7</p>
              </div>

              <Button
                onClick={onLoginClick}
                className="bg-[#003366] hover:bg-[#002244] text-white px-6"
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
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-700 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
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

      {/* 🔹 BLUE ANNOUNCEMENT BAR */}
      <div className="bg-[#003366] text-white text-center py-2 text-sm font-medium">
        Empowering Businesses with Strength, Backed by Reliability, and Grounded in Stability.
      </div>
    </header>
  );
}
