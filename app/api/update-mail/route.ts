import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {mailId} = await request.json();

        //check id
        const check = await prisma.mail.findFirst({
            where: {
                id:mailId
            }
        })
        if(!check){
            return NextResponse.json({error:"Id not exist"},{status: 500})
        }
        const mail = await prisma.mail.update({
            where: {
                id:mailId
            },
            data:{
                seen: true
            }
        })
        return NextResponse.json(mail)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}