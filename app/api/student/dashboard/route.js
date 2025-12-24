import connectDB from "../../../../lib/mongodb";
import IdApplication from "../../../../models/IdApplication";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    await connectDB();

    const app = await IdApplication.findOne({ studentEmail: email });
    return NextResponse.json(app || null);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
