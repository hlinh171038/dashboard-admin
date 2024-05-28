import prisma from '@/lib/prisma'



export async function getAllProduct({query,category,brand,price,province,stock,start,end}: {query?:string, category?:string,brand?:string,price?:string,province?:string,stock?:string,start?:string,end?:string}) {
    try {
       let product:any[] = []
        const data:any= {}

       if(query){
        data.OR =[
            {
                title: {contains: query.toLowerCase() || query.toUpperCase() || query}
               },
               {
                brand: {contains: query.toLowerCase() || query.toUpperCase() || query}
               },
               {
                category: {contains:query.toLowerCase() || query.toUpperCase() || query}
               },
               {
                location: {contains:query.toLowerCase() || query.toUpperCase() || query}
               }
        ]
       }
        if(category) {
            data.category = category;
        }
        if(brand) {
            data.brand = brand;
        }
        if(province) {
           data.province = province;
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