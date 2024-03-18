import prisma from '@/lib/prisma'


export async function getAllDiscount({search,type,percent, countFrom, countTo, dayStart, dayEnd}: {search?: string, type?:string, percent?:number, countFrom?: number, countTo?:number, dayStart?:string, dayEnd?:string}) {
    try {
        let query: any = {}

        if(search) {
            query.OR = [
                {
                    title: {contains: search}
                },
                {
                    code:{contains: search}
                }
            ]
        }
        if(type) {
            query.type = type
        }
        if(percent) {
           
            query.percent = {
                gte:percent
            }
        }
        if(countFrom || countTo) {
          
            query.count = {
                gte:countFrom,
                lte:countTo
            }
        }
        if(dayStart && dayEnd) {
           
            query.OR =[
                {
                    startDate:{gte:new Date(dayStart)}
                },
                {
                   endDate:{gte: new Date(dayEnd) } 
                }
            ]
        }
        const discount = await prisma.discount.findMany({
            where: query,
            orderBy:{
                created_at:"desc"
            }
        })
        return discount
    } catch (error:any) {
        throw new Error(error)
    }
}