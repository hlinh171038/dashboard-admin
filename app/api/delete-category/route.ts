import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {checkId} = body;

      

        const categoryDelete = await prisma.category.deleteMany({
            where: {
                id: {in:checkId}
            }
        })

      

        return NextResponse.json(categoryDelete)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}