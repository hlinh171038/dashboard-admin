

import axios from "axios"
import { useEffect, useState } from "react"
import { getServerSession } from "next-auth"
//import { authOptions } from "./api/auth/[...nextauth]/route"
import Dashboard from "./dashboards/home/page"
import LoginModals from "./modals/login-modals"

import { redirect } from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/options"
import Login from "./login/page"





export default async function Home() {

  const session = await  getServerSession(authOptions)

   

  if(session){
    redirect('/dashboards')
  } else {
    redirect('/login')
  }

  return (
    <div  >
      <Login />
    </div>
  )
}