import prisma from '@/lib/prisma'


export async function getAllMail2({search,role,status,start,end}:{search?:string,role?:string,status?:string,start?:string,end?:string}) {
    try {
        const query:any = {}

        if(search) {
            query.OR =[
                {
                    mailSend: {contains: search}
                }
            ]
        }
        if(status) {
            query.status = status
        }

        if(role) {
            query.role = role
        }

        if(start && end) {
            query.AND =[
                {
                    created_at:{gte:start}
                },
                {
                    created_at: {lte:end}
                }
            ]
        }

        const mail = await prisma.mail.findMany({
            where: query,
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