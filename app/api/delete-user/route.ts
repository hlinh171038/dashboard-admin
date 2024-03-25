import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {id} = body;

        // check id exist
        const idConfirm = await prisma.user.findUnique({
            where: {
                id
            }
        });
        console.log(idConfirm)

        if(!idConfirm){
            return NextResponse.json({error:"Id not found"},{status: 500})
        }

        const userDelete = await prisma.user.delete({
            where: {
                id
            }
        })

        return NextResponse.json(userDelete)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}