import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

// In a real app, this would be in a database
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5 minutes expiry
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // In a real app, you would send this via email
    console.log(`OTP for ${email}: ${otp}`);

    // Clean up expired OTPs
    for (const [key, value] of otpStore.entries()) {
      if (value.expiresAt < Date.now()) {
        otpStore.delete(key);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
} 