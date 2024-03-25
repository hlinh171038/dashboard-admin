import { getServerSession } from "next-auth"
import User from "./User"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAllUser2 } from "@/app/actions/getAllUser2"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
//import authOptions from "@/app/api/auth/[...nextauth]/options"

const page = async() =>{

const currentUser = await getServerSession(authOptions)
const user = await getAllUser2()
    return (
        <div>
            <User 
                currentUser = {currentUser}
                user = {user}
            />
        </div>
    )
}

export default page