import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    try {
        
        const {userId,commentId,userName,userImage} = await request.json()
        const checkUser = await prisma.heart.findFirst({
            where: {
                userId
            }
        });
      // user exsit --> check commentId (commentId -->exist (delete) / else add commentId)
      // user not exist -->add comment Id,userId
      
        if(!checkUser) {
            console.log('try')
            const result = await prisma.heart.create({
                data: {
                    userId,
                    commentId,
                    userName,
                    userImage,
                    status: 'yes'
                }
            })
            return NextResponse.json(result)
        }
        else {
            const checkComment = await prisma.heart.findFirst({
                where: {
                    commentId
                }
            })
            if(!checkComment) {
                //have userId, dont commentId --> add
                const result = await prisma.heart.create({
                    data: {
                        userId,
                        commentId,
                        userName,
                        userImage,
                        status: 'yes'
                    }
                })
                return NextResponse.json(result)

            } else {
                //have userId , have commentId --- >delete
                const result = await prisma.heart.deleteMany({
                where: {
                    userId,
                    commentId
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