import prisma from '@/lib/prisma'
import { contains } from 'validator'

export async function getAllProduct({query}: {query?:string}) {
    try {
        if(query) {
            const product = await prisma.product.findMany({
                where: {
                    OR:[
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
            })

            return product
        }
        const product = await prisma.product.findMany({
            orderBy:{
                created_at:'desc'
            }
        })

        return product
    } catch (error:any) {
        throw new Error(error)
    }
}