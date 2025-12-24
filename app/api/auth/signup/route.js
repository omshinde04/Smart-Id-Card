import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    return NextResponse.json(
      { message: "Signup successful" },
      { status: 201 }
    );
  } catch (error) {
  console.error("SIGNUP API ERROR >>>", error);
  return NextResponse.json(
    { message: error.message || "Internal server error" },
    { status: 500 }
  );
}

}
