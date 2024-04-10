import prisma from '@/lib/prisma'
import { contains } from 'validator'


export async function getAllProduct({query,category,brand,price,location,stock,start,end}: {query?:string, category?:string,brand?:string,price?:string,location?:string,stock?:string,start?:string,end?:string}) {
    try {
       let product:any[] = []
        const data:any= {}

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
        if(start && end) {
            
               data.AND =[
                   {
                       created_at:{gte:start}
                   },
                   {
                       created_at: {lte:end}
                   }
               ]
               
              
               
           }
            product = await prisma.product.findMany({
                where: data,
                orderBy:{
                    created_at:'desc'
                }
            })
        
             
        
        

        return product
    } catch (error:any) {
        throw new Error(error)
    }
}