import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    

    try {
        const data = await request.json()

    const {
        isSalePrice,
        id
    } = data

    console.log(isSalePrice)
    console.log(id)

    // exactly id
    const idconfirm = await prisma.product.findUnique({
        where: {
            id
        }
    })


    if(!idconfirm) {
        return NextResponse.json({error:"Id not found."},{status:404})
    }
    const updateUser = await prisma.product.update({
        where: {
          id
        },
        data: {
         isSalePrice
        },
      })

      return NextResponse.json(updateUser)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Errors"},{status:500})
    }

}