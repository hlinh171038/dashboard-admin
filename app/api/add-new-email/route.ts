import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json();
        const {
            userId,
            mailSend,
            mailRecive,
        } = body;
        console.log(userId);
        console.log(mailSend);
        console.log(mailRecive);

        const email = await prisma.mail.create({
            data: {
                userId,
                mailSend,
                mailRecive
            }
        })

        return NextResponse.json(email)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}