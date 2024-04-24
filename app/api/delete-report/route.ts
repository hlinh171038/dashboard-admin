import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {
            checkId
        } = body

        
        const report = await prisma.mail.deleteMany({
            where : {
                id:{in:checkId}
            }
        })
        const result = await prisma.mail.findMany({
           
            orderBy: {
                created_at: 'desc'
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Errors"},{status: 500})
    }
}