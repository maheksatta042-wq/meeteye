import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "./assets/workeye.jpg";

interface NavbarProps {
  onLoginClick: () => void;
  onNavigateToSection?: (section: string) => void;
  onLogoClick?: () => void;
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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [isCheckingLicense, setIsCheckingLicense] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check for active license
  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      setIsCheckingLicense(true);
      
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=69589e3fe70228ef3c25f26c`,
        {
          headers: {
            "x-api-key": "my-secret-key-123",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const hasLicense = data.activeLicense && data.activeLicense.status === 'active';
        setHasActiveLicense(hasLicense);
        return hasLicense;
      }
      setHasActiveLicense(false);
      return false;
    } catch (error) {
      console.error("Error checking active license:", error);
      setHasActiveLicense(false);
      return false;
    } finally {
      setIsCheckingLicense(false);
    }
  };

  // Check for logged-in user on mount and whenever localStorage changes
  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser(user);
          // Check license status when user is detected
          if (user.email) {
            checkActiveLicense(user.email);
          }
        } catch (e) {
          console.error("Failed to parse user data", e);
          setCurrentUser(null);
          setHasActiveLicense(false);
        }
      } else {
        setCurrentUser(null);
        setHasActiveLicense(false);
      }
    };

    checkUser();
    
    // Listen for storage changes (in case user logs in from another tab)
    window.addEventListener("storage", checkUser);
    
    // Listen for custom login event
    window.addEventListener("userLoggedIn", checkUser);
    
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userLoggedIn", checkUser);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

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

  const handleDashboardClick = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    // Redirect to external dashboard
    window.location.href = "https://frontend-8x7e.onrender.com/";
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setHasActiveLicense(false);
    setIsProfileDropdownOpen(false);
    navigate("/");
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("userLoggedOut"));
  };

  const handleLoginClick = () => {
    // Check if user is already logged in
    if (currentUser) {
      alert("You are already logged in!");
      return;
    }
    onLoginClick();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <div className="h-12 w-40 flex items-center justify-start">
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

              {/* User Profile or Login Button */}
              {currentUser ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    aria-label="User menu"
                  >
                    {/* Profile Avatar - Updated to match reference image */}
                    <div className="w-10 h-10 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-semibold text-base shadow-sm">
                      {getInitials(currentUser.name)}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu - Updated styling to match reference */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Info */}
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-semibold text-base shadow-sm">
                            {getInitials(currentUser.name)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard - Only show if user has active license */}
                      {hasActiveLicense && (
                        <button
                          onClick={handleDashboardClick}
                          className="w-full px-4 py-3 text-left text-sm font-medium text-[#1e3a5f] hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                      )}

                      {/* Sign Out */}
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-left text-sm font-medium
                                  hover:bg-red-50 flex items-center gap-3 transition-colors"
                        style={{ color: '#dc2626' }}
                      >
                        <LogOut className="w-4 h-4" style={{ color: '#dc2626' }} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="bg-[#003366] hover:bg-[#002244] text-white px-6 py-2 rounded-md font-medium"
                >
                  Login
                </Button>
              )}
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
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-[#003366]"
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile User Profile */}
              {currentUser ? (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-semibold text-base shadow-sm">
                      {getInitials(currentUser.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>

                  {/* Dashboard Button for Mobile - Only if has license */}
                  {hasActiveLicense && (
                    <Button
                      onClick={handleDashboardClick}
                      variant="outline"
                      className="w-full justify-start gap-2 text-[#1e3a5f] font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  )}

                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full justify-start gap-2 text-[#dc2626] hover:text-[#dc2626] hover:bg-red-50 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="w-full bg-[#003366] text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* BLUE ANNOUNCEMENT BAR */}
      {location.pathname === "/" && (
        <div className="bg-[#003366] text-white text-center py-2 text-sm font-medium">
          Empowering Businesses with Strength, Backed by Reliability, and Grounded
          in Stability.
        </div>
      )}
    </header>
  );
}