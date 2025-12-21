"use client";

import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, GraduationCap } from "lucide-react";

export default function SignupPage() {
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
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-slate-400 text-sm mt-2">
            Register for Smart ID Card Management System
          </p>
        </div>

        {/* ROLE */}
        <div className="mb-4">
          <label className="text-sm text-slate-300 mb-1 block">
            Register as
          </label>
          <div className="flex items-center h-12 gap-3 rounded-xl bg-slate-900 border border-white/10 px-4">
            <GraduationCap className="h-5 w-5 text-indigo-400 shrink-0" />
            <select className="w-full bg-transparent text-base focus:outline-none">
              <option>Student</option>
              <option>Faculty</option>
            </select>
          </div>
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-slate-300 mb-1 block">
            Full Name
          </label>
          <div className="flex items-center h-12 gap-3 rounded-xl bg-slate-900 border border-white/10 px-4">
            <User className="h-5 w-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-transparent text-base focus:outline-none"
            />
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

        {/* BUTTON */}
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold hover:bg-indigo-700 transition">
          <UserPlus className="h-4 w-4" />
          Sign Up
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
