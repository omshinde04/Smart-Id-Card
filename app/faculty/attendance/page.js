"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

export default function AttendancePage() {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */
  useEffect(() => {
    loadAttendance(date);
  }, [date]);

  const loadAttendance = async (selectedDate) => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/faculty/attendance/load?date=${selectedDate}`
      );
      const data = await res.json();

      if (Array.isArray(data.records) && data.records.length > 0) {
        // ✅ load saved attendance
        setStudents(data.records);
      } else {
        // ✅ load student list only ONCE
        const resStudents = await fetch(
          "/api/faculty/attendance/students"
        );
        const list = await resStudents.json();

        setStudents(
          list.map((s) => ({
            enrollment: s.enrollment,
            name: s.name,
            status: "absent",
          }))
        );
      }
    } catch (err) {
      console.error("LOAD ERROR:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= MARK ================= */
  const mark = (enrollment, status) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.enrollment === enrollment ? { ...s, status } : s
      )
    );
  };

  /* ================= SAVE ================= */
  const saveAttendance = async () => {
    await fetch("/api/faculty/attendance/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        records: students,
      }),
    });

    alert(`Attendance saved for ${date}`);
  };
return (
  <div className="p-4 md:p-8 space-y-6">

    {/* ================= HEADER ================= */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-1"
    >
      <h1 className="text-2xl md:text-3xl font-bold">
        Attendance Register
      </h1>
      <p className="text-slate-400 text-sm">
        Select date to create / view daily attendance
      </p>
    </motion.div>

    {/* ================= DATE PICKER ================= */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <label className="text-sm text-slate-300">
        Select Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="
          bg-slate-900 border border-white/10
          px-4 py-2 rounded-xl
          w-full sm:w-56
          text-sm
        "
      />
    </div>

    {/* ================= TABLE ================= */}
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-">
        <thead className="bg-slate-900">
          <tr>
            <th className="p-3 text-left text-sm">Enrollment</th>
            <th className="p-3 text-left text-sm">Name</th>
            <th className="p-3 text-center text-sm">Present</th>
            <th className="p-3 text-center text-sm">Absent</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-slate-400">
                Loading attendance...
              </td>
            </tr>
          )}

          {!loading && students.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-slate-400">
                No students found
              </td>
            </tr>
          )}

          {!loading &&
            students.map((s) => (
              <tr
                key={s.enrollment}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-3 text-sm">{s.enrollment}</td>
                <td className="p-3 text-sm">{s.name}</td>

                <td className="p-3 text-center">
                  <input
                    type="radio"
                    checked={s.status === "present"}
                    onChange={() =>
                      mark(s.enrollment, "present")
                    }
                  />
                </td>

                <td className="p-3 text-center">
                  <input
                    type="radio"
                    checked={s.status === "absent"}
                    onChange={() =>
                      mark(s.enrollment, "absent")
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    {/* ================= SAVE BUTTON ================= */}
    <div className="flex justify-end">
      <button
        onClick={saveAttendance}
        className="
          flex items-center gap-2
          bg-indigo-600 hover:bg-indigo-700
          px-6 py-3 rounded-xl
          font-semibold text-sm
        "
      >
        <Save size={18} /> Save Attendance
      </button>
    </div>

  </div>
);

}
