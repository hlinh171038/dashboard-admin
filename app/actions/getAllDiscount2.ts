import prisma from '@/lib/prisma'

export async function getAllDiscount2() {

    try {
        const discount = await prisma.discount.findMany({
            orderBy: {
                created_at:"desc"
            }
        })

        return discount
    } catch (error:any) {
        throw new Error(error)
    }
}