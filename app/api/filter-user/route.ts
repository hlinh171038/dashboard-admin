import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {search} = body;

      

        const user = await prisma.user.findMany({
            where: {
                name: {contains:search}
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}