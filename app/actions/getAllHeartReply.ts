import prisma from '@/lib/prisma'

export async function getAllHeartRelly() {
    try {
        const heart = await prisma.heartReply.findMany({
            
        });
        return heart
    } catch (error:any) {
        throw new Error(error)
    }
}