import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    try {
        
        const {userId,rellyId} = await request.json()
        const checkUser = await prisma.heartReply.findFirst({
            where: {
                userId
            }
        });
      // user exsit --> check commentId (commentId -->exist (delete) / else add commentId)
      // user not exist -->add comment Id,userId
      
        if(!checkUser) {
          
            const result = await prisma.heartReply.create({
                data: {
                    userId,
                    rellyId,
                    status: 'yes'
                }
            })
            return NextResponse.json(result)
        }
        else {
            const checkComment = await prisma.heartReply.findFirst({
                where: {
                    rellyId
                }
            })
            if(!checkComment) {
                //have userId, dont commentId --> add
                const result = await prisma.heartReply.create({
                    data: {
                        userId,
                        rellyId,
                        status: 'yes'
                    }
                })
                return NextResponse.json(result)

            } else {
                //have userId , have commentId --- >delete
                const result = await prisma.heartReply.deleteMany({
                where: {
                    userId,
                    rellyId
                }
            })
            return NextResponse.json(result)
            }
            
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}