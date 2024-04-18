import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {search,role,status,start,end} = body;
        const query:any = {}

        if(search) {
            query.OR =[
                {
                    mailSend: {contains: search}
                }
            ]
        }
        if(status) {
            query.status = status
        }

        if(role) {
            query.role = role
        }

        if(start && end) {
            query.AND =[
                {
                    created_at:{gte:start}
                },
                {
                    created_at: {lte:end}
                }
            ]
        }

        const report = await prisma.mail.findMany({
            where: query,
           orderBy: {
                created_at: 'desc'
           }
        })

        return NextResponse.json(report)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}