import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json();
        const {
            content,
            commentId,
            userImage,
            userName,
            userId,
        } = body;

        const reply = await prisma.relly.create({
            data: {
                commentId,
                userId,
                content,
                userImage,
                userName
            }
        })
        return NextResponse.json(reply)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error" },{status: 500})
    }
}