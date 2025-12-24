"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  Search,
} from "lucide-react";

export default function FacultyDashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await fetch("/api/faculty/applications");
    const data = await res.json();
    setStudents(data);
  };

  const approveStudent = async (id) => {
    const res = await fetch("/api/faculty/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    alert(`Approved! Enrollment: ${data.enrollment}`);
    fetchApplications();
  };

  const rejectStudent = async (id) => {
    await fetch("/api/faculty/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    alert("Application Rejected");
    fetchApplications();
  };

  const logout = () => {
    window.location.href = "/login";
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center border border-white/10 rounded-xl p-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-slate-400 text-sm">
            Third Year ID Applications
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">
        <Stat title="Total" value={students.length} icon={Users} />
        <Stat
          title="Pending"
          value={students.filter(s => s.status === "pending").length}
          icon={Clock}
        />
        <Stat
          title="Approved"
          value={students.filter(s => s.status === "approved").length}
          icon={CheckCircle}
        />
        <Stat title="Rejected" value={students.filter(s => s.status === "rejected").length} icon={XCircle} />
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input
          className="w-full pl-10 h-10 rounded-xl bg-slate-900 border border-white/10"
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {filtered.map((s) => (
          <div key={s._id} className="bg-slate-900 p-6 rounded-2xl border border-white/10">
            <p><b>Name:</b> {s.name}</p>
            <p><b>Email:</b> {s.studentEmail}</p>
            <p><b>Mobile:</b> {s.mobile}</p>
            <p><b>Status:</b> {s.status}</p>
            {s.enrollment && <p><b>Enrollment:</b> {s.enrollment}</p>}

            {s.status === "pending" && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => approveStudent(s._id)}
                  className="flex-1 bg-green-600 py-2 rounded-xl"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectStudent(s._id)}
                  className="flex-1 bg-red-600 py-2 rounded-xl"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
      <Icon className="text-indigo-400 mb-2" />
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
