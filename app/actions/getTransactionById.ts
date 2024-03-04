import prisma from "@/lib/prisma"

export async function getTransactionById(id:string) {
    try {
        // check id
        const check = await prisma.transaction.findUnique({
            include:{
                user: true
            },
            where: {
                id
            }
        })
        if(! check){
            return null;
        }
        return {
            ...check,
            user:check.user
        }
    } catch (error:any) {
        throw new Error(error)
    }
}