import { NextResponse } from "next/server"
import prisma from '@/lib/prisma'


export async function POST(request:Request) {
    try {
        const {status,id} = await request.json()

        //check id
        const check = await prisma.transaction.findUnique({
            where: {
                id
            }
        })

        if(!check) {
            return NextResponse.json({error:"Id not existed"},{status: 404})
        }

        const result = await prisma.transaction.update({
            where:{
                id,
            },
            data:{
                status
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}