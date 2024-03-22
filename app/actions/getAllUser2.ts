import prisma from '@/lib/prisma'

export async function getAllUser2() {
    try {
        const user = await prisma.user.findMany({
            include: {
                comment: true,
                mail: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        const safeuser = user.map(
            (user) =>({
                ...user,
                comment: [
                    ...user.comment
                ],
                mail: [
                    ...user.mail
                ]
            })
        )
        return safeuser
    } catch (err:any) {
        throw new Error(err)
    }
}