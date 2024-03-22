import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {mailId} = await request.json();
        const check = await prisma.mail.findFirst({
            where:{
                id:mailId
            }
        });
        if(!check){
            return NextResponse.json({error:"Id not exist"},{status:500}) 
        }
        const mail = await prisma.mail.delete({
            where: {
                id:mailId
            }

        })
        return NextResponse.json(mail)
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status:500}) 
    }
}