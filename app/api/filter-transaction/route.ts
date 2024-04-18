import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {status,payment,startDate,endDate} = body;

        const query:any = {}

        // if(search) {
        //     query.OR = [
        //         {
        //             status: {contains: search}
        //         }
        //     ]
        // }
        if(status) {
            query.status = status
        }
        if(payment) {
            if(payment ==='online') {
                query.transportation = 'card'
            } else {
                query.transportation = 'payment'
            }
            
        }
   
        if(startDate && endDate) {
            query.date = {
                gte: startDate, // Greater than or equal to start date
                lte:  endDate,   // Less than end date (exclusive)
            }

            
        }
         

        const transaction = await prisma.transaction.findMany({
            where: query,
            include: {
                user: true
            },
            orderBy: {
                date: 'desc'
            }
        })

        const result = transaction.map((item) =>({
            ...item,
            user: {
                ...item.user,
                name: item.user.name,
                image: item.user.image
            }
        }))
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}