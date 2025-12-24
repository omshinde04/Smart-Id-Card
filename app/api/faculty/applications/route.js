import connectDB from "../../../../lib/mongodb";
import IdApplication from "../../../../models/IdApplication";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const apps = await IdApplication.find({ year: "TY" });
    return NextResponse.json(apps);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
