import { getAllDiscount2 } from "../../actions/getAllDiscount2"
import { getAllProduct2 } from "../../actions/getAllProduct2"
import { getAllTransaction2 } from "../../actions/getAllTransaction2"
import { getAllUser2 } from "../../actions/getAllUser2"
import Dashboard from "./Dashboard"
import Home from "./page"


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