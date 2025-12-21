"use client";

import { motion } from "framer-motion";
import { LogIn, Mail, Lock, UserCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-2">
            Login to Smart ID Card Management System
          </p>
        </div>

        {/* ROLE */}
        <div className="mb-4">
          <label className="text-sm text-slate-300 mb-1 block">
            Login as
          </label>
          <div className="flex items-center h-12 gap-3 rounded-xl bg-slate-900 border border-white/10 px-4">
            <UserCheck className="h-5 w-5 text-indigo-400 shrink-0" />
            <select className="w-full bg-transparent text-base focus:outline-none">
              <option>Student</option>
              <option>Faculty</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-slate-300 mb-1 block">
            Email
          </label>
          <div className="flex items-center h-12 gap-3 rounded-xl bg-slate-900 border border-white/10 px-4">
            <Mail className="h-5 w-5 text-indigo-400 shrink-0" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent text-base focus:outline-none"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-slate-300 mb-1 block">
            Password
          </label>
          <div className="flex items-center h-12 gap-3 rounded-xl bg-slate-900 border border-white/10 px-4">
            <Lock className="h-5 w-5 text-indigo-400 shrink-0" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent text-base focus:outline-none"
            />
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold hover:bg-indigo-700 transition">
          <LogIn className="h-4 w-4" />
          Login
        </button>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
