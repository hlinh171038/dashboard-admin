import { Suspense } from "react"
import AddNewCustomer from "./AddNewCustomer"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getAllUser2 } from "@/app/actions/getAllUser2"


 const page = async() =>{
    const currentUser = await getServerSession(authOptions)
    const users = await getAllUser2();
    return (
        <div>
           
                <AddNewCustomer
                    currentUser = {currentUser}
                    users = {users}
                />
           
        </div>
    )
}

export default page