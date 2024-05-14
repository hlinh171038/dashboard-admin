


import { getServerSession } from "next-auth"

import { redirect } from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/options"
import Login from "./(auth)/signIn/page"






export default async function Home() {

  const session = await  getServerSession(authOptions)

   

  if(session){
    redirect('/dashboards')
  } else {
    redirect('/signIn')
  }

  return (
    <div  >
        <Login />
    </div>
  )
}