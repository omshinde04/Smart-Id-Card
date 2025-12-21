"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Info,
  LogIn,
  UserPlus,
  IdCard,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Hash navigation for same page sections
  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: Info },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* FULL WIDTH BACKGROUND */}
      <div className="w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/10">

        {/* CENTERED CONTENT */}
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <a href="#home" className="flex items-center gap-2">
            <IdCard className="h-7 w-7 text-indigo-400" />
            <span className="text-lg font-bold tracking-wide text-white">
              Smart<span className="text-indigo-400">ID</span>
            </span>
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-slate-300 hover:text-white transition group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl border border-white/10
                px-5 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl
                bg-indigo-600 px-5 py-2 text-sm font-semibold text-white
                hover:bg-indigo-700 transition shadow-md"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-300 hover:text-white transition"
            aria-label="Toggle Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </nav>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-6 py-6 space-y-4">

              {/* MOBILE NAV LINKS */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition"
                >
                  <link.icon className="h-5 w-5 text-indigo-400" />
                  {link.name}
                </a>
              ))}

              <div className="h-px bg-white/10 my-4"></div>

              {/* MOBILE ACTIONS */}
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-white/10
                  px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                <UserPlus className="h-5 w-5 text-indigo-400" />
                Sign Up
              </Link>

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl
                  bg-indigo-600 px-4 py-3 font-semibold text-white
                  hover:bg-indigo-700 transition"
              >
                <LogIn className="h-5 w-5" />
                Login
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
