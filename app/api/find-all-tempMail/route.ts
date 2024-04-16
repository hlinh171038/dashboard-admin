import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    try {
        const {userId} = await request.json()
        const tempMail = await prisma.tempMail.findMany({
            where:{
                userId: userId
            }
        })

        return NextResponse.json(tempMail)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}