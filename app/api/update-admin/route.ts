import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {id} = body;
        // check id
        const checkId = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if(!checkId){
            return NextResponse.json({message:'Internal Server Error'},{status:500})
        }
        const update = await prisma.user.update({
            where: {
                id
            },
            data: {
                role:'yes'
            }
        })
        return NextResponse.json(update)
    } catch (error) {
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }
}