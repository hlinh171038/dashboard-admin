import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {search,role,action,startDate,endDate} = body;

         // const {search} = params

         const query:any = {}
         if(search) {
             query.OR =[
                 { 
                     name: {contains:search}
                 },
                 {
                     email: {contains: search}
                 }
             ]
         }
 
         if(role) {
             query.role = role
         }
         if(action){
             if(action === 'true') {
                 query.action = true
             }else if(action === 'false') {
                 query.action = false
             } 
         }
         if(startDate && endDate) {
             query.AND =[
                 {
                     createdAt:{gte:startDate}
                 },
                 {
                     createdAt: {lte:endDate}
                 }
             ]
             
            
             
         }
      

        const user = await prisma.user.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}