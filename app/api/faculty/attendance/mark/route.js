// app/api/faculty/attendance/mark/route.js
import connectDB from "../../../../../lib/mongodb";
import Attendance from "../../../../../models/Attendance";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { records, date } = await req.json();
  await connectDB();

  for (const r of records) {
    await Attendance.findOneAndUpdate(
      { studentEmail: r.studentEmail, date },
      r,
      { upsert: true }
    );
  }

  return NextResponse.json({ message: "Attendance saved" });
}
