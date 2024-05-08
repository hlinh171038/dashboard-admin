import { getuserById } from "@/app/actions/getUserById"
import DetailCustomer from "./CustomerDetail";
import { getServerSession } from "next-auth";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllUser2 } from "@/app/actions/getAllUser2";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface Iparams {
    customerId: string;
}
const CustomerId = async({params}:{params:Iparams}) => {
    const currentUser = await getServerSession(authOptions)
    const customerById = await getuserById(params)
    const user = await getAllUser2()
  
    return (
        <div>
            
            <DetailCustomer 
                userById = {customerById}
                user = {user}
                currentUser = {currentUser}
            />
        </div>
    )
}

export default CustomerId