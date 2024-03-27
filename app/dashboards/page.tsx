import { getAllUser2 } from "../actions/getAllUser2"
import Dashboard from "./Dashboard"
import Home from "./page"


const page = async() =>{
    const users = await getAllUser2()
   
    return <div>
       <Dashboard 
            users = {users}
        />
    </div>
}

export default page