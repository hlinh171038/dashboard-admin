
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddNewProduct from "./AddProduct"
import { getServerSession } from "next-auth"
import { getuserById } from "@/app/actions/getUserById"
import { getUserByEmail } from "@/app/actions/getUserByEmail"

const Product = async() =>{

  const session = await getServerSession(authOptions)
 

  if(session) {
    console.log(session.user?.email)
  } else {
    console.log('not loggin')
  }
  const user = await getUserByEmail(session?.user?.email)
  
  return (
    <div>
        <AddNewProduct user = {user}/>
    </div>
  )
}

export default Product