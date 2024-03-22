import prisma from '@/lib/prisma'

export async function getAllMail() {
    try {
        const mail = await prisma.mail.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })

        return mail
    } catch (error:any) {
        throw new Error(error)
    }
}