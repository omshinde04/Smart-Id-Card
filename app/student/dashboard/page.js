"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  IdCard,
  CalendarCheck,
  Download,
  FileText,
} from "lucide-react";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://smart-id-card-lime.vercel.app";


/* ================= CLOUDINARY → BASE64 ================= */
async function imageToBase64(url) {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [attendance, setAttendance] = useState(0);


  /* ================= FETCH STUDENT ================= */
  useEffect(() => {
  const email = localStorage.getItem("studentEmail");
  if (!email) return;

  fetch(`/api/student/dashboard?email=${email}`)
    .then((res) => res.json())
    .then(async (student) => {
      if (student.photo) {
        student.photo = await imageToBase64(student.photo);
      }
      setData(student);

      // ✅ FETCH ATTENDANCE %
      if (student.enrollment) {
        const res = await fetch(
          `/api/student/attendance?enrollment=${student.enrollment}`
        );
        const att = await res.json();
        setAttendance(att.percentage || 0);
      }
    });
}, []);


  const status = data?.status || "not_applied";

  /* ================= WAIT FOR IMAGES ================= */
  const waitForImages = async (element) => {
    const images = element.querySelectorAll("img");
    await Promise.all(
      [...images].map(
        (img) =>
          img.complete ||
          new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );
  };

  /* ================= DOWNLOAD PDF ================= */
  const downloadPDF = async () => {
    await waitForImages(frontRef.current);
    await waitForImages(backRef.current);

    const pdf = new jsPDF("p", "mm", "a4");

    const capture = (ref) =>
      html2canvas(ref.current, {
        scale: 2,
        backgroundColor: "#020617",
      });

    const frontCanvas = await capture(frontRef);
    const backCanvas = await capture(backRef);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const frontHeight =
      (frontCanvas.height * pdfWidth) / frontCanvas.width;
    const backHeight =
      (backCanvas.height * pdfWidth) / backCanvas.width;

    pdf.addImage(frontCanvas.toDataURL("image/png"), "PNG", 0, 20, pdfWidth, frontHeight);
    pdf.addPage();
    pdf.addImage(backCanvas.toDataURL("image/png"), "PNG", 0, 20, pdfWidth, backHeight);

    pdf.save(`Smart-ID-${data.enrollment}.pdf`);
  };

return (
  <div className="space-y-10">

    {/* HEADER */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <p className="text-slate-400">
        Third Year • Computer Engineering
      </p>
    </motion.div>
{/* STATS */}
<div className="grid sm:grid-cols-3 gap-6">
  <StatCard
    title="ID Status"
    value={status}
    icon={IdCard}
  />

  <StatCard
    title="Attendance"
    value={`${attendance}%`}
    icon={CalendarCheck}
  />

  <StatCard
    title="Application"
    value={status === "not_applied" ? "Apply Now" : "Submitted"}
    icon={FileText}
  />
</div>


    {/* APPLY CTA */}
    {status === "not_applied" && (
      <a
        href="/student/apply-id"
        className="inline-flex gap-2 bg-indigo-600 px-6 py-3 rounded-xl font-semibold"
      >
        <FileText /> Apply for ID
      </a>
    )}

    {/* ================= ID CARD ================= */}
    {data && (
      <div className="grid md:grid-cols-2 gap-8">

        {/* FRONT */}
        <div
          ref={frontRef}
          style={{
            background: "#020617",
            color: "#fff",
            padding: "24px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.15)",
            width: "360px",
            height: "520px",
            margin: "auto",
          }}
        >
          {/* LOGO */}
          <div style={{ textAlign: "center", marginBottom: "6px" }}>
            <img
              src="/signatures/logo.jpeg"
              alt="College Logo"
              style={{ height: "42px", margin: "0 auto" }}
            />
          </div>

          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: "600" }}>
              JSPM’s Rajarshi Shahu College of Engineering Polytechnic
            </h3>
            <p style={{ fontSize: "11px", color: "#94a3b8" }}>
              Student ID Card • Third Year
            </p>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

          <div style={{ display: "flex", gap: "14px", marginTop: "14px" }}>
            {/* PHOTO */}
            <div
              style={{
                width: "80px",
                height: "100px",
                background: "#1e293b",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={data.photo}
                alt="Student"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* DETAILS */}
            <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
              <p><strong>Student Name:</strong> {data.name}</p>
              <p><strong>Branch:</strong> Computer Engineering</p>
              <p><strong>Academic Year:</strong> Third Year</p>
              <p><strong>Mobile:</strong> {data.mobile}</p>
            </div>
          </div>

          <div
            style={{
              marginTop: "12px",
              background: "#1e293b",
              borderRadius: "8px",
              padding: "8px",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            Enrollment: {data.enrollment}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
          {status === "approved" && (
  <QRCodeCanvas
    value={`${BASE_URL}/verify/${data.enrollment}`}
    size={100}
    bgColor="#020617"
    fgColor="#ffffff"
  />
)}


          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px" }}>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              Authorized Signature
            </span>
            <img
              src="/signatures/signature.png"
              alt="Principal"
              style={{ height: "32px" }}
            />
          </div>
        </div>

        {/* BACK — MATCHING FRONT */}
        <div
          ref={backRef}
          style={{
            background: "#020617",
            color: "#fff",
            padding: "24px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.15)",
            width: "360px",
            height: "520px",
            margin: "auto",
            fontSize: "13px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p><strong>DOB:</strong> {data.dob}</p>
            <p><strong>Blood Group:</strong> {data.blood}</p>
            <p><strong>Email:</strong> {data.studentEmail}</p>

            <p style={{ marginTop: "8px", fontSize: "12px", color: "#94a3b8" }}>
              <strong>Address:</strong> {data.address}
            </p>
          </div>

          <p style={{ fontSize: "12px", color: "#818cf8", textAlign: "center" }}>
            Academic Year: Third Year
          </p>
        </div>

      </div>
    )}

    {/* DOWNLOAD */}
    {status === "approved" && (
      <button
        onClick={downloadPDF}
        className="mt-6 w-full max-w-md flex items-center justify-center gap-2 bg-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-700"
      >
        <Download size={18} />
        Download ID (PDF)
      </button>
    )}
  </div>
);

}

/* ================= STAT CARD ================= */
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
      <Icon className="text-indigo-400 mb-2" />
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="text-xl font-bold capitalize">{value}</h3>
    </div>
  );
}
