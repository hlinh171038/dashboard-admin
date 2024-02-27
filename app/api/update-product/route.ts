import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {
            productId ,
            title,
            brand,
            image,
            weight,
            location,
            description,
            stock,
            category,
            tag,
            unit,
            transaction,
            defaultPrice,
            margin,
            tax,
            salePrice,
            color,
            size,
            person
            } = body;

        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                title,
                brand,
                image,
                category,
                weight,
                location,
                description,
                defaultPrice,
                margin,
                tax,
                tag,
                unit,
                transportation:transaction,
                salePrice,
                stock,
                size,
                color,
                designFor: person
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}