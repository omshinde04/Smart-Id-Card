// app/api/faculty/attendance/by-date/route.js
import connectDB from "../../../../../lib/mongodb";
import Attendance from "../../../../../models/Attendance";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  await connectDB();
  const data = await Attendance.findOne({ date });

  return NextResponse.json(data || { records: [] });
}
