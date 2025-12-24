"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  IdCard,
  Eye,
  CheckCircle,
  QrCode,
  BarChart3,
  ArrowRight,
  Layers,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* ===== BACKGROUND GRADIENT ORBS (HIDE ON MOBILE) ===== */}
      <div className="pointer-events-none absolute -top-40 -left-40 hidden md:block h-125 w-125 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -right-40 hidden md:block h-125 w-125 rounded-full bg-cyan-500/20 blur-[120px]" />

   
     {/* ================= HERO ================= */}
<section
  id="home"
  className="relative px-6 py-15 md:py-24"
>


        <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Smart ID Card
              <span className="block bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Management System
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A modern web-based identity management platform developed for
              <span className="text-white font-medium">
                {" "}JSPM’s Rajarshi Shahu College of Engineering Polytechnic
              </span>
              . The system automates student ID card generation, faculty approval,
              QR-based verification, and attendance tracking through a single
              secure interface.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-700 transition">
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </button>

              <button className="rounded-xl border border-white/10 px-6 py-3 text-slate-300 hover:bg-white/5 transition">
                View System Flow
              </button>
            </div>
          </motion.div>

          {/* RIGHT CARD MOCK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto w-full max-w-sm sm:max-w-md"
          >
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-linear-to-br from-indigo-500 to-cyan-400" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">
                    Digital Student ID
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Auto Generated
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p><span className="text-white">Name:</span> Student Name</p>
                <p><span className="text-white">Department:</span> Computer Engineering</p>
                <p><span className="text-white">Roll No:</span> 24CS101</p>
                <p><span className="text-white">Status:</span> Approved</p>
              </div>

              <div className="mt-5 h-20 rounded-xl bg-white/10 flex items-center justify-center text-slate-400 text-sm">
                QR Code Preview
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= KEY HIGHLIGHTS ================= */}
     {/* ================= KEY HIGHLIGHTS ================= */}
<section
  id="about"
  className="px-6 py-20 md:py-28 bg-slate-900/60"
>
  <div className="mx-auto max-w-7xl">

    {/* HEADING */}
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
      Why This System?
    </h2>

    <p className="text-center max-w-3xl mx-auto text-slate-300 mb-14 leading-relaxed">
      Traditional ID card generation and attendance systems involve manual
      processes, paperwork, and data duplication. The Smart ID Card Management
      System provides a centralized, secure, and automated solution that improves
      efficiency, accuracy, and transparency within academic institutions.
    </p>

    {/* CARDS */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Secure Access Control",
          desc: "Role-based authentication ensures that only authorized users such as administrators and faculty can manage student data.",
          icon: ShieldCheck,
        },
        {
          title: "Centralized Student Data",
          desc: "All student records, ID details, and attendance data are stored securely in a single centralized database.",
          icon: Layers,
        },
        {
          title: "Automated Workflow",
          desc: "The system automates ID card generation, approval, and verification, reducing manual effort and human errors.",
          icon: IdCard,
        },
        {
          title: "Real-Time Monitoring",
          desc: "Faculty can track attendance and ID status in real time, improving transparency and institutional control.",
          icon: BarChart3,
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center hover:border-indigo-500 transition"
        >
          <item.icon className="h-10 w-10 text-indigo-400 mx-auto mb-4" />
          <h3 className="font-semibold text-base mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>

  </div>
</section>


      {/* ================= CORE FEATURES ================= */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14 md:mb-20">
            Core Functionalities
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Role-Based Dashboards", ShieldCheck],
              ["Live ID Card Preview", Eye],
              ["Faculty Approval Workflow", CheckCircle],
              ["QR Code Verification", QrCode],
              ["Attendance Management", BarChart3],
              ["Automated ID Generation", IdCard],
            ].map(([title, Icon], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 hover:border-indigo-500 transition"
              >
                <Icon className="h-10 w-10 text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Designed to reduce manual effort, improve accuracy,
                  and provide a secure identity management solution
                  for academic institutions.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  );
}
