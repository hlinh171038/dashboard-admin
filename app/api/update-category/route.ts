import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {id,content} = await request.json()
        const checkId = await prisma.category.findUnique({
            where: {
                id
            }
        });

        if(!checkId) {
            return NextResponse.json({error:"Id is existed !!!"},{status: 500})
        }
        // check text is existed
        const exist = await prisma.category.findFirst({
            where: {
                name: content
            }
        })

        if(exist) {
            return NextResponse.json({error:"Category name is existed !!!"},{status: 500})
        }
  
        const result = await prisma.category.update({
            where: {
                id
            },
            data: {
                name:content
            }
        })

        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Interal Server Error"},{status: 500})
    }
}