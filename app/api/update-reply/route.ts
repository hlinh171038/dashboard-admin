import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {id,content} = await request.json()
        const checkId = await prisma.relly.findUnique({
            where: {
                id
            }
        });

        if(!checkId) {
            return NextResponse.json({error:"Interal Server Error"},{status: 500})
        }
        const result = await prisma.relly.update({
            where: {
                id
            },
            data: {
                content,
                
            }
        })

        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Interal Server Error"},{status: 500})
    }
}