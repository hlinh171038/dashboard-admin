import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {id} = await request.json();

        const check = await prisma.tempMail.deleteMany({
            
        })
        if(!check) {
            return NextResponse.json({error:"Id not exist"},{status:500})
        }
        const result = await prisma.tempMail.findMany()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}