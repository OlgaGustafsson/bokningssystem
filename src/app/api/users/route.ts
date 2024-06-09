import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: Response) {
  try {
    const users = await query({
      query: "SELECT * FROM users",
      values: [],
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching times:", error);
    return NextResponse.error();
  }
}

// inloggning

export async function POST(req: Request, res: Response) {
  try {
    const { email, password } = await req.json();

    // Hämta användaren från databasen baserat på e-postadressen
    const user = await query({
      query: "SELECT * FROM users WHERE user_email = ?",
      values: [email]
    }) as RowDataPacket[];

    // Kontrollera om användaren inte hittades i databasen
    if (user.length === 0) {
      return NextResponse.json({ error: 'Fel användarnamn eller lösenord' });
    }

    // Jämför det angivna lösenordet med det lagrade lösenordet från databasen
    if (password === user[0].user_password) {
      // Om lösenorden matchar, skicka ett lyckat autentiseringsmeddelande
      return NextResponse.json({ message: 'Inloggningen lyckades', user_id: user[0].user_id, user_name: user[0].user_name });
    } else {
      // Om lösenorden inte matchar, skicka felmeddelande
      return NextResponse.json({ error: 'Fel användarnamn eller lösenord' });
    }
  } catch (error) {
    // Om ett fel uppstår, skicka felmeddelande
    console.error('Fel vid inloggning:', error);
    return NextResponse.json({ error: 'Serverfel' });
  }
}

