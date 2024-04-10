import { getProductById } from "@/app/actions/getProductById"
import ProductDetail from "./ProductDetail"
import { getServerSession } from "next-auth"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Try from "./Try"
import { getAllDiscount2 } from "@/app/actions/getAllDiscount2"

interface IParams {
    productId: string
}
const ProductId = async({params}:{params:IParams}) =>{
    const product = await getProductById(params.productId)
    const discount = await getAllDiscount2()
    //const session = await getServerSession(authOptions)
 
    return (
        <ProductDetail
            product ={product}
            discount = {discount}
        />
    )
}

export default ProductId