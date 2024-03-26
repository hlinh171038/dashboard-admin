import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const {userId,commentId,userName,userImage,mark,type} = await request.json()

        if(type === 'relly') {
            
            const notify = await prisma.notify.create({
                data:{
                    userId,
                    commentId,
                    userName,
                    userImage,
                    mark,
                    type
                }
            })
            return NextResponse.json(notify)
        }
        const check = await prisma.notify.findFirst({
            where:{
                userId,
                commentId,
            }
        });
        if(check){
            return NextResponse.json({error: "userId is exist"},{status:500})
        }
        const notify = await prisma.notify.create({
            data:{
                userId,
                commentId,
                userName,
                userImage,
                mark,
                type
            }
        })
        return NextResponse.json(notify)
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"},{status:500})
    }
}