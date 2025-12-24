import connectDB from "../../../../lib/mongodb";
import IdApplication from "../../../../models/IdApplication";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  await connectDB();
  await IdApplication.findByIdAndUpdate(id, { status: "rejected" });
  return NextResponse.json({ message: "Rejected" });
}
