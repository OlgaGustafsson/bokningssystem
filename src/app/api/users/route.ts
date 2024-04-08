import { query } from "@/lib/db";
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
    });

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



// ============


// export async function POST(req: Request, res: Response) {
//   try {
//     const { email, password, user_name } = await req.json();

//     // Kontrollera om användaren redan finns i databasen
//     const userExists = await query({
//       sql: "SELECT * FROM users WHERE user_email = ?",
//       values: [email]
//     });

//     if (Array.isArray(userExists) && userExists.length > 0) {
//       // Användaren finns redan, försök logga in
//       const user = userExists[0];
//       if (password === user.user_password) {
//         // Inloggning lyckades
//         return NextResponse.json({ message: 'Inloggningen lyckades', user });
//       } else {
//         // Fel lösenord
//         return NextResponse.json({ error: 'Fel lösenord' });
//       }
//     } else {
//       // Användaren finns inte, registrera ny användare
//       await query({
//         sql: "INSERT INTO users (user_email, user_name, user_password) VALUES (?, ?, ?)",
//         values: [email, user_name, password]
//       });

//       // Hämta den nya användaren från databasen
//       const newUser = await query({
//         sql: "SELECT * FROM users WHERE user_email = ?",
//         values: [email]
//       });

//       return NextResponse.json({ message: 'Användaren har registrerats', user: newUser });
//     }
//   } catch (error) {
//     console.error('Fel vid inloggning eller registrering:', error);
//     return NextResponse.json({ error: 'Serverfel' });
//   }
// }




// ====================



// export async function POST(req: Request, res: Response) {
//   try {
//     const { email, user_name } = await req.json();

//     const userExists = await query({
//       sql: "SELECT * FROM users WHERE user_email = (?)",
//       values: [email]
//     });
//     if (Array.isArray(userExists) && userExists.length > 0) {
//       return NextResponse.json(userExists);
//     }
//     await query({
//       sql: "INSERT INTO users (user_email, user_name) VALUES (?, ?)",
//       values: [email, user_name]
//     });

//     const newUser = await query({
//       sql: "SELECT * FROM users WHERE user_email = (?)",
//       values: [email]
//     });
//     return NextResponse.json(newUser);
//   } catch (error) {
//     return NextResponse.json({ message: error });
//   }
// }



