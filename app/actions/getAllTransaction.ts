import prisma from '@/lib/prisma'

export async function getAllTransaction() {
    try {
        const transaction = await prisma.transaction.findMany({
            include: {
                user: true
            },
            orderBy: {
                date: 'desc'
            }
        })

        const result = transaction.map((item) =>({
            ...item,
            user: {
                ...item.user,
                name: item.user.name,
                image: item.user.image
            }
        }))
        return result
    } catch (error:any) {
        throw new Error(error)
    }
}