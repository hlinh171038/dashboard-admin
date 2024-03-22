import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {id} = await request.json();

        const check = await prisma.mail.deleteMany({
            where:{
                userId:id
            }
        })
        if(!check) {
            return NextResponse.json({error:"Id not exist"},{status:500})
        }
        return NextResponse.json(check)
    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}