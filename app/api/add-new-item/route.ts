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
            heart
        } = body;

        const reply = await prisma.relly.create({
            data: {
                commentId,
                content,
                heart,
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