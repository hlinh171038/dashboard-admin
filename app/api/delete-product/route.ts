import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {
            id
        } = body

        const checkId = await prisma.product.findUnique({
            where: {
                id
            }
        })

        if(!checkId) {
            return NextResponse.json({error:"Id not exist"},{status: 500})
        }
        const product = await prisma.product.delete({
            where : {
                id
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Errors"},{status: 500})
    }
}