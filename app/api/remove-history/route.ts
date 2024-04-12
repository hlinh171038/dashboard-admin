import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {checkId} = await request.json();
        
        
        const del = await prisma.history.deleteMany({
            where: {
                id:{in:checkId}
            }
           

        })
        return NextResponse.json(del)
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status:500}) 
    }
}