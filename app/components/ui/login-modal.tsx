"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      setIsOtpSent(true);
      toast.success("OTP sent to your email");
    } catch {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      const data = await response.json();

      // Update auth context with user data
      login(data.user);

      toast.success("Successfully logged in!");
      onClose();
    } catch {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="relative flex justify-between items-center px-6 pt-6">
          <h2 className="text-2xl font-semibold">Login to Your Account</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!isOtpSent ? (
            <>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-white text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                className="w-full bg-black text-white cursor-pointer"
                onClick={handleSendOtp}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  disabled={isLoading}
                  className="bg-white text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <p className="text-sm text-gray-500">
                  OTP sent to {email}.{" "}
                  <button
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => setIsOtpSent(false)}
                  >
                    Change email
                  </button>
                </p>
              </div>
              <Button
                className="w-full bg-black text-white cursor-pointer"
                onClick={handleVerifyOtp}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
