import {
  LayoutDashboard,
  Package,
  Mail,
  Settings,
  ExternalLink,
  Gem,
  X,
  PanelLeftClose,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Enquiries",
    path: "/enquiries",
    icon: Mail,
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar({ isOpen, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#E9D8C3] text-[#704A2D]"
        : "text-[#D6C6B6] hover:bg-white/10 hover:text-white"
    }`;

  const renderLink = (item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.name}
        to={item.path}
        end={item.end}
        className={linkClass}
        onClick={onClose}
      >
        <Icon size={19} strokeWidth={1.8} />
        <span>{item.name}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#241D19] text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C58B52]">
              <Gem size={23} />
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-wide">
                HERITAGE BHARAT
              </h1>
              <p className="mt-1 text-[10px] tracking-[0.2em] text-[#D6C6B6]">
                ADMIN PANEL
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-[#D6C6B6] hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A99A8C]">
            Main Menu
          </p>

          <nav className="space-y-1">{navigation.map(renderLink)}</nav>

          <p className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A99A8C]">
            Preferences
          </p>

          <nav className="space-y-1">
            {secondaryNavigation.map(renderLink)}

            <a
              href="https://google.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#D6C6B6] transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink size={19} strokeWidth={1.8} />
              <span>View Website</span>
            </a>
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C58B52]">
              <Gem size={18} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Heritage Admin</p>
              <p className="mt-0.5 text-xs text-[#BBAA99]">Store Management</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
