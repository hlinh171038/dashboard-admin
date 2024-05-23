import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { contains } from 'validator';


export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {search} = body;

        const category = await prisma.category.findMany({
            where: {
                name: {contains: search}
            },
            orderBy: {
                created_at:"desc"
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}