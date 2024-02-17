import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import z from 'zod'

const bcrypt = require('bcrypt');


export async function POST(request:Request) {
    try {
        const body = await request.json() 
    const {
            name,
            email,
            password,
            phone,
            role,
            active,
            imgUrl,
            address,
            emailVerified
    } = body;
   
    let action ;
    // convert action
    if(active === 'yes') {
        action = true
    }else {
        action = false;
    }
    const hashedPassword = await bcrypt.hash(password,12)
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            phone,
            role,
            action,
            hashedPassword,
            image: imgUrl,
            address,
            emailVerified,
           
        }
    })
    return NextResponse.json(newUser)
    } catch (error:any) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' },{status:500});
    }
} 