import { getServerSession } from "next-auth"
import AddDiscount from "./AddDiscount"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getAllUser2 } from "@/app/actions/getAllUser2";


const page = async() =>{

    const currentUser = await getServerSession(authOptions);
    const user = await getAllUser2();
    return (
        <div>
            <AddDiscount 
                currentUser ={currentUser}
                user = {user}
            />
        </div>
    )
}

export default page