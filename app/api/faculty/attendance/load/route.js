import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawDate = searchParams.get("date");

    const normalizedDate = new Date(rawDate)
      .toISOString()
      .slice(0, 10);

    await connectDB();

    const attendance = await Attendance.findOne({
      date: normalizedDate,
    });

    // ✅ ALWAYS return same shape
    return NextResponse.json({
      records: attendance?.records || [],
    });
  } catch (err) {
    console.error("LOAD ATTENDANCE ERROR:", err);
    return NextResponse.json({ records: [] });
  }
}
