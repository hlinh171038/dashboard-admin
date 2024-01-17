import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const result = await sql`CREATE TABLE User (
                                    id int,
                                    email varchar(255),
                                    name varchar(255), 
                                    
                                    );
                                    `
    } catch (error) {
        return NextResponse.json({error}, {status:500})
    }
}