import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {search,type,percent,countFrom,countTo,dayStart,dayEnd} = body;


        let query: any = {}

        if(search) {
            query.OR = [
                {
                    title: {contains: search}
                },
                {
                    code:{contains: search}
                }
            ]
        }
        if(type) {
            query.type = type
        }
        if(percent) {
           
            query.percent = {
                gte:percent
            }
        }
        if(countFrom || countTo) {
          
            query.count = {
                gte:countFrom,
                lte:countTo
            }
        }
        if(dayStart && dayEnd) {
           
            query.OR =[
                {
                    startDate:{gte:new Date(dayStart)}
                },
                {
                   endDate:{gte: new Date(dayEnd) } 
                }
            ]
        }
      

        const discount = await prisma.discount.findMany({
            where: query,
            orderBy: {
                created_at:"desc"
            }
        })

        return NextResponse.json(discount)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}