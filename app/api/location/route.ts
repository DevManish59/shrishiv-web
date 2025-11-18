// import { getFlagEmoji } from "@/lib/location";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     // const ipRes = await fetch("https://api.ipify.org?format=json");
//     // const { ip } = await req.json();
//     const { searchParams } = new URL(req.url);
//     const ip = searchParams.get("ip");

//     const res = await fetch(`https://ipapi.co/${ip}/json/`);
//     console.log("res", res);
//     if (!res.ok) throw new Error("Failed to fetch location data");
//     const data = await res.json();
//     // const geoData = await geoRes.json();
//     return NextResponse.json({
//       countryCode: data.country_code.toLowerCase() || "in",
//       country: data.country_name || "Unknown",
//       city: data.city || "Unknown",
//       flag: getFlagEmoji(data.country_code ?? "IN"),
//       language: (data.languages || navigator.language)
//         .split("-")[0]
//         .toLowerCase(),
//     });

//     // return NextResponse.json({ ip, geoData });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: `Failed ${err?.message}` },
//       { status: 500 }
//     );
//   }
// }
