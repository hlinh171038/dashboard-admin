import prisma from '@/lib/prisma'

export async function getAllTransaction({search,status,payment,startDate,endDate}: {search?:string,status?:string,payment?:string,startDate?:string,endDate?:string}) {
    try {
        const query:any = {}

        // if(search) {
        //     query.OR = [
        //         {
        //             status: {contains: search}
        //         }
        //     ]
        // }
        if(status) {
            query.status = status
        }
        if(payment) {
            if(payment ==='online') {
                query.transportation = 'card'
            } else {
                query.transportation = 'payment'
            }
            
        }
   
        if(startDate && endDate) {
            query.date = {
                gte: startDate, // Greater than or equal to start date
                lte:  endDate,   // Less than end date (exclusive)
            }

            
        }
        const transaction = await prisma.transaction.findMany({
            where : query,
            include: {
                user: true
            },
            orderBy: {
                date: 'desc'
            }
        })

        const result = transaction.map((item) =>({
            ...item,
            user: {
                ...item.user,
                name: item.user.name,
                image: item.user.image
            }
        }))
        return result
    } catch (error:any) {
        throw new Error(error)
    }
}