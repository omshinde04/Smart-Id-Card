import connectDB from "../../../../lib/mongodb";
import IdApplication from "../../../../models/IdApplication";
import { NextResponse } from "next/server";

// 🔥 FORCE THIS ROUTE TO BE DYNAMIC (VERY IMPORTANT FOR VERCEL)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // ✅ Fetch all Third Year applications
    const apps = await IdApplication.find({ year: "TY" }).sort({
      createdAt: -1,
    });

    return NextResponse.json(apps);
  } catch (err) {
    console.error("FACULTY APPLICATIONS ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
