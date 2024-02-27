import { getProductById } from "@/app/actions/getProductById"
import ProductDetail from "./ProductDetail"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Try from "./Try"

interface IParams {
    productId: string
}
const ProductId = async({params}:{params:IParams}) =>{
    console.log(params.productId)
    const product = await getProductById(params.productId)
    //const session = await getServerSession(authOptions)
    console.log(product)
    return (
        <ProductDetail
            product ={product}
            
        />
    )
}

export default ProductId