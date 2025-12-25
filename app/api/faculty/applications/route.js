import connectDB from "../../../../lib/mongodb";
import IdApplication from "../../../../models/IdApplication";
import { NextResponse } from "next/server";

// 🔥 Force dynamic to avoid Vercel caching issues
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // ✅ Fetch all Third Year applications with REQUIRED fields
    const apps = await IdApplication.find(
      { year: "TY" },
      {
        name: 1,
        studentEmail: 1,
        mobile: 1,
        dob: 1,
        blood: 1,
        address: 1,
        photo: 1,
        status: 1,
        enrollment: 1,
        year: 1,
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });

    return NextResponse.json(apps);
  } catch (err) {
    console.error("FACULTY APPLICATIONS ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
