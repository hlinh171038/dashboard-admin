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
        return NextResponse.json(report)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Errors"},{status: 500})
    }
}