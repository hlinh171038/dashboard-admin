import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { error } from "console";


export async function POST(request:Request) {
   try {
    const body = await request.json()
    const {
        text
    } = body
   
    // check text is existed
    const exist = await prisma.category.findFirst({
        where: {
            name: text
        }
    })

    if(exist) {
        return NextResponse.json({error:"Category name is existed !!!"},{status: 500})
    }
  
    const category = await prisma.category.create({
        data:{
           name:text,
           quantity: 0
        }
    })

    return NextResponse.json(category)
   } catch (error) {
    console.log(error)
     return NextResponse.json({error:"Internal Server Errors"},{status: 500})
   }
}


  