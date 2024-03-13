import prisma from '@/lib/prisma'


export async function getAllDiscount({search}: {search: string}) {
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