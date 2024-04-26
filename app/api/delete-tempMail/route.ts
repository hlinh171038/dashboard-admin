import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {mailId} = await request.json();
        const check = await prisma.tempMail.findFirst({
            where:{
                id:mailId
            }
        });
        if(!check){
            return NextResponse.json({error:"Id not exist"},{status:500}) 
        }
        const temp = await prisma.tempMail.delete({
            where: {
                id:mailId
            }
           

        })

        const result = await prisma.tempMail.findMany()
        return NextResponse.json(result)
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status:500}) 
    }
}