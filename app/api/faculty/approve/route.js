import connectDB from "../../../../lib/mongodb";
import IdApplication from "../../../../models/IdApplication";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();
    await connectDB();

    const enrollment =
      "TY" + new Date().getFullYear() + Math.floor(1000 + Math.random() * 9000);

    await IdApplication.findByIdAndUpdate(id, {
      status: "approved",
      enrollment,
    });

    return NextResponse.json({
      message: "ID Approved",
      enrollment,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Approval failed" },
      { status: 500 }
    );
  }
}
