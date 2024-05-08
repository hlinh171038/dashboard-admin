
import { getAllUser2 } from "@/app/actions/getAllUser2"
import Dashboard from "./Dashboard"
import Home from "./page"
import { getAllTransaction2 } from "@/app/actions/getAllTransaction2"
import { getAllProduct2 } from "@/app/actions/getAllProduct2"
import { getAllDiscount2 } from "@/app/actions/getAllDiscount2"


const page = async() =>{
    const users = await getAllUser2()
    const transaction = await getAllTransaction2()
    const product = await getAllProduct2()
    const discount = await getAllDiscount2()
    
    return <div>
       <Dashboard 
            users = {users}
            transaction = {transaction}
            product = {product}
            discount = {discount}
        />
    </div>
}

export default page