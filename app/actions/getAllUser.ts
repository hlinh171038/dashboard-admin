import prisma from "@/lib/prisma"

export interface Iparams {
    search: string
}
export async function getAlluser(params: Iparams) {
    try {
        const {search} = params

        const query:any = {}

        if(search) {
            const users = await prisma.user.findMany({
                where: {
                    OR: [
                        {
                            name: { contains: search}
                        },
                        {
                            email: {contains: search}
                        }
                    ]
                    
                },
                orderBy:{
                    createdAt: "desc"
                }
            })
            return users
        }
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })
        return users
       
    } catch (error:any) {
        throw new Error(error)
    }
}