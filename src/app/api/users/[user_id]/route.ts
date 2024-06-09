import { query } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

// hämta bokningar för en specifik användare (baserat på user_id)
export async function GET(req: NextRequest, {params}: {params: {user_id: string}}) {
  try {
    // hämta användar-ID från URL-parametrarna
    const { user_id } = params;

    // kontrollera om användar-ID är tillgängligt
    if (!user_id) {
      return NextResponse.error();
    }

    // användarinformation och deras bokningar baserat på ID:et
    const result = await query({
      query: `
      SELECT u.*, b.*, r.room_name, b.booking_date, g.game_category, t.time
      FROM users u
      LEFT JOIN bookings b ON u.user_id = b.booking_user_id
      LEFT JOIN rooms r ON b.booking_room_id = r.room_id
      LEFT JOIN games g ON b.booking_game_id = g.game_id
      LEFT JOIN times t ON b.booking_time_id = t.time_id
      WHERE u.user_id = ?
      `,
      values: [user_id],
    });

    // returnera användarinformationen och deras bokningar som JSON-svar
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching user and bookings:", error);
    return NextResponse.error();
  }
}