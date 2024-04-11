import prisma from '@/lib/prisma'


export async function getAllTempMail() {
    try {
      

        const mail = await prisma.tempMail.findMany({
    
            orderBy: {
                created_at: 'desc'
            }
        })

        return mail
    } catch (error:any) {
        //console.log(error)
        throw new Error(error)
    }
}