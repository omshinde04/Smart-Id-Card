import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

// 🔥 REQUIRED FOR VERCEL & DEV
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { date, records } = body;

    if (!date || !Array.isArray(records)) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    const normalizedDate = new Date(date)
      .toISOString()
      .slice(0, 10);

    await connectDB();

    await Attendance.findOneAndUpdate(
      { date: normalizedDate },
      { date: normalizedDate, records },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ATTENDANCE SAVE ERROR:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
