import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

// Reference to the OTP store from send-otp route
declare const otpStore: Map<string, { otp: string; expiresAt: number }>;

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const storedData = otpStore.get(email);

    if (!storedData) {
      return NextResponse.json(
        { error: "No OTP found for this email" },
        { status: 400 }
      );
    }

    if (storedData.expiresAt < Date.now()) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: "OTP has expired" },
        { status: 400 }
      );
    }

    if (storedData.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // OTP is valid - create user session
    const user = {
      id: nanoid(),
      email,
      createdAt: new Date().toISOString(),
    };

    // Clear the used OTP
    otpStore.delete(email);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
} 