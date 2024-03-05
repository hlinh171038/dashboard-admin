import prisma from '@/lib/prisma'

export async function getAllTransaction2() {
    try {
        const transaction = await prisma.transaction.findMany({
            include:{
                user: true
            },
           orderBy: {
            date: 'desc'
           }
        })
        const result = transaction.map((item)=>({
            ...item,
            user:{...item.user}
        }));
        return result
    } catch (error:any) {
       throw new Error(error)
    }
}