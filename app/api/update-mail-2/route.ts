import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {id,support,status} = await request.json();

        console.log(id)

        //check id
        const check = await prisma.mail.findFirst({
            where: {
                id
            }
        })
        if(!check){
            return NextResponse.json({error:"Id not exist"},{status: 500})
        }
        const mail = await prisma.mail.update({
            where: {
                id
            },
            data:{
                supportBy:support,
                status
            }
        })
        return NextResponse.json(mail)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}