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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold">Attendance Register</h1>
        <p className="text-slate-400">
          Select date to create / view daily attendance
        </p>
      </motion.div>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-slate-900 border border-white/10 px-4 py-2 rounded-xl w-full md:w-60"
      />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-150">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3 text-left">Enrollment</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Present</th>
              <th className="p-3 text-center">Absent</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading attendance...
                </td>
              </tr>
            )}

            {!loading &&
              students.map((s) => (
                <tr key={s.enrollment} className="border-t">
                  <td className="p-3">{s.enrollment}</td>
                  <td className="p-3">{s.name}</td>

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

      <button
        onClick={saveAttendance}
        className="flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-xl font-semibold"
      >
        <Save size={18} /> Save Attendance
      </button>
    </div>
  );
}
