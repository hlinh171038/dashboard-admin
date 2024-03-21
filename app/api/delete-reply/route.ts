import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
    try {
        const {id} = await request.json()

        const re = await prisma.relly.findUnique({
            where: {
                id
            }
        });

        if(!re) {
            return NextResponse.json({error: "id not exist"}, {status:500})
        }
        const result = await prisma.relly.delete({
            where: {
                id
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status:500})
    }
}