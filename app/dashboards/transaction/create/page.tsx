
import { getAlluser } from "@/app/actions/getAllUser"
import Create from "./Create"
import { getAllProduct2 } from "@/app/actions/getAllProduct2"
import { getAllUser2 } from "@/app/actions/getAllUser2"

const page = async() =>{
    const product = await getAllProduct2()
    const user = await getAllUser2()
    return (
        <div className="px-2">
            <Create 
                product = {product} 
                user = {user}
            />
        </div>
    )
}

export default page