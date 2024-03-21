import prisma from '@/lib/prisma'

export async function getAllReply() {
    try {
        const relly = await prisma.relly.findMany({
            include: {
                heartRelly: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeRelly = relly.map(
            (relly) =>({
                ...relly,
                heartRelly: [
                    ...relly.heartRelly
                ]
            })
        )
        return safeRelly
    } catch (error:any) {
        throw new Error(error)
    }
}