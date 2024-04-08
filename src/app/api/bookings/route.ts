import { query } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: Response) {

  try {
  const result = await query({
    // query: "SELECT * FROM bookings ORDER BY booking_date DESC",
    query: `
        SELECT b.booking_id, b.booking_date, u.user_name, r.room_name, g.game_category, g.game_id,
        t.time, b.booking_description, b.booking_max_players, b.booking_private, b.booking_user_id
        FROM bookings b
        JOIN users u ON b.booking_user_id = u.user_id
        JOIN rooms r ON b.booking_room_id = r.room_id
        JOIN games g ON b.booking_game_id = g.game_id
        JOIN times t ON b.booking_time_id = t.time_id
        
        ORDER BY b.booking_date DESC
      `,

    values: [],
  });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching bokings:", error);
    return NextResponse.error();
    }
}

export async function POST(req: Request, res: Response) {
  try {
    const {
      booking_user_id,
      booking_room_id,
      booking_game_id,
      booking_description,
      booking_date,
      booking_private,
      booking_deleted,
      booking_time_id,
      booking_max_players,
    } = await req.json();

    // validera data innan man infogar i databasen
    if (!booking_user_id || !booking_room_id || !booking_date || !booking_time_id) {
      return NextResponse.error("Missing required fields", { status: 400 });
    }

    // Kolla om tiden redan är upptagen innan m infogar bokningen i databasen
    const existingBookings = await query({
      query: "SELECT * FROM bookings WHERE booking_date = ? AND booking_room_id = ? AND booking_time_id = ?",
      values: [booking_date, booking_room_id, booking_time_id],
    });
    console.log('Existing bookings:', existingBookings);

    if (existingBookings.length > 0) {
      // Tiden är redan upptagen, returnera ett felmeddelande
      return NextResponse.error("Den valda tiden är redan upptagen. Vänligen välj en annan tidpunkt", { status: 400 });
    }


    const result = await query({
      query: "INSERT INTO bookings (booking_user_id, booking_room_id, booking_game_id, booking_description, booking_date, booking_private, booking_deleted, booking_time_id, booking_max_players) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        booking_user_id, 
        booking_room_id, 
        booking_game_id, 
        booking_description || null, 
        booking_date, 
        booking_private || false, 
        false, // booking_deleted
        booking_time_id, 
        booking_max_players || null,
      ],
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding booking:", error);
    return NextResponse.error();
  }
  
}

