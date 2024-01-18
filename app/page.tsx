

import axios from "axios"
import { useEffect, useState } from "react"
import Home2 from "./home/page"
import { getPost } from "./actions/getPost"


export default async function Home() {
  const post = await getPost()
  return (
    <div className="text-red-100">
     <Home2
      data={post}
     />
    </div>
  )
}