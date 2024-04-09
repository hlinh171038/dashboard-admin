import prisma from '@/lib/prisma'

export async function getMailById(id:string) {
    try {
        // check id
        const checkId = await prisma.mail.findUnique({
            where: {
                id
            }
        });

        if(!checkId) {
            return null;
        } 

       return checkId
    } catch (error:any) {
        throw new Error(error)
    }
}