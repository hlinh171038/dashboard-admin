import prisma from '@/lib/prisma'

export async function getAllCategory({search}:{search?:string }) {
    try {
    
        const category = await prisma.category.findMany({
            where: {
                name: {contains: search}
            },
            orderBy: {
                created_at: 'desc'
            }
        })
        return category
    } catch (error:any) {
        throw new Error(error)
    }
}