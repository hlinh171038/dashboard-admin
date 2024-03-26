import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
       
        const notify = await prisma.notify.deleteMany({
           
        });

        return NextResponse.json(notify)
    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}