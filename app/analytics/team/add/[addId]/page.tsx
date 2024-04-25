import { getAllUser2 } from "@/app/actions/getAllUser2";
import AddById from "./AddById";

interface IParams {
    addId:string;
}
const page= async({params}:{params:IParams}) => {
    const id = params.addId
    const users = await getAllUser2()
    return (
        <AddById 
            id = {id}
            users = {users}
        />
    )
}

export default page