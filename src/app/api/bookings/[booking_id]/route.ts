import { query } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";


// hämta bokning by Id
export async function GET(req: NextRequest, {params}: {params: {booking_id: string}}) {
    try {
        const {booking_id} = params;
        console.log("booking_id:", booking_id);

        const result = await query({
        query: 
        // "SELECT * FROM bookings WHERE booking_id=" + 
        // parseInt(booking_id),

            `
                SELECT u.*, b.*, r.room_name, g.game_category, t.time
                FROM bookings b
                LEFT JOIN users u ON b.booking_user_id = u.user_id
                LEFT JOIN rooms r ON b.booking_room_id = r.room_id
                LEFT JOIN games g ON b.booking_game_id = g.game_id
                LEFT JOIN times t ON b.booking_time_id = t.time_id
                WHERE b.booking_id = ?
            `,
            values: [booking_id],
    });
        return NextResponse.json(result, {status: 200});
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }


  // === DELETE =======


// DELETE en bokning permanent 
// export async function DELETE(req: NextRequest, res: Response) {
//   try {
//     const { booking_id } = req.body;

//     // Validera att booking_id finns
//     if (!booking_id) {
//       return NextResponse.error("Missing booking_id", { status: 400 });
//     }

//     // Ta bort bokningen permanent från databasen
//     const result = await query({
//       query: "DELETE FROM bookings WHERE booking_id = ?",
//       values: [booking_id],
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//     return NextResponse.error();
//   }
// }


export async function DELETE(
  req: Request, 
  {params}: {params: {booking_id: string}}) {
  try {
  const {booking_id} = params;
  console.log("booking_id", booking_id);

  if (!booking_id) {
    return NextResponse.error("Missing booking_id", { status: 400 });
}
  
  const result = await query ({
      query: "DELETE FROM bookings WHERE booking_id=" + parseInt(booking_id),
      values: [], 

      // SOFT DELETE
      // const result = await query ({
      //     query: "UPDATE bookings SET deleted=1 WHERE booking_id = " + parseInt(id) 
      
  });
    return NextResponse.json(result, {status: 200})
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
}