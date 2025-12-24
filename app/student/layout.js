"use client";

import StudentSidebar from "@/components/student/StudentSidebar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <StudentSidebar />
      <main className="flex-1 pt-14 md:pt-0 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
