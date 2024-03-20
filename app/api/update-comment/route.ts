import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {id,content,heart} = await request.json()
        const checkId = await prisma.comment.findUnique({
            where: {
                id
            }
        });

        if(!checkId) {
            return NextResponse.json({error:"Interal Server Error"},{status: 500})
        }
        const result = await prisma.comment.update({
            where: {
                id
            },
            data: {
                content,
                heart
            }
        })

        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Interal Server Error"},{status: 500})
    }
}