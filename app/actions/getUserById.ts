import prisma from '@/lib/prisma'

interface Iparams {
    customerId: string
}

export async function getuserById(params:Iparams){
    try {
        const {customerId} = params;
        
        const userById = await prisma.user.findUnique({
            where: {
                id: customerId
            }
        })
        return userById
    } catch (error) {
        //console.log(error)
    }
}