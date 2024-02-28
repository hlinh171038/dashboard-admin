import prisma from '@/lib/prisma'

export async function getAllUser2() {
    try {
        const user = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return user
    } catch (err:any) {
        throw new Error(err)
    }
}