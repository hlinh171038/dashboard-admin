import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {mailId} = await request.json();

        //check id
        const check = await prisma.tempMail.findFirst({
            where: {
                id:mailId
            }
        })
        if(!check){
            return NextResponse.json({error:"Id not exist"},{status: 500})
        }
        const mail = await prisma.tempMail.update({
            where: {
                id:mailId
            },
            data:{
                seen: true
            }
        })

        const result = await prisma.tempMail.findMany({
            orderBy: {
                created_at: "desc"
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}