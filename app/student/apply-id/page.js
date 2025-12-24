"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Calendar,
  Mail,
  MapPin,
  Image as ImageIcon,
  Send,
} from "lucide-react";

export default function ApplyIdPage() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    dob: "",
    blood: "",
    email: "",
    address: "",
    year: "TY",
    photo: "", // ✅ CLOUDINARY HTTPS URL
  });

  const [uploading, setUploading] = useState(false);
const handlePhoto = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary error:", data);
    alert("Photo upload failed");
    setUploading(false);
    return;
  }

  setForm((prev) => ({
    ...prev,
    photo: data.secure_url,
  }));

  setUploading(false);
};


  /* ================= SUBMIT FORM ================= */
  const handleSubmit = async () => {
    const studentEmail = localStorage.getItem("studentEmail");

    if (!studentEmail) {
      alert("Login required");
      return;
    }

    if (!form.photo) {
      alert("Please upload photo");
      return;
    }

    const res = await fetch("/api/student/apply-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        studentEmail,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Submission failed");
      return;
    }

    alert("ID Application Submitted Successfully");
    window.location.href = "/student/dashboard";
  };

  return (
    <div className="mt-16 space-y-10 overflow-x-hidden">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Apply for Student ID Card
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          This ID system is applicable only for Third Year students.
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* FORM */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6">
            Student Details (Third Year)
          </h2>

          <div className="space-y-5">
            <Input label="Full Name" icon={User}
              onChange={(v) => setForm({ ...form, name: v })} />

            <Input label="Mobile Number" icon={Phone}
              onChange={(v) => setForm({ ...form, mobile: v })} />

            <Input label="Date of Birth" icon={Calendar} type="date"
              onChange={(v) => setForm({ ...form, dob: v })} />

            <Input label="Blood Group" icon={User}
              onChange={(v) => setForm({ ...form, blood: v })} />

            <Input label="Email" icon={Mail}
              onChange={(v) => setForm({ ...form, email: v })} />

            {/* YEAR */}
            <div>
              <label className="text-sm text-slate-300 mb-1 block">
                Academic Year
              </label>
              <div className="h-12 flex items-center px-4 rounded-xl bg-slate-900 border border-white/10 text-sm text-indigo-400 font-semibold">
                Third Year (Fixed)
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-sm text-slate-300 mb-1 block">
                Address
              </label>
              <div className="flex gap-3 bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
                <MapPin className="h-5 w-5 text-indigo-400 mt-1" />
                <textarea
                  rows="3"
                  className="w-full bg-transparent text-sm focus:outline-none resize-none"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
            </div>

            {/* PHOTO */}
            <div>
              <label className="text-sm text-slate-300 mb-1 block">
                Student Photo
              </label>
              <label className="h-12 flex items-center gap-3 bg-slate-900 border border-dashed border-white/20 rounded-xl px-4 cursor-pointer">
                <ImageIcon className="h-5 w-5 text-indigo-400" />
                <span className="text-sm text-slate-400">
                  {uploading ? "Uploading..." : "Upload Passport Size Photo"}
                </span>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />
              </label>
            </div>

            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="w-full mt-6 h-12 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Submit Third Year ID Application
            </button>
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-white/10 p-5">
            <div className="text-center border-b border-white/10 pb-2 mb-3">
              <h3 className="text-sm font-semibold">
                JSPM’s Rajarshi Shahu College of Engineering Polytechnic
              </h3>
              <p className="text-xs text-slate-400">
                Student ID Card • Third Year
              </p>
            </div>

            <div className="flex gap-4">
              <div className="h-20 w-16 bg-white/10 rounded overflow-hidden">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt="Student"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    Photo
                  </div>
                )}
              </div>

              <div className="text-sm space-y-1">
                <p className="font-semibold">
                  {form.name || "Student Name"}
                </p>
                <p>Branch: Computer Engineering</p>
                <p>Academic Year: Third Year</p>
                <p>Mobile: {form.mobile || "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ label, icon: Icon, type = "text", onChange }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1 block">
        {label}
      </label>
      <div className="h-12 flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl px-4">
        <Icon className="h-5 w-5 text-indigo-400 shrink-0" />
        <input
          type={type}
          className="w-full bg-transparent text-sm focus:outline-none"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
