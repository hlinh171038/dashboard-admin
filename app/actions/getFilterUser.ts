import prisma from '@/lib/prisma'

export async function getFilterUser (query: string, currentuser: number) {
    const filter = await prisma.user.findMany({
        where:{
            name: query
        },
        take: 3,
        orderBy: {
        id: "asc",
        },
    })
    return filter
}