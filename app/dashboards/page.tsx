
import { redirect } from "next/navigation"
import Home from "./page"


const page = async() =>{
    redirect('/dashboards/home')
    return <div>
       
    </div>
}

export default page