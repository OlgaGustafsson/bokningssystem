import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const times = await query({
      query: "SELECT * FROM times",
      values: [],
    });

    return NextResponse.json(times, { status: 200 });
  } catch (error) {
    console.error("Error fetching times:", error);
    return NextResponse.error();
  }
}
