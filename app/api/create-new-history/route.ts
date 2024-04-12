import { NextResponse } from "next/server"
import prisma from '@/lib/prisma'


export async function POST(request:Request) {
    try {
        const {userId,type,title} = await request.json();

        const history = await prisma.history.create({
            data: {
                userId,
                type,
                title
            }
        })

        return NextResponse.json(history)
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}