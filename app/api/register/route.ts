import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import z from 'zod'



export async function POST(request:Request) {
    const body = await request.json();
    const {email,hashedPassword,name} = body;

    const hashed = await bcrypt.hash(hashedPassword,12);

    const user = await prisma.user.create({
       data: {
        email,
        name,
        hashedPassword: hashed
       }
    })
    return NextResponse.json(user)
} 