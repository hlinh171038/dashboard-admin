import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {id} = await request.json()
        const check = await prisma.notify.findUnique({
            where: {
                id
            }
        });

        if(!check){
            return NextResponse.json({error:"Id not existed."},{status:500})
        }
        
        const notify = await prisma.notify.update({
            where: {
                id
            },
            data:{
                mark: true
            }
        });

        return NextResponse.json(notify)
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"},{status: 500})
    }
}