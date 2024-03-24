

import axios from "axios"
import { useEffect, useState } from "react"
import { getServerSession } from "next-auth"
//import { authOptions } from "./api/auth/[...nextauth]/route"
import Dashboard from "./dashboards/page"
import LoginModals from "./modals/login-modals"

import { redirect } from "next/navigation"
import authOptions from "./api/auth/[...nextauth]/options"




export default async function Home() {

  const session = await  getServerSession(authOptions)

  if(session) redirect('/dashboards')

  return (
    <div  >
      linh thai
    </div>
  )
}