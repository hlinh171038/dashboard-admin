import prisma from "@/lib/prisma"

export interface Iparams {
    search: string
}
export async function getAlluser(params: Iparams) {
    try {
        const {search} = params

        const query:any = {}

        if(search) {
            query.name = search
        }
       
        const users = await prisma.user.findMany({
            where: query,
            orderBy:{
                createdAt: "desc"
            }
        })
        return users
    } catch (error:any) {
        throw new Error(error)
    }
}