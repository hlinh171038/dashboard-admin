import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {query} = body;


        let re: any = {}

        if(query) {
            query.OR = [
                {
                    title: {contains: query}
                },
                {
                    code:{contains: query}
                }
            ]
        }
       

        const history = await prisma.history.findMany({
            where: query,
            orderBy: {
                created_at:"desc"
            }
        })

        return NextResponse.json(history)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}