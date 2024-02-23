import prisma from '@/lib/prisma'

export async function getAllProduct() {
    try {
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