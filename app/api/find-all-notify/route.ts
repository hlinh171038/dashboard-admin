import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    try {
        const {userId} = await request.json()
        const notify = await prisma.notify.findMany({
            where:{
                userId: userId
            },
            orderBy:{
                createdAt: 'desc'
            }
        })

        return NextResponse.json(notify)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}