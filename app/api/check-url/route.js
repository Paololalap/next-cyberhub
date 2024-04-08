import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url } = await request.json();
    const apiKey = 'FA4Tf3E1pL9ksGSDjsZ1Vuc93Fxsb8EJ';
    const response = await fetch(
      `https://www.ipqualityscore.com/api/json/url/${apiKey}/${encodeURIComponent(
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
