"use client";

import Link from "next/link";
import {
  IdCard,
  Home,
  Info,
  LogIn,
  UserPlus,
  Code2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-slate-950 border-t border-white/10">

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">

        {/* BRAND / INFO */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <IdCard className="h-7 w-7 text-indigo-400" />
            <span className="text-lg font-bold text-white">
              Smart<span className="text-indigo-400">ID</span>
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Smart ID Card Management System is a modern academic project
            designed to automate student identity management, faculty
            verification, and attendance tracking in a secure and
            centralized digital platform.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            Quick Links
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="#home"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <Home className="h-4 w-4 text-indigo-400" />
                Home
              </a>
            </li>

            <li>
              <a
                href="#about"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <Info className="h-4 w-4 text-indigo-400" />
                About
              </a>
            </li>

            <li>
              <Link
                href="/login"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <LogIn className="h-4 w-4 text-indigo-400" />
                Login
              </Link>
            </li>

            <li>
              <Link
                href="/signup"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <UserPlus className="h-4 w-4 text-indigo-400" />
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* PROJECT / TECH INFO */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            Project Info
          </h4>

          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              Institution: <span className="text-white">JSPM RSCOE Polytechnic</span>
            </li>
            <li>
              Project Type: <span className="text-white">Academic Project</span>
            </li>
            <li className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-indigo-400" />
              Tech Stack:
              <span className="text-white">
                Next.js, Tailwind CSS, MongoDB
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-400">
        © 2025 JSPM RSCOE Polytechnic · Smart ID Card Management System
      </div>

    </footer>
  );
}
