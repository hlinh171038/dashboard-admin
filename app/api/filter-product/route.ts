import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {query,category,brand,location,price,stock,startDate,endDate} = body;
        const data:any = {}
        if(query){
            data.OR =[
                {
                    title: {contains: query}
                   },
                   {
                    brand: {contains: query}
                   },
                   {
                    category: {contains:query}
                   },
                   {
                    location: {contains:query}
                   }
            ]
           }
      
           if(category) {
            data.category = category;
        }
        if(brand) {
            data.brand = brand;
        }
        if(location) {
            if(location === 'north-side'){
                data.location = {contains: 'ha n'}
            } else if( location === 'soth-side') {
                data.location = {contains: 'ho c'}
            } 
        }
        if(price) {
            const convertPrice = Number(price);
            data.defaultPrice = {
                lte: +convertPrice
            }
        }
        if(stock) {
            if(stock ==='in-stock') {
                data.stock = {
                    gte: 0
                }
            } else {
                data.stock = {
                    lte: 1
                }
            }
        }
        if(startDate && endDate) {
            
               data.AND =[
                   {
                       created_at:{gte:startDate}
                   },
                   {
                       created_at: {lte:endDate}
                   }
               ]
               
              
               
           }

        const product = await prisma.product.findMany({
            where: data,
           orderBy: {
                created_at: 'desc'
           }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Error"},{status: 500})
    }
}