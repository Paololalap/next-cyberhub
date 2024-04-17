import { NextResponse } from "next/server";

export async function POST(request) {
    try {
    const { url } = await request.json();
    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GSB_APIKEY}`,
      {
        threatInfo: {
          threatTypes: [
            "THREAT_TYPE_UNSPECIFIED",
            "MALWARE",
            "SOCIAL_ENGINEERING",
            "UNWANTED_SOFTWARE",
            "POTENTIALLY_HARMFUL_APPLICATION",
          ],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url: url }],
        },
      },
    );
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}