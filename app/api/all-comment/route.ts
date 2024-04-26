import { NextResponse } from "next/server"
import prisma from '@/lib/prisma'


export async function POST(request:Request) {
    try {
        const {page,per_page,sort} = await request.json();

        const skip = (page -1) * per_page;

      

         

        const comments = await prisma.comment.findMany({
           skip,
           take:per_page,
           orderBy: {
            createdAt: sort ==='asc' ? 'asc' : 'desc'
           },
           include: {
            heart:true,
            relly: true
           }
        })

        const safeComment = comments.map((comment)=>({
            ...comment,
            heart:[...comment.heart],
            relly:[...comment.relly]
        }))
        return NextResponse.json(comments)
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}