import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {id,department,role,permission} = body;
        // check id
        const checkId = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if(!checkId){
            return NextResponse.json({message:'Internal Server Error'},{status:500})
        }

        // check isLeader
        const leader = await prisma.user.findMany({
            where:{
                position: department,
                isLeader: true
            }
        })
        console.log(leader)
        if(leader.length >=1) {
            console.log(leader[0].id)
            const updateLeader = await prisma.user.update({
                where: {
                    id:leader[0].id
                },
                data: {
                    isLeader:false
                }
            })
        }
        const update = await prisma.user.update({
            where: {
                id
            },
            data: {
                role:'yes',
                position: department,
                isLeader:role === 'leader' ? true : false,
                permission: permission
            }
        })
        return NextResponse.json(update)
    } catch (error) {
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }
}