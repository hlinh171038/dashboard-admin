import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
const bcrypt = require('bcrypt');

export async function POST(request:Request) {
    

    try {
        const data = await request.json()

    const {
        id,
      password
    } = data

    console.log(data)


    console.log(id)
   

    // exactly id
    const idconfirm = await prisma.user.findUnique({
        where: {
            id
        }
    })


    if(!idconfirm) {
        return NextResponse.json({error:"Id not found."},{status:500})
    }
    const hashedPassword = await bcrypt.hash(password,12)
    const updateUser = await prisma.user.update({
        where: {
          id
        },
        data: {
         hashedPassword
        },
      })

      return NextResponse.json(updateUser)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Errors"},{status:500})
    }

}