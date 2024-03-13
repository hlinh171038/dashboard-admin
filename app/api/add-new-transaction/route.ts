import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            userId,
            productId,
            status, // cancel,pending,done
            amount,
            totalPrice,
            transportation,
            type,
            bank
        } = body;

        console.log(userId)
        console.log(status)
        const transaction = await prisma.transaction.create({
            data: {
                userId,
                discountId:'sss',
                productId,
                status,
                amount,
                totalPrice,
                transportation,
                type,
                bank
            }
        })

        return NextResponse.json(transaction)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}