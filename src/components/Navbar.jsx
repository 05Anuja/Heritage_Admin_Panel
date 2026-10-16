import React from "react";
import { Bell, Menu, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Dashboard",
  "/products": "Products",
  "/products/add": "Add Product",
  "/enquiries": "Enquiries",
  "/settings": "Settings",
};

function Navbar({ onMenuClick }) {
  const location = useLocation();

  const title = location.pathname.startsWith("/products/edit/")
    ? "Edit Product"
    : pageTitles[location.pathname] || "Admin Panel";

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#EAE2D9] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex shrink-0 items-center justify-center rounded-lg p-2 text-[#5D5044] transition hover:bg-[#F5F0E8] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <h2 className="truncate text-lg font-semibold leading-none text-[#2B2520] sm:text-xl">
          {title}
        </h2>
      </div>

      {/* Right Section */}
      <div className="ml-3 flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => alert("Notifications clicked!")}
          className="relative flex items-center justify-center rounded-full p-2.5 text-[#75695D] transition hover:bg-[#F5F0E8]"
        >
          <Bell size={20} />
        </button>

        <div className="hidden h-9 w-px bg-[#EAE2D9] sm:block" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-[#F5F0E8]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9D8C3] text-[#704A2D]">
            <UserRound size={19} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-none text-[#2B2520]">
              Heritage Admin
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
