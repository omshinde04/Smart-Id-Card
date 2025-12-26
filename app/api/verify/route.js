import connectDB from "../../../lib/mongodb";
import IdApplication from "../../../models/IdApplication";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const enrollment = searchParams.get("enrollment");

    if (!enrollment) {
      return NextResponse.json(
        { valid: false, message: "Enrollment missing" },
        { status: 400 }
      );
    }

    await connectDB();

    const student = await IdApplication.findOne({ enrollment });

    // ❌ Not found OR not approved
    if (!student) {
      return NextResponse.json(
        { valid: false, message: "ID not found" },
        { status: 404 }
      );
    }

    if (student.status !== "approved") {
      return NextResponse.json(
        { valid: false, message: "ID is not approved" },
        { status: 403 }
      );
    }

    // ✅ VERIFIED
    return NextResponse.json({
      valid: true,
      student: {
        name: student.name,
        branch: "Computer Engineering",
        year: "Third Year",
        mobile: student.mobile,
        email: student.studentEmail,
      },
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json(
      { valid: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
