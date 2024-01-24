

import axios from "axios"
import { useEffect, useState } from "react"

import { getPost } from "./actions/getPost"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"




export default async function Home() {
  const post = await getPost()
  const session = await  getServerSession(authOptions)

  return (
    <div className="text-red-100">
     
     <div>{session && session?.user?.name }</div>
    </div>
  )
}