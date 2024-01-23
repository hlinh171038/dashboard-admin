

import axios from "axios"
import { useEffect, useState } from "react"
import Home2 from "./home/page"
import { getPost } from "./actions/getPost"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"




export default async function Home() {
  const post = await getPost()
  const session = await  getServerSession(authOptions)

  return (
    <div className="text-red-100">
     <Home2
      data={post}
     />
     <div>{session && session?.user?.name }</div>
    </div>
  )
}