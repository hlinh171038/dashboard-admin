
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddNewProduct from "./AddProduct"
import { getServerSession } from "next-auth"
import { getuserById } from "@/app/actions/getUserById"
import { getUserByEmail } from "@/app/actions/getUserByEmail"
import { getAllDiscount } from "@/app/actions/getAllDiscount"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getAllTransaction2 } from "@/app/actions/getAllTransaction2"
import { getAllUser2 } from "@/app/actions/getAllUser2"
import { getAllCategory2 } from "@/app/actions/getAllCategory2"
//import authOptions from "@/app/api/auth/[...nextauth]/options"

const Product = async() =>{

  const session = await getServerSession(authOptions)
  const users = await getAllUser2()
  const discount = await getAllDiscount({})
  const categorys = await getAllCategory2()
  

  if(session) {
    //console.log(session.user?.email)
  } else {
    //console.log('not loggin')
  }
  const user = await getUserByEmail(session?.user?.email)
  
  return (
    <div>
        <AddNewProduct 
        discount = {discount}
        user = {user}
        currentUser = {session}
        users ={users}
        categorys = {categorys}
        />
        
    </div>
  )
}

export default Product