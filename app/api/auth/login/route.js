import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Email, password and role are required" },
        { status: 400 }
      );
    }

    /* =========================
       ADMIN LOGIN (ENV)
    ========================== */
    if (role === "Admin") {
      if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
      ) {
        return NextResponse.json(
          { message: "Invalid admin credentials" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        message: "Admin login successful",
        role: "admin",
        redirectUrl: "http://localhost:3000/admin/dashboard",
      });
    }

    /* =========================
       FACULTY LOGIN (ENV)
    ========================== */
    if (role === "Faculty") {
      if (
        email !== process.env.FACULTY_EMAIL ||
        password !== process.env.FACULTY_PASSWORD
      ) {
        return NextResponse.json(
          { message: "Invalid faculty credentials" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        message: "Faculty login successful",
        role: "faculty",
        redirectUrl: "http://localhost:3000/faculty/dashboard",
      });
    }

    /* =========================
       STUDENT LOGIN (DB)
    ========================== */
    if (role === "Student") {
      await connectDB();

      const user = await User.findOne({ email, role: "student" });
      if (!user) {
        return NextResponse.json(
          { message: "Student not found" },
          { status: 404 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        message: "Student login successful",
        role: "student",
       redirectUrl: "/student/dashboard",

      });
    }

    return NextResponse.json(
      { message: "Invalid role selected" },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
