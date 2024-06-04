import prisma from "@/lib/prisma"


export async function getAlluser({search,role,status,province,start,end}:{search?: string,role?:string,status?:string,province?:string,start?:string, end?:string}) {
    try {
        // const {search} = params
        console.log(search)
        const query:any = {}
        if(search) {
            query.OR =[
                { 
                    name: {contains:search.toLowerCase() || search.toUpperCase() || search}
                },
                {
                    email: {contains: search.toLowerCase() || search.toUpperCase() || search}
                }
            ]
        }

        if(role) {
            query.role = role
        }
        if(status){
            if(status === 'true') {
                query.block = true
            }else if(status === 'false') {
                query.block = false
            } 
        }
        if(start && end) {
            query.AND =[
                {
                    createdAt:{gte:start}
                },
                {
                    createdAt: {lte:end}
                }
            ]
            
           
            
        }
        // province
        if(province) {
            query.province = province
        }

        const users = await prisma.user.findMany({
            where: query,
            orderBy:{
                createdAt: "desc"
            }
        })

        return users
       
    } catch (error:any) {
        console.log(error)
        throw new Error(error)
    }
}