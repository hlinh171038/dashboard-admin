"use client"

import { Post } from "@prisma/client"
import { useState } from "react"

interface HomeProps {
    data: any
}


const Home2:React.FC<HomeProps> =({
    data
}) =>{
    const [postData,setPostData] = useState(data);
    console.log(data)
    return (
        <div>
            Home
        </div>
    )
}

export default Home2