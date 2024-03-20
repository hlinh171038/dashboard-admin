import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json();
        const {
            text,
            userId,
            userImage,
            userName,
            heart,
        } = body;

        const comment = await prisma.comment.create({
            data: {
                userId,
                userImage,
                userName,
                content: text,
                heart,
            }
        })
        return NextResponse.json(comment)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error" },{status: 500})
    }
}