import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url } = await request.json();
    const response = await fetch(
      `https://www.ipqualityscore.com/api/json/url/${process.env.IQS_APIKEY}/${encodeURIComponent(
        url
      )}`
    );
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
