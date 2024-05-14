import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function POST(req:Request) {
   try {
    const {email} = await req.json();
    console.log(email)

    const checkEmail = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!checkEmail) {
        return NextResponse.json({error:"Email not exist"},{status: 404})
    }
    return NextResponse.json(checkEmail)
   } catch (error) {
    console.log(error)
    return NextResponse.json({error:"Internal Server Error"},{status: 500})
   }

}