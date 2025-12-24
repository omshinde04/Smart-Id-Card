import connectDB from "../../../../lib/mongodb";
import IdApplication from "../../../../models/IdApplication";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const {
      studentEmail,
      name,
      mobile,
      dob,
      blood,
      address,
      photo,
    } = body;

    /* ================= VALIDATIONS ================= */

    if (!studentEmail) {
      return NextResponse.json(
        { message: "Student email is required" },
        { status: 400 }
      );
    }

    if (!name || !mobile || !dob || !blood || !address) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!photo || !photo.startsWith("https://")) {
      return NextResponse.json(
        { message: "Valid photo URL is required" },
        { status: 400 }
      );
    }

    /* ================= DUPLICATE CHECK ================= */

    const exists = await IdApplication.findOne({ studentEmail });

    if (exists) {
      return NextResponse.json(
        { message: "ID already applied for this email" },
        { status: 409 }
      );
    }

    /* ================= CREATE APPLICATION ================= */

    await IdApplication.create({
      studentEmail,
      name,
      mobile,
      dob,
      blood,
      address,
      year: "TY",
      photo, // ✅ Cloudinary HTTPS URL
      status: "pending",
    });

    return NextResponse.json(
      { message: "ID Application Submitted Successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("APPLY ID ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
