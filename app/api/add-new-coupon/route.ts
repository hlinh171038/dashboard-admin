import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            title,
            percent,
            startDate,
            endDate,
            type,
            count,
            code,
            condition,
            description
        } = body;
       
        const convert = Number(percent);
        const convertCount = Number(count);
        const coupon = await prisma.discount.create({
            data:{
                title,
                percent:convert,
                startDate,
                endDate,
                type,
                count:convertCount,
                code,
                condition,
                description,
                
            }
        })
        return NextResponse.json(coupon)
    } catch (error:any) {
        console.log(error)
        throw new Error(error)
    }
}