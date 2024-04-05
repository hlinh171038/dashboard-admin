import prisma from '@/lib/prisma'

export async function getAllDiscount2() {

    try {
        const discount = await prisma.discount.findMany({
            include: {
                transaction: true,
            },
            orderBy: {
                created_at:"desc"
            }
        })

        const safeDiscount = discount.map((item:any)=>({
            ...item,
            transaction: [...item.transaction]
        }))
        return safeDiscount
    } catch (error:any) {
        throw new Error(error)
    }
}