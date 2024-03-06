import { getuserById } from "@/app/actions/getUserById"
import DetailCustomer from "./CustomerDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Iparams {
    customerId: string;
}
const CustomerId = async({params}:{params:Iparams}) => {
    const currentUser = await getServerSession(authOptions)
    const customerById = await getuserById(params)
    console.log(customerById)
    return (
        <div>
            <DetailCustomer 
                user = {customerById}
                currentUser = {currentUser}
            />
        </div>
    )
}

export default CustomerId