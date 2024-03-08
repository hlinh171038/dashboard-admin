import { getServerSession } from "next-auth"
import User from "./User"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const page = async() =>{

const currentUser = await getServerSession(authOptions)
    return (
        <div>
            <User 
                currentUser = {currentUser}
            />
        </div>
    )
}

export default page