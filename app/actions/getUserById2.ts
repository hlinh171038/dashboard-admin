import prisma from '@/lib/prisma'



export async function getuserById2(id:string| null){
    try {
            if(!id){
                return null
            }
        
        const userById = await prisma.user.findUnique({
            include:{
                transaction: true
            },
            where: {
                id: id 
            }
        })
        return {
            ...userById,
            trasaction: userById?.transaction
        }
    } catch (error) {
        //console.log(error)
    }
}