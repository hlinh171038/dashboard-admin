import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            userId,
                mailSend,
                mailRecive,
                userName,
                userImage,
                content,
        } = body;

        const transaction = await prisma.tempMail.create({
            data: {
                userId,
                mailSend,
                mailRecive,
                userName,
                userImage,
                content,
            }
        })

        return NextResponse.json(transaction)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}