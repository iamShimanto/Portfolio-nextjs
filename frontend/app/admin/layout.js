"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "@/app/services/auth.service";
import { showToast } from "@/app/components/ui/Toast";
import {
  FiGrid, FiUser, FiBriefcase, FiLayers, FiCpu,
  FiShare2, FiMail, FiLogOut, FiMenu, FiX,
} from "react-icons/fi";

const navItems = [
  { href: "/admin",           label: "Dashboard",  icon: FiGrid },
  { href: "/admin/profile",   label: "Profile",    icon: FiUser },
  { href: "/admin/projects",  label: "Projects",   icon: FiBriefcase },
  { href: "/admin/services",  label: "Services",   icon: FiLayers },
  { href: "/admin/tech",      label: "Tech Stack", icon: FiCpu },
  { href: "/admin/socials",   label: "Socials",    icon: FiShare2 },
  { href: "/admin/contacts",  label: "Contacts",   icon: FiMail },
];

export default function AdminLayout({ children }) {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#212428]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff014f] border-t-transparent" />
      </div>
    );
  }
  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push("/login");
    } catch {
      showToast.error("Error", "Logout failed");
    }
  };

  const SidebarContent = ({ onLinkClick }) => (
    <>
      <div className="flex items-center gap-3 mb-8 px-2">
        <span className="text-[#ff014f] font-bold text-xl tracking-widest uppercase">Admin</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-[#ff014f]/10 text-[#ff014f]"
                  : "text-[#c4cfde] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="text-lg flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#878e99] hover:text-[#ff014f] hover:bg-[#ff014f]/5 transition-all duration-200 mt-4 cursor-pointer w-full"
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#212428]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#1a1d21] border-r border-white/5 p-5 sticky top-0 self-start">
        <SidebarContent onLinkClick={() => {}} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-50 flex flex-col w-64 h-full bg-[#1a1d21] border-r border-white/5 p-5">
            <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-[#1a1d21] border-b border-white/5 sticky top-0 z-30">
          <span className="text-[#ff014f] font-bold text-lg uppercase tracking-widest">Admin</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#c4cfde] hover:text-white transition">
            {sidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </header>
        <main className="flex-1 p-5 sm:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
