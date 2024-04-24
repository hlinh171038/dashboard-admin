import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {checkId} = body;

      

        const userDelete = await prisma.user.deleteMany({
            where: {
                id: {in:checkId}
            }
        })

        const result = await prisma.user.findMany({
           
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}