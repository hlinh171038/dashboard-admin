import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import z from 'zod'

const bcrypt = require('bcrypt');


export async function POST(request:Request) {
    const body = await request.json() 

 
    const {
            name,
            email,
            password,
            phone,
            role,
            active,
            imgUrl,
            address
    } = body;

    let action = null;
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
            role,
            action,
            hashedPassword,
            image: imgUrl,
            address
        }
    })
    return NextResponse.json(newUser)
} 