import { NextResponse } from "next/server"
import prisma from '@/lib/prisma'


export async function POST(request:Request) {
    try {
        const {name} = await request.json()

        console.log(name)
        //check id
        const check = await prisma.category.findFirst({
            where: {
                name
            }
        })

        if(!check) {
            return NextResponse.json({error:"Category not existed"},{status: 404})
        }
        let amount = check?.quantity ;
        let increasing =  amount as number +1;

        console.log('amount',increasing)
        const result = await prisma.category.updateMany({
            where:{
                name
            },
            data:{
                quantity:increasing,
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}