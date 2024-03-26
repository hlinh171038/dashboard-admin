import prisma from '@/lib/prisma'

export async function getAllNotify(){
    try {
        const notify = await prisma.notify.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return notify
    } catch (error:any) {
        throw new Error(error)
    }
}