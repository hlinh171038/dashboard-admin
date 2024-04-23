import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {checkId} = body;
        // check id
       
        const update = await prisma.user.updateMany({
            where: {
                id:{in: checkId}
            },
            data: {
                role:'no',
                position: null,
                isLeader:null,
            }
        })
        const result = await prisma.user.findMany({
            where: {
                role: 'yes'
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status: 500})
    }
}