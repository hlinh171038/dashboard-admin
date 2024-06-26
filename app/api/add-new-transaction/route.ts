

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            userId,
            discountId,
            productId,
            status, // cancel,pending,done
            amount,
            totalPrice,
            transportation,
            type,
            bank,
            image,
            price,
            title,
            size,
            color,
            quantity
        } = body;

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                discountId,
                productId,
                status,
                amount,
                totalPrice,
                transportation,
                type,
                bank,
                image,
                title,
                size,
                color,
                price,
                quantity
            }
        })

        return NextResponse.json(transaction)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}