import prisma from '@/lib/prisma'

export async function getPost()
{
        try {
            const allUser = await prisma.user.findMany({
                orderBy:{
                    createdAt: 'desc'
                }
            });
            return allUser
        } catch (error:any) {
            throw new Error(error)
        }
}