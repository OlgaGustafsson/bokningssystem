import { query } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: Response) {
    try {
    const result = await query ({
        query: "SELECT * FROM games",
        values: []
    });
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        console.error("Error fetching games:", error);
        return NextResponse.error();
    }
}
