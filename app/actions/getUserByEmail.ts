import prisma from '@/lib/prisma'

export async function getUserByEmail(email:any) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        //console.log(error)
    }
}