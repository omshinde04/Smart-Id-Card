"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, UserCheck } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      /* ✅ SAVE LOGIN (COLLEGE LEVEL SESSION) */
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);

      /* ✅ ROLE BASED REDIRECT */
      if (role === "Student") {
        localStorage.setItem("studentEmail", email);
        window.location.href = "/student/dashboard";
      } else if (role === "Faculty") {
        localStorage.setItem("facultyEmail", email);
        window.location.href = "/faculty/dashboard";
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleLogin}>
          {/* ROLE */}
          <div className="mb-4">
            <label className="text-sm text-slate-300 mb-1 block">
              Login as
            </label>
            <div className="flex items-center h-12 gap-3 rounded-xl bg-slate-900 border border-white/10 px-4">
              <UserCheck className="h-5 w-5 text-indigo-400 shrink-0" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent text-base focus:outline-none"
              >
                <option>Student</option>
                <option>Faculty</option>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-base focus:outline-none"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-base focus:outline-none"
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
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
