import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';
import { contains } from 'validator';

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {search} = body;

        const query:any = {}

        query.role = 'yes'

        if(search) {
            query.OR = [
                {
                    email: {contains: search}
                },
                {
                    name: {contains: search}
                }
            ]
        }
       
        const team = await prisma.user.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        
        return NextResponse.json(team)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}