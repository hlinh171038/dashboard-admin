import prisma from '@/lib/prisma'

export async function getAllReply() {
    try {
        const reply = await prisma.relly.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply
    } catch (error:any) {
        throw new Error(error)
    }
}