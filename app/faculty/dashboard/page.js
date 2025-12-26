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
  const [loading, setLoading] = useState(true);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "Faculty") {
      window.location.href = "/login";
      return;
    }
    fetchApplications();
  }, []);

  /* ================= FETCH APPLICATIONS ================= */
  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/faculty/applications");
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= APPROVE ================= */
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

  /* ================= REJECT ================= */
  const rejectStudent = async (id) => {
    await fetch("/api/faculty/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    alert("Application Rejected");
    fetchApplications();
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear(); // 🔥 VERY IMPORTANT
    window.location.href = "/login";
  };

  /* ================= FILTER ================= */
  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.studentEmail?.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <div className="space-y-10">

    {/* ================= HEADER ================= */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        flex flex-col gap-4
        md:flex-row md:items-center md:justify-between
        border border-white/10 rounded-xl p-4
      "
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Faculty Dashboard
        </h1>
        <p className="text-slate-400 text-sm">
          Third Year ID Applications
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-3">
        <a
          href="/faculty/attendance"
          className="border px-4 py-2 rounded-xl hover:bg-white/10 text-sm"
        >
          Mark Attendance
        </a>

        <button
          onClick={logout}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-white/10 text-sm"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </motion.div>

    {/* ================= STATS ================= */}
    <div className="
      grid gap-6
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
    ">
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
      <Stat
        title="Rejected"
        value={students.filter(s => s.status === "rejected").length}
        icon={XCircle}
      />
    </div>

    {/* ================= SEARCH ================= */}
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        className="
          w-full pl-10 h-10
          rounded-xl bg-slate-900
          border border-white/10
          text-sm
        "
        placeholder="Search name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* ================= LIST ================= */}
    <div className="space-y-6">
      {loading && (
        <p className="text-slate-400 text-sm">
          Loading applications...
        </p>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-slate-400 text-sm">
          No applications available.
        </p>
      )}

     {filtered.map((s) => (
  <div
    key={s._id}
    className="
      bg-slate-900 p-5 md:p-6
      rounded-2xl border border-white/10
      space-y-3
    "
  >
    {/* TOP ROW: PHOTO + BASIC INFO */}
    <div className="flex gap-4 items-start">
      
      {/* STUDENT PHOTO */}
      <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-slate-800">
        {s.photo ? (
          <img
            src={s.photo}
            alt={s.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            No Photo
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="space-y-1 text-sm">
        <p><b>Name:</b> {s.name}</p>
        <p><b>Email:</b> {s.studentEmail}</p>
        <p><b>Mobile:</b> {s.mobile}</p>
      </div>
    </div>

    {/* ADDRESS */}
    <p className="text-sm">
      <b>Address:</b> {s.address}
    </p>

    {/* STATUS */}
    <p>
      <b>Status:</b>{" "}
      <span
        className={
          s.status === "approved"
            ? "text-green-400"
            : s.status === "rejected"
            ? "text-red-400"
            : "text-yellow-400"
        }
      >
        {s.status}
      </span>
    </p>

    {/* ENROLLMENT */}
    {s.enrollment && (
      <p><b>Enrollment:</b> {s.enrollment}</p>
    )}

    {/* ACTION BUTTONS */}
    {s.status === "pending" && (
      <div className="flex flex-col sm:flex-row gap-3 pt-3">
        <button
          onClick={() => approveStudent(s._id)}
          className="flex-1 bg-green-600 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Approve
        </button>
        <button
          onClick={() => rejectStudent(s._id)}
          className="flex-1 bg-red-600 py-2 rounded-xl hover:bg-red-700 transition"
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

/* ================= STAT CARD ================= */
function Stat({ title, value, icon: Icon }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
      <Icon className="text-indigo-400 mb-2" />
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
