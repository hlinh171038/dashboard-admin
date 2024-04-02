import prisma from "@/lib/prisma"


export async function getAlluser({search,role,action,start,end}:{search?: string,role?:string,action?:string,start?:string, end?:string}) {
    try {
        // const {search} = params

        const query:any = {}
        if(search) {
            query.OR =[
                { 
                    name: {contains:search}
                },
                {
                    email: {contains: search}
                }
            ]
        }

        if(role) {
            query.role = role
        }
        if(action){
            if(action === 'true') {
                query.action = true
            }else if(action === 'false') {
                query.action = false
            } 
        }
        if(start && end) {
         console.log(start)
         console.log(end)
            // if(start === end) {
            //     query.createdAt = {
            //         gte: new Date(start),
            //         lte: new Date(convert),
            //     }
            // } else {
            //     console.log(start)
            // console.log(end)
            // console.log(new Date(start))
            // console.log(new Date(end))
            query.AND =[
                {
                    createdAt:{gte:start}
                },
                {
                    createdAt: {lte:end}
                }
            ]
            
           
            
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