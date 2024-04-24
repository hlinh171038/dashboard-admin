import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {
            checkId
        } = body

        
        const product = await prisma.product.deleteMany({
            where : {
                id:{in:checkId}
            }
        })

        const result = await prisma.product.findMany({
           
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