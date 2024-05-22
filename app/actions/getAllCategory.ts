import prisma from '@/lib/prisma'

export async function getAllCategory() {
    try {
        const category = await prisma?.category.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })
        return category
    } catch (error:any) {
        throw new Error(error)
    }
}