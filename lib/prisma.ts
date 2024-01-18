import { PrismaClient } from "@prisma/client";


// give global prisma defined ( work throung out of code)
declare global {
    var prisma: PrismaClient | undefined
}


// create client (can searxh for globalThis.prisma or create new Prisma)
const client = globalThis.prisma || new PrismaClient()

// check if... set globalPrisma = client below
// we do this check because nextjs 13 reloading can cause a bunch of this new create PrismaClient() --> warning 
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client;