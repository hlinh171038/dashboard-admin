import prisma from '@/lib/prisma'

export async function getAllHistory() {
    try {
        const history = await prisma.history.findMany({
            orderBy:{
                created_at: 'desc'
            }
        });
        return history
    } catch (error:any) {
        throw new Error(error)
    }
}