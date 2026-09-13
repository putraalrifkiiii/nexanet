import { NAV_ITEMS } from "@/constants/navigation";
import Button from "@/components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b  border-brand-muted bg-white/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="6" className="fill-brand-blue" />
            <path
              d="M5 11h12M11 5v12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-bold text-[15px] tracking-tight font-display text-brand-dark">
            NexaNet
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="text-sm font-medium transition-colors font-body text-gray-500 hover:text-brand-dark"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {loggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:text-gray-900 transition-colors font-body text-gray-600"
              >
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Keluar
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:text-gray-900 transition-colors font-body text-gray-600"
              >
                Masuk
              </Link>
              <Button to="/daftar" variant="secondary" size="sm">
                Daftar
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden p-1.5" onClick={() => setOpen(!open)}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="fill-brand-dark"
          >
            {open ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.293 3.293a1 1 0 011.414 0L9 7.586l4.293-4.293a1 1 0 111.414 1.414L10.414 9l4.293 4.293a1 1 0 01-1.414 1.414L9 10.414l-4.293 4.293a1 1 0 01-1.414-1.414L7.586 9 3.293 4.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 4a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white px-5 py-5 flex flex-col gap-5 border-t border-brand-border">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className="text-left text-sm font-medium font-body text-brand-dark"
            >
              {label}
            </Link>
          ))}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="text-left text-sm font-body text-brand-danger"
            >
              Keluar
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-left text-sm font-body text-gray-600"
              >
                Masuk
              </Link>
              <Link
                to="/daftar"
                onClick={() => setOpen(false)}
                className="text-left text-sm font-semibold font-body text-brand-blue"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
