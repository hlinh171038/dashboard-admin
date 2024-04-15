
import { resolve } from "path";
import prisma from './prisma'

export async function wait (ms:any) {
    return new Promise(resolve=>setTimeout(resolve,ms))
}

export async function getAllMail3() {
    try {
      

        const mail = await prisma.mail.findMany({
    
            orderBy: {
                created_at: 'desc'
            }
        })

        return mail
    } catch (error:any) {
        //console.log(error)
       console.log(error)
    }
}