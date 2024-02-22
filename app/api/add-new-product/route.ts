import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'


export async function POST(request:Request) {
   try {
    const body = await request.json()
    const {
        userId,
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
        transaction,
        salePrice,
        stock,
        size,
        color,
        person
    } = body
    console.log(userId)
  
    const product = await prisma.product.create({
        data:{
            userId,
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
     return NextResponse.json({error:"Internal Server Errors"},{status: 500})
   }
}


  // userId String
  // title String?
  // brand String?
  // image String?
  // category String?
  // weight String?
  // location String?
  // description String?
  // defaultPrice Int?
  // margin Int?
  // tax Int?
  // tag String[]
  // unit String?
  // transportation String[]
  // salePrice Int?
  // stock Int?