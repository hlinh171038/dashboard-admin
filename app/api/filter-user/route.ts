import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {search,role,status,province,startDate,endDate} = body;

         // const {search} = params

         const query:any = {}
         if(search) {
             query.OR =[
                 { 
                     name: {contains: search.toLowerCase() || search.toUpperCase() || search}
                 },
                 {
                     email: {contains: search.toLowerCase() || search.toUpperCase() || search}
                 }
             ]
         }
 
         if(role) {
             query.role = role
         }
         if(status){
            if(status === 'true') {
                query.block = true
            }else if(status === 'false') {
                query.block = false
            } 
        }
        // province
        if(province) {
            query.province = province
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