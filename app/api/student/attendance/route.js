import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const enrollment = searchParams.get("enrollment");

    if (!enrollment) {
      return NextResponse.json({ percentage: 0 });
    }

    await connectDB();

    const allAttendance = await Attendance.find({
      "records.enrollment": enrollment,
    });

    let total = 0;
    let present = 0;

    allAttendance.forEach((day) => {
      const record = day.records.find(
        (r) => r.enrollment === enrollment
      );
      if (record) {
        total++;
        if (record.status === "present") {
          present++;
        }
      }
    });

    const percentage =
      total === 0 ? 0 : Math.round((present / total) * 100);

    return NextResponse.json({
      totalDays: total,
      presentDays: present,
      percentage,
    });
  } catch (err) {
    console.error("ATTENDANCE FETCH ERROR:", err);
    return NextResponse.json({ percentage: 0 });
  }
}
