import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'



export async function GET (request: NextRequest) {

    console.log(request.nextUrl.searchParams.get("query"));
   
    //const body = await request.json()
    
    return NextResponse.json('query')
} 