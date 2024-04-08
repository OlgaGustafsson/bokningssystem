import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function GET (_req: Request, _res: Response) {
    try {
        const result = await query ({
            query: 'SELECT * FROM rooms',
            values: [],
        });
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return NextResponse.error();
    }
}

