"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

/* UPDATED MENU */
const menu = [
  { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "Apply for ID", href: "/student/apply-id", icon: FileText },
//   { name: "Profile", href: "/student/profile", icon: User },
];

function SidebarContent({ pathname, close }) {
  return (
    <div className="flex flex-col h-full w-64 bg-slate-950 border-r border-white/10">

      {/* HEADER */}
      <div className="px-6 py-6 border-b border-white/10">
        <h2 className="text-xl font-bold">
          Student<span className="text-indigo-400">Panel</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Smart ID System
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={close}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
                ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="px-4 py-4 border-t border-white/10">
       <button
  onClick={() => {
    // clear any stored auth (safe even if empty)
    localStorage.removeItem("user");
    sessionStorage.clear();

    // redirect to login
    window.location.href = "/login";
  }}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
>
  <LogOut className="h-5 w-5" />
  Logout
</button>

      </div>
    </div>
  );
}

export default function StudentSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-slate-950 border-b border-white/10 flex items-center px-4">
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6 text-white" />
        </button>
        <span className="ml-4 font-semibold">Student Panel</span>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 bottom-0 z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-full">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                  <X />
                </button>
                <SidebarContent
                  pathname={pathname}
                  close={() => setOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
