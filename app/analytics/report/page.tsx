import { getAllUser2 } from "@/app/actions/getAllUser2"
import Report from "./Report"
import { getAllProduct2 } from "@/app/actions/getAllProduct2"

import { getAllTransaction2 } from "@/app/actions/getAllTransaction2"
import { getServerSession } from "next-auth"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const page = async() =>{

    
    const user = await getAllUser2()
    const product = await getAllProduct2()
    const transaction = await getAllTransaction2()
    return (
        <div>
           <Report 
                user={user}
                product ={product}
                transaction = {transaction}
                
           />
        </div>
    )
}

export default page