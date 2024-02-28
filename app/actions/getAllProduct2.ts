import prisma from '@/lib/prisma'

export async function getAllProduct2() {
    try {
        const product = await prisma.product.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })

        return product
    } catch (error: any) {
        throw new Error(error)
    }
}