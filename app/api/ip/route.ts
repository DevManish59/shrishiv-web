import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    const ip = await response.json();

    return NextResponse.json(ip);
  } catch (error) {
    console.error("❌ Error fetching ip address from external data:", error);
    console.log("Error fetching data from ip address from external api");
    return NextResponse.json({ ip: "127.0.0.1" });
  }
}
