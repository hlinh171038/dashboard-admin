import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'


export async function POST(request:Request) {
   try {
    const body = await request.json()
    const {
        text
    } = body
    
  
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


  