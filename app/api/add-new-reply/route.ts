"use client"

import { NextResponse } from "next/server"

export async function POST(request:Request) {
    try {
        // const body = await request.json();
        // const {
        //     commentId,
        //     content,
        //     heart
        // } = body;
        // const reply = await prisma?.relly.create({
        //     data: {
        //         commentId,
        //         content,
        //         heart
        //     }
        // })
        return NextResponse.json('reply')
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}