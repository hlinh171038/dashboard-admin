import { getAllUser2 } from "@/app/actions/getAllUser2";
import AddById from "./AddById";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface IParams {
    addId:string;
}
const page= async({params}:{params:IParams}) => {
    const id = params.addId
    const users = await getAllUser2()
    const currentUser = await getServerSession(authOptions)
    return (
        <AddById 
            id = {id}
            users = {users}
            currentUser = {currentUser}
        />
    )
}

export default page