import connectDB from "../../../../../lib/mongodb";
import IdApplication from "../../../../../models/IdApplication";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  const students = await IdApplication.find(
    { status: "approved" },
    { name: 1, enrollment: 1 }
  );

  return NextResponse.json(students);
}
