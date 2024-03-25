import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
    

    try {
        const data = await request.json()

    const {
        id,
        email,
        name,
        emailVerified,
        role,
        active,
        phone,
        imgUrl,
        address
    } = data

    console.log(data)

    let action ;
    // convert action
    if(active === 'yes') {
        action = true
    }else {
        action = false;
    }

    // exactly id
    const idconfirm = await prisma.user.findUnique({
        where: {
            id
        }
    })


    if(!idconfirm) {
        return NextResponse.json({error:"Id not found."},{status:500})
    }
    const updateUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          email,
          emailVerified,
          role,
          name,
          action,
          phone,
          image:imgUrl,
          address
        },
      })

      return NextResponse.json(updateUser)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"internal Server Errors"},{status:500})
    }

}